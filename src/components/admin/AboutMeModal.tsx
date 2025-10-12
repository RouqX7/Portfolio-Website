import React, { useState, useEffect } from 'react';
import { ResumeService } from '../../services/resumeService';
import { AboutMe } from '../../types/resume';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

interface AboutMeModalProps {
  aboutMe: AboutMe | null;
  onClose: () => void;
  onSave: () => void;
}

export default function AboutMeModal({ aboutMe, onClose, onSave }: AboutMeModalProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (aboutMe) {
      setContent(aboutMe.content);
    }
  }, [aboutMe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ResumeService.updateAboutMe(content);
      toast.success('About Me updated successfully');
      onSave();
    } catch (error) {
      console.error('Error saving about me:', error);
      toast.error('Failed to save about me');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="text-2xl font-bold text-gray-900">
            {aboutMe ? 'Edit About Me' : 'Add About Me'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Me Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              placeholder="Write about yourself, your passion, goals, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can use line breaks to create paragraphs. They'll be preserved when displayed.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
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

