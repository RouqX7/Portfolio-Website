import React, { useState, useEffect } from 'react';
import { ResumeService } from '../../services/resumeService';
import { Skill, CreateSkillData, UpdateSkillData } from '../../types/resume';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

interface SkillModalProps {
  skill: Skill | null;
  onClose: () => void;
  onSave: () => void;
}

export default function SkillModal({ skill, onClose, onSave }: SkillModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical' as 'Technical' | 'Soft Skills' | 'Languages' | 'Tools',
    level: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level
      });
    }
  }, [skill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (skill) {
        // Update existing skill
        const updateData: UpdateSkillData = {
          name: formData.name,
          category: formData.category,
          level: formData.level
        };

        await ResumeService.updateSkill(skill.id, updateData);
        toast.success('Skill updated successfully');
      } else {
        // Create new skill
        const createData: CreateSkillData = {
          name: formData.name,
          category: formData.category,
          level: formData.level
        };

        await ResumeService.createSkill(createData);
        toast.success('Skill added successfully');
      }

      onSave();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error('Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="text-2xl font-bold text-gray-900">
            {skill ? 'Edit Skill' : 'Add Skill'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., JavaScript, Leadership"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Technical">Technical</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Languages">Languages</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level *
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

