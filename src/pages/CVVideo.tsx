import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ResumeService } from '../services/resumeService';
import { CVVideo } from '../types/resume';

export default function CVVideoPage() {
  const [video, setVideo] = useState<CVVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const activeVideo = await ResumeService.getActiveCVVideo();
        setVideo(activeVideo);
      } catch (err) {
        console.error('Error fetching CV video:', err);
        setError('Unable to load CV video at the moment. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-16 px-4">
      <div className="max-w-5xl mx-auto font-poppins">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 text-gray-700 border border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Site
          </Link>
        </div>
        <div className="text-center mb-12">
          <p className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 text-sm font-semibold text-blue-600 shadow-md">
            CV Video Overview
          </p>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get to Know Me In Minutes
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A quick walkthrough of my experience, engineering philosophy, and the kind of impact I love creating with software.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6"></div>
              <p className="text-lg text-gray-600">Loading your personalized video...</p>
            </div>
          ) : error ? (
            <div className="text-center py-24 px-6">
              <div className="text-4xl mb-4">😕</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">We're having trouble loading the video</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : !video ? (
            <div className="text-center py-24 px-6">
              <div className="text-4xl mb-4">🎬</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">CV video coming soon</h2>
              <p className="text-gray-600">Check back shortly—I'm updating my CV experience overview.</p>
            </div>
          ) : (
            <>
              <div className="relative bg-black">
                <video
                  src={video.fileUrl}
                  controls
                  preload="metadata"
                  className="w-full h-full max-h-[70vh]"
                  poster=""
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="p-8 md:p-10">
                <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                  In this CV walkthrough I break down the skills I rely on to ship end-to-end products, the
                  projects I'm most proud of. From production web platforms to personal experiments and what
                  inspires me to keep building thoughtful digital experiences. I love collaborating with creatives
                  and businesses to launch polished websites and full-stack systems that stand out.
                </p>

                <div className="mt-6">
                  <span className="text-sm text-gray-500">
                    Uploaded on{' '}
                    {(() => {
                      const dateObj = video.uploadedAt && (video.uploadedAt as any).toDate
                        ? (video.uploadedAt as any).toDate()
                        : new Date(video.uploadedAt as any);
                      return dateObj.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                    })()}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

