import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSave, FaTimes } from 'react-icons/fa';
import { BlogService } from '../../services/blogService';
import { ProjectService } from '../../services/projectService';
import { Blog, BlogSection } from '../../types/blogs';
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
    setShowBlogModal(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title);
    setSections([...blog.sections].sort((a, b) => a.order - b.order));
    setSelectedProjectId(blog.projectId);
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
      text: '',
      photos: [],
      order: sections.length
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateSection = (sectionId: string, field: 'title' | 'text' | 'photos', value: string | string[]) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, [field]: value }
        : section
    ));
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
            text: s.text,
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

              {/* Sections */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Sections *
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
                  <div className="space-y-4">
                    {sections.map((section, index) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-900">Section {index + 1}</h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleMoveSection(section.id, 'up')}
                              disabled={index === 0}
                              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move up"
                            >
                              <FaArrowUp />
                            </button>
                            <button
                              onClick={() => handleMoveSection(section.id, 'down')}
                              disabled={index === sections.length - 1}
                              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move down"
                            >
                              <FaArrowDown />
                            </button>
                            <button
                              onClick={() => handleDeleteSection(section.id)}
                              className="p-2 text-red-600 hover:text-red-800"
                              title="Delete section"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                        {/* Section Title */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title (Optional)
                          </label>
                          <input
                            type="text"
                            value={section.title || ''}
                            onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                            placeholder="Enter a subtitle or header for this section..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Section Text */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Text Content
                          </label>
                          <textarea
                            value={section.text}
                            onChange={(e) => handleUpdateSection(section.id, 'text', e.target.value)}
                            placeholder="Describe this section..."
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
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
                    ))}
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

