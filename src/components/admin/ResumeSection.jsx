import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaGraduationCap, FaBriefcase, FaCode, FaUser } from 'react-icons/fa';
import { ResumeService } from '../../services/resumeService';
import { RESUME_TYPES, SKILL_CATEGORIES, SKILL_LEVELS } from '../../types/resume';
import { toast } from 'react-toastify';

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState('experience');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | Education | Skill | null>(null);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [experiencesData, educationData, skillsData, aboutMeData] = await Promise.all([
        ResumeService.getAllExperiences(),
        ResumeService.getAllEducation(),
        ResumeService.getAllSkills(),
        ResumeService.getAboutMe()
      ]);
      
      setExperiences(experiencesData);
      setEducation(educationData);
      setSkills(skillsData);
      setAboutMe(aboutMeData);
    } catch (error) {
      console.error('Error loading resume data:', error);
      toast.error('Failed to load resume data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (type) {
        case 'experience':
          await ResumeService.deleteExperience(id);
          toast.success('Experience deleted successfully');
          break;
        case 'education':
          await ResumeService.deleteEducation(id);
          toast.success('Education deleted successfully');
          break;
        case 'skill':
          await ResumeService.deleteSkill(id);
          toast.success('Skill deleted successfully');
          break;
      }
      loadAllData();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setModalType('');
  };

  const handleModalSave = () => {
    closeModal();
    loadAllData();
  };

  const tabs = [
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'skills', label: 'Skills', icon: FaCode },
    { id: 'about', label: 'About Me', icon: FaUser }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading resume data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Management</h1>
          <p className="text-gray-600 mt-1">Manage your experience, education, skills, and about me</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
              <button
                onClick={() => openModal('experience')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiences.length === 0 ? (
                <div className="text-center py-8">
                  <FaBriefcase className="mx-auto text-gray-300 text-4xl mb-4" />
                  <p className="text-gray-500">No experience entries yet</p>
                </div>
              ) : (
                experiences.map((exp) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-gray-600 text-sm">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </p>
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => openModal('experience', exp)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete('experience', exp.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
              <button
                onClick={() => openModal('education')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Education</span>
              </button>
            </div>

            <div className="space-y-4">
              {education.length === 0 ? (
                <div className="text-center py-8">
                  <FaGraduationCap className="mx-auto text-gray-300 text-4xl mb-4" />
                  <p className="text-gray-500">No education entries yet</p>
                </div>
              ) : (
                education.map((edu) => (
                  <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        <p className="text-gray-600 text-sm">
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </p>
                        {edu.gpa && (
                          <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                        )}
                        {edu.description && (
                          <p className="text-gray-700 mt-2">{edu.description}</p>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => openModal('education', edu)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete('education', edu.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
              <button
                onClick={() => openModal('skill')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="space-y-6">
              {['Technical', 'Soft Skills', 'Languages', 'Tools'].map((category) => {
                const categorySkills = skills.filter(skill => skill.category === category);
                return (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                    {categorySkills.length === 0 ? (
                      <p className="text-gray-500 text-sm">No {category.toLowerCase()} skills yet</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900">{skill.name}</p>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                                  skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                                  skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {skill.level}
                                </span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => openModal('skill', skill)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('skill', skill.id)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* About Me Tab */}
        {activeTab === 'about' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
              <button
                onClick={() => openModal('about')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaEdit />
                <span>{aboutMe ? 'Edit About Me' : 'Add About Me'}</span>
              </button>
            </div>

            <div>
              {aboutMe ? (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: aboutMe.content.replace(/\n/g, '<br>') }} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaUser className="mx-auto text-gray-300 text-4xl mb-4" />
                  <p className="text-gray-500">No about me content yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal placeholder - you'll need to create the actual modal component */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingItem ? 'Edit' : 'Add'} {modalType}
              </h3>
              <p className="text-gray-600">Modal component will be implemented here...</p>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
