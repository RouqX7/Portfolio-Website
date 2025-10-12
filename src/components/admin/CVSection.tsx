import React, { useState, useEffect } from 'react';
import { ResumeService } from '../../services/resumeService';
import { CV } from '../../types/resume';
import { toast } from 'react-toastify';
import { FaUpload, FaFilePdf, FaTrash, FaCheckCircle, FaDownload } from 'react-icons/fa';

export default function CVSection() {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCVs();
  }, []);

  const loadCVs = async () => {
    try {
      setLoading(true);
      const data = await ResumeService.getAllCVs();
      setCVs(data);
    } catch (error) {
      console.error('Error loading CVs:', error);
      toast.error('Failed to load CVs');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      await ResumeService.uploadCV(file);
      toast.success('CV uploaded successfully! This is now your active CV.');
      await loadCVs();
      // Reset file input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading CV:', error);
      toast.error('Failed to upload CV');
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (cvId: string) => {
    try {
      await ResumeService.setActiveCV(cvId);
      toast.success('CV set as active');
      await loadCVs();
    } catch (error) {
      console.error('Error setting active CV:', error);
      toast.error('Failed to set active CV');
    }
  };

  const handleDelete = async (cvId: string, isActive: boolean) => {
    if (isActive) {
      toast.warning('Cannot delete the active CV. Please set another CV as active first.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this CV?')) {
      return;
    }

    try {
      await ResumeService.deleteCV(cvId);
      toast.success('CV deleted successfully');
      await loadCVs();
    } catch (error) {
      console.error('Error deleting CV:', error);
      toast.error('Failed to delete CV');
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CV Management</h1>
        <p className="text-gray-600">Upload and manage your CV files. The active CV will be used for the download button.</p>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaUpload className="mr-2 text-blue-600" />
              Upload New CV
            </h2>
            <p className="text-sm text-gray-600 mt-1">PDF files only, max 5MB</p>
          </div>
        </div>

        <div className="relative">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              file:cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {uploading && (
            <div className="absolute top-2 right-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      {/* CVs List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your CVs ({cvs.length})</h2>

        {cvs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <FaFilePdf className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-2">No CVs uploaded yet</p>
            <p className="text-gray-500 text-sm">Upload your first CV to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all ${
                  cv.isActive 
                    ? 'border-green-500 bg-green-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <FaFilePdf className="text-4xl text-red-500" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {cv.fileName}
                        </h3>
                        {cv.isActive && (
                          <span className="flex items-center text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                            <FaCheckCircle className="mr-1" />
                            Active
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Uploaded: {formatDate(cv.uploadedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {/* Download Button */}
                    <a
                      href={cv.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download CV"
                    >
                      <FaDownload />
                    </a>

                    {/* Set Active Button */}
                    {!cv.isActive && (
                      <button
                        onClick={() => handleSetActive(cv.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        title="Set as active CV"
                      >
                        Set Active
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(cv.id, cv.isActive)}
                      disabled={cv.isActive}
                      className={`p-2 rounded-lg transition-colors ${
                        cv.isActive
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title={cv.isActive ? 'Cannot delete active CV' : 'Delete CV'}
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
    </div>
  );
}

