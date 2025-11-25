import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSave, FaTimes, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { BlogService } from '../../services/blogService';
import { ProjectService } from '../../services/projectService';
import { Blog, BlogSection, BlogSubsection } from '../../types/blogs';
import { Project } from '../../types/projects';
import { toast } from 'react-toastify';

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [sections, setSections] = useState<BlogSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [collapsedSubsections, setCollapsedSubsections] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadBlogs();
    loadProjects();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const blogsData = await BlogService.getAllBlogs();
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const projectsData = await ProjectService.getAllProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleCreateBlog = () => {
    setEditingBlog(null);
    setBlogTitle('');
    setSections([]);
    setSelectedProjectId('');
    setCurrentSectionIndex(0);
    setCollapsedSubsections(new Set());
    setShowBlogModal(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title);
    
    // Migrate old blog structure (with text field) to new structure (with subsections)
    const migratedSections = blog.sections.map((section: any) => {
      // If section has old 'text' field but no subsections, migrate it
      if (section.text && (!section.subsections || section.subsections.length === 0)) {
        return {
          ...section,
          subsections: [{
            id: `subsection-${Date.now()}-migrated-0`,
            title: '', // No title for migrated text
            text: section.text
          }]
        };
      }
      // If section has subsections, ensure they all have IDs
      if (section.subsections) {
        return {
          ...section,
          subsections: section.subsections.map((sub: any, index: number) => ({
            id: sub.id || `subsection-${Date.now()}-${index}`,
            title: sub.title || '',
            text: sub.text || ''
          }))
        };
      }
      // If section has no subsections at all, create one empty one
      return {
        ...section,
        subsections: [{
          id: `subsection-${Date.now()}-empty-0`,
          title: '',
          text: ''
        }]
      };
    });
    
    setSections(migratedSections.sort((a, b) => a.order - b.order));
    setSelectedProjectId(blog.projectId);
    setCurrentSectionIndex(0);
    setCollapsedSubsections(new Set());
    setShowBlogModal(true);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog? All sections and photos will be deleted.')) return;

    try {
      await BlogService.deleteBlog(blogId);
      toast.success('Blog deleted successfully');
      await loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const handleAddSection = () => {
    const newSection: BlogSection = {
      id: `section-${Date.now()}-${sections.length}`,
      title: '',
      subsections: [{
        id: `subsection-${Date.now()}-0`,
        title: '',
        text: ''
      }], // Start with at least one subsection
      photos: [],
      order: sections.length
    };
    const newSections = [...sections, newSection];
    setSections(newSections);
    // Navigate to the new section
    setCurrentSectionIndex(newSections.length - 1);
  };

  const handleUpdateSection = (sectionId: string, field: 'title' | 'text' | 'photos' | 'subsections', value: string | string[] | BlogSubsection[]) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, [field]: value }
        : section
    ));
  };

  const handleAddSubsection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const newSubsection: BlogSubsection = {
      id: `subsection-${Date.now()}-${(section.subsections || []).length}`,
      title: '',
      text: ''
    };
    
    const updatedSubsections = [...(section.subsections || []), newSubsection];
    handleUpdateSection(sectionId, 'subsections', updatedSubsections);
  };

  const handleUpdateSubsection = (sectionId: string, subsectionId: string, field: 'title' | 'text', value: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const updatedSubsections = (section.subsections || []).map(sub => 
      sub.id === subsectionId 
        ? { ...sub, [field]: value }
        : sub
    );
    
    handleUpdateSection(sectionId, 'subsections', updatedSubsections);
  };

  const handleDeleteSubsection = (sectionId: string, subsectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const updatedSubsections = (section.subsections || []).filter(sub => sub.id !== subsectionId);
    handleUpdateSection(sectionId, 'subsections', updatedSubsections);
    
    // Remove from collapsed set if it was there
    const newCollapsed = new Set(collapsedSubsections);
    newCollapsed.delete(subsectionId);
    setCollapsedSubsections(newCollapsed);
  };

  const handleMoveSubsection = (sectionId: string, subsectionId: string, direction: 'up' | 'down') => {
    const section = sections.find(s => s.id === sectionId);
    if (!section || !section.subsections) return;
    
    const subsections = [...section.subsections];
    const index = subsections.findIndex(sub => sub.id === subsectionId);
    if (index === -1) return;
    
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === subsections.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [subsections[index], subsections[targetIndex]] = [subsections[targetIndex], subsections[index]];
    
    handleUpdateSection(sectionId, 'subsections', subsections);
  };

  const toggleSubsectionCollapse = (subsectionId: string) => {
    const newCollapsed = new Set(collapsedSubsections);
    if (newCollapsed.has(subsectionId)) {
      newCollapsed.delete(subsectionId);
    } else {
      newCollapsed.add(subsectionId);
    }
    setCollapsedSubsections(newCollapsed);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section? All photos will be deleted.')) return;
    setSections(sections.filter(s => s.id !== sectionId).map((s, index) => ({ ...s, order: index })));
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update order
    newSections.forEach((s, i) => { s.order = i; });
    setSections(newSections);
  };

  const handleUploadPhoto = async (sectionId: string, file: File) => {
    if (!editingBlog && !selectedProjectId) {
      toast.error('Please select a project first');
      return;
    }

    try {
      // For new blogs, we'll use a temporary ID based on projectId
      // The actual blog ID will be created when saving
      const blogId = editingBlog?.id || `temp-${selectedProjectId}`;
      const photoUrl = await BlogService.uploadBlogPhoto(file, blogId, sectionId);
      
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        handleUpdateSection(sectionId, 'photos', [...section.photos, photoUrl]);
      }
      toast.success('Photo uploaded successfully');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    }
  };

  const handleDeletePhoto = async (sectionId: string, photoUrl: string) => {
    try {
      await BlogService.deleteBlogPhoto(photoUrl);
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        handleUpdateSection(sectionId, 'photos', section.photos.filter(p => p !== photoUrl));
      }
      toast.success('Photo deleted successfully');
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Failed to delete photo');
    }
  };

  const handleSaveBlog = async () => {
    if (!selectedProjectId) {
      toast.error('Please select a project');
      return;
    }
    if (!blogTitle.trim()) {
      toast.error('Please enter a blog title');
      return;
    }
    if (sections.length === 0) {
      toast.error('Please add at least one section');
      return;
    }
    // Validate that each section has at least one subsection (or legacy text)
    for (const section of sections) {
      // Check if it's a legacy section with text but no subsections
      const isLegacySection = (section as any).text && (!section.subsections || section.subsections.length === 0);
      
      if (!isLegacySection) {
        // New structure: must have subsections
        if (!section.subsections || section.subsections.length === 0) {
          toast.error('Each section must have at least one subsection');
          return;
        }
        // Validate that subsections have text (title is optional)
        for (const sub of section.subsections || []) {
          if (!sub.text || !sub.text.trim()) {
            toast.error('All subsections must have text content');
            return;
          }
        }
      }
    }

    try {
      if (editingBlog) {
        await BlogService.updateBlog(editingBlog.id, {
          title: blogTitle,
          sections: sections
        });
        toast.success('Blog updated successfully');
      } else {
        await BlogService.createBlog({
          projectId: selectedProjectId,
          title: blogTitle,
          sections: sections.map(s => ({
            title: s.title,
            subsections: (s.subsections || []).map(sub => ({
              title: sub.title,
              text: sub.text
            })),
            photos: s.photos,
            order: s.order
          }))
        });
        toast.success('Blog created successfully');
      }
      setShowBlogModal(false);
      await loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    }
  };

  const getProjectTitle = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Blogs</h1>
          <p className="text-gray-600 mt-1">Create and manage blogs for your projects</p>
        </div>
        <button
          onClick={handleCreateBlog}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus />
          <span>Create Blog</span>
        </button>
      </div>

      {/* Blogs List */}
      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
          <p className="text-gray-500 mb-4">Create your first blog for a project.</p>
          <button
            onClick={handleCreateBlog}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Project: <span className="font-medium">{getProjectTitle(blog.projectId)}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {blog.sections.length} section{blog.sections.length !== 1 ? 's' : ''}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBlog(blog)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <button
                onClick={() => setShowBlogModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Project *
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  disabled={!!editingBlog}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a project...</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blog Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Enter blog title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Sections - Paginated View */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Sections * {sections.length > 0 && `(${currentSectionIndex + 1} of ${sections.length})`}
                  </label>
                  <button
                    onClick={handleAddSection}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add Section</span>
                  </button>
                </div>

                {sections.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No sections yet. Click "Add Section" to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Section Navigation */}
                    {sections.length > 1 && (
                      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                        <button
                          onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                          disabled={currentSectionIndex === 0}
                          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaChevronLeft />
                          <span>Previous</span>
                        </button>
                        <div className="flex items-center space-x-2">
                          {sections.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentSectionIndex(idx)}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                currentSectionIndex === idx
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setCurrentSectionIndex(Math.min(sections.length - 1, currentSectionIndex + 1))}
                          disabled={currentSectionIndex === sections.length - 1}
                          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <span>Next</span>
                          <FaChevronRight />
                        </button>
                      </div>
                    )}

                    {/* Current Section */}
                    {sections[currentSectionIndex] && (() => {
                      const section = sections[currentSectionIndex];
                      const index = currentSectionIndex;
                      
                      return (
                        <div className="border border-gray-200 rounded-lg p-6 bg-white">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-semibold text-gray-900">Section {index + 1}</h4>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  handleMoveSection(section.id, 'up');
                                  if (index > 0) setCurrentSectionIndex(index - 1);
                                }}
                                disabled={index === 0}
                                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move up"
                              >
                                <FaArrowUp />
                              </button>
                              <button
                                onClick={() => {
                                  handleMoveSection(section.id, 'down');
                                  if (index < sections.length - 1) setCurrentSectionIndex(index + 1);
                                }}
                                disabled={index === sections.length - 1}
                                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move down"
                              >
                                <FaArrowDown />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this section?')) {
                                    handleDeleteSection(section.id);
                                    if (sections.length > 1) {
                                      setCurrentSectionIndex(Math.max(0, Math.min(index, sections.length - 2)));
                                    }
                                  }
                                }}
                                className="p-2 text-red-600 hover:text-red-800"
                                title="Delete section"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>

                          {/* Section Title */}
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Section Title (Optional)
                            </label>
                            <input
                              type="text"
                              value={section.title || ''}
                              onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                              placeholder="Enter a title for this section/page..."
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          {/* Subsections */}
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Subsections (Headers & Text) *
                              </label>
                              <button
                                onClick={() => handleAddSubsection(section.id)}
                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
                              >
                                <FaPlus size={12} />
                                <span>Add Subsection</span>
                              </button>
                            </div>

                            {(!section.subsections || section.subsections.length === 0) ? (
                              <div className="text-center py-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 text-sm">No subsections yet. Add one to get started.</p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {section.subsections.map((subsection, subIndex) => {
                                  const isCollapsed = collapsedSubsections.has(subsection.id);
                                  return (
                                    <div key={subsection.id} className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                                      {/* Collapsible Header */}
                                      <div 
                                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => toggleSubsectionCollapse(subsection.id)}
                                      >
                                        <div className="flex items-center space-x-3">
                                          {isCollapsed ? (
                                            <FaChevronRight className="text-gray-500" size={14} />
                                          ) : (
                                            <FaChevronDown className="text-gray-500" size={14} />
                                          )}
                                          <span className="text-sm font-medium text-gray-700">
                                            Subsection {subIndex + 1}
                                            {subsection.title && (
                                              <span className="ml-2 text-gray-500 font-normal">
                                                - {subsection.title.length > 40 ? `${subsection.title.substring(0, 40)}...` : subsection.title}
                                              </span>
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleMoveSubsection(section.id, subsection.id, 'up');
                                            }}
                                            disabled={subIndex === 0}
                                            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                                            title="Move up"
                                          >
                                            <FaArrowUp size={12} />
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleMoveSubsection(section.id, subsection.id, 'down');
                                            }}
                                            disabled={subIndex === (section.subsections || []).length - 1}
                                            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                                            title="Move down"
                                          >
                                            <FaArrowDown size={12} />
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteSubsection(section.id, subsection.id);
                                            }}
                                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                            title="Delete subsection"
                                          >
                                            <FaTrash size={14} />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Collapsible Content */}
                                      {!isCollapsed && (
                                        <div className="p-4 pt-0 space-y-4 border-t border-gray-200">
                                          {/* Subsection Header */}
                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Header (Bold Title) *
                                            </label>
                                            <input
                                              type="text"
                                              value={subsection.title}
                                              onChange={(e) => handleUpdateSubsection(section.id, subsection.id, 'title', e.target.value)}
                                              placeholder="Enter a bold header for this subsection..."
                                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                                            />
                                          </div>

                                          {/* Subsection Text - Larger */}
                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Text Content *
                                            </label>
                                            <textarea
                                              value={subsection.text}
                                              onChange={(e) => handleUpdateSubsection(section.id, subsection.id, 'text', e.target.value)}
                                              placeholder="Enter text content for this subsection..."
                                              rows={12}
                                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y text-base"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Section Photos */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Photos
                            </label>
                            <div className="space-y-2">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  files.forEach(file => handleUploadPhoto(section.id, file));
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              {section.photos.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                  {section.photos.map((photoUrl, photoIndex) => (
                                    <div key={photoIndex} className="relative group">
                                      <img
                                        src={photoUrl}
                                        alt={`Section ${index + 1} photo ${photoIndex + 1}`}
                                        className="w-full h-32 object-cover rounded-lg"
                                      />
                                      <button
                                        onClick={() => handleDeletePhoto(section.id, photoUrl)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <FaTrash size={12} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowBlogModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlog}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaSave />
                <span>Save Blog</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

