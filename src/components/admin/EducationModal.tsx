import React, { useState, useEffect } from 'react';
import { ResumeService } from '../../services/resumeService';
import { Education, CreateEducationData, UpdateEducationData } from '../../types/resume';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

interface EducationModalProps {
  education: Education | null;
  onClose: () => void;
  onSave: () => void;
}

export default function EducationModal({ education, onClose, onSave }: EducationModalProps) {
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree,
        institution: education.institution,
        location: education.location || '',
        startDate: education.startDate,
        endDate: education.endDate || '',
        gpa: education.gpa || '',
        description: education.description || ''
      });
    }
  }, [education]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (education) {
        // Update existing education
        const updateData: UpdateEducationData = {
          degree: formData.degree,
          institution: formData.institution,
          startDate: formData.startDate
        };

        // Only add optional fields if they have values
        if (formData.location?.trim()) {
          updateData.location = formData.location;
        }
        if (formData.endDate?.trim()) {
          updateData.endDate = formData.endDate;
        }
        if (formData.gpa?.trim()) {
          updateData.gpa = formData.gpa;
        }
        if (formData.description?.trim()) {
          updateData.description = formData.description;
        }

        await ResumeService.updateEducation(education.id, updateData);
        toast.success('Education updated successfully');
      } else {
        // Create new education
        const createData: CreateEducationData = {
          degree: formData.degree,
          institution: formData.institution,
          startDate: formData.startDate
        };

        // Only add optional fields if they have values
        if (formData.location?.trim()) {
          createData.location = formData.location;
        }
        if (formData.endDate?.trim()) {
          createData.endDate = formData.endDate;
        }
        if (formData.gpa?.trim()) {
          createData.gpa = formData.gpa;
        }
        if (formData.description?.trim()) {
          createData.description = formData.description;
        }

        await ResumeService.createEducation(createData);
        toast.success('Education added successfully');
      }

      onSave();
    } catch (error) {
      console.error('Error saving education:', error);
      toast.error('Failed to save education');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">
            {education ? 'Edit Education' : 'Add Education'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree *
            </label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              placeholder="e.g., Bachelor of Science in Computer Systems"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution *
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              placeholder="e.g., University of Limerick"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Limerick, Ireland"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="e.g., Sep 2019"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (leave empty for current)
              </label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="e.g., Jun 2023"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPA (optional)
            </label>
            <input
              type="text"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="e.g., 3.8/4.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Relevant coursework, achievements, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

