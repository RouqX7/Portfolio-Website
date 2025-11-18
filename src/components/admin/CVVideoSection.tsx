import React, { useEffect, useState } from 'react';
import { ResumeService } from '../../services/resumeService';
import { CVVideo } from '../../types/resume';
import { toast } from 'react-toastify';
import { FaUpload, FaVideo, FaTrash, FaCheckCircle, FaPlay } from 'react-icons/fa';

const MAX_VIDEO_SIZE_MB = 200;

export default function CVVideoSection() {
  const [videos, setVideos] = useState<CVVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const items = await ResumeService.getAllCVVideos();
      setVideos(items);
    } catch (error) {
      console.error('Error loading CV videos:', error);
      toast.error('Failed to load CV videos');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
      toast.error(`File size must be less than ${MAX_VIDEO_SIZE_MB}MB`);
      return;
    }

    try {
      setUploading(true);
      await ResumeService.uploadCVVideo(file);
      toast.success('CV video uploaded successfully! This is now your primary video.');
      await loadVideos();
      event.target.value = '';
    } catch (error) {
      console.error('Error uploading CV video:', error);
      toast.error('Failed to upload CV video');
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (videoId: string) => {
    try {
      await ResumeService.setActiveCVVideo(videoId);
      toast.success('CV video set as primary');
      await loadVideos();
    } catch (error) {
      console.error('Error setting active CV video:', error);
      toast.error('Failed to set active CV video');
    }
  };

  const handleDelete = async (videoId: string, isActive: boolean) => {
    if (isActive) {
      toast.warning('Cannot delete the primary CV video. Please set another video as primary first.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this CV video?')) {
      return;
    }

    try {
      await ResumeService.deleteCVVideo(videoId);
      toast.success('CV video deleted successfully');
      await loadVideos();
    } catch (error) {
      console.error('Error deleting CV video:', error);
      toast.error('Failed to delete CV video');
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleString();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CV Video Management</h1>
        <p className="text-gray-600">
          Upload and manage your CV explanation videos. The primary video will be shown on the public CV video page.
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-8 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaUpload className="mr-2 text-purple-600" />
              Upload New CV Video
            </h2>
            <p className="text-sm text-gray-600 mt-1">Video files only, max {MAX_VIDEO_SIZE_MB}MB</p>
          </div>
        </div>

        <div className="relative">
          <input
            type="file"
            accept="video/*"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-600 file:text-white
              hover:file:bg-purple-700
              file:cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {uploading && (
            <div className="absolute top-2 right-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your CV Videos ({videos.length})</h2>

        {videos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <FaVideo className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-2">No CV videos uploaded yet</p>
            <p className="text-gray-500 text-sm">Upload your first CV video to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all ${
                  video.isActive
                    ? 'border-purple-500 bg-purple-50/60'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <FaPlay className="text-2xl text-purple-600" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {video.fileName}
                        </h3>
                        {video.isActive && (
                          <span className="flex items-center text-purple-600 text-sm font-medium bg-purple-100 px-2 py-1 rounded-full">
                            <FaCheckCircle className="mr-1" />
                            Primary
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500">
                        Uploaded: {formatDate(video.uploadedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 md:ml-4">
                    {!video.isActive && (
                      <button
                        onClick={() => handleSetActive(video.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        title="Set as primary video"
                      >
                        Set Primary
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(video.id, video.isActive)}
                      disabled={video.isActive}
                      className={`p-2 rounded-lg transition-colors ${
                        video.isActive
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title={video.isActive ? 'Cannot delete primary video' : 'Delete video'}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <video
                    src={video.fileUrl}
                    controls
                    className="w-full rounded-lg border border-gray-200"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

