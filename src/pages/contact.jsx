import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // FormSubmit will handle the email sending
      const response = await fetch('https://formsubmit.co/farouqrabiu.dev@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New Portfolio Contact Form Submission',
          _captcha: 'false'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info cards
  const contactInfo = [
    { 
      icon: FaEnvelope, 
      title: 'Email Me', 
      info: 'farouqrabiu.dev@gmail.com', 
      description: 'Send me an email anytime',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: FaMapMarkerAlt, 
      title: 'Location', 
      info: 'Remote & On-site', 
      description: 'Available worldwide',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: FaClock, 
      title: 'Response Time', 
      info: 'Within 24 Hours', 
      description: 'I reply quickly',
      gradient: 'from-green-500 to-teal-500'
    },
  ];

  // Intersection Observer to trigger animations when elements come into view
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true, // Trigger only once when visible
    threshold: 0.3,    // Trigger when 30% of the component is visible
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true, // Trigger only once when visible
    threshold: 0.3,    // Trigger when 30% of the form is visible
  });

  // Trail animation for contact info cards
  const trailCards = useTrail(contactInfo.length, {
    opacity: cardsInView ? 1 : 0,
    transform: cardsInView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 200,
  });

  // Trail animation for the form fields
  const trailForm = useTrail(4, {
    opacity: formInView ? 1 : 0,
    transform: formInView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 400,
  });

  // Header animation
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const headerTrail = useTrail(2, {
    opacity: headerInView ? 1 : 0,
    transform: headerInView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { mass: 1, tension: 80, friction: 26 },
    delay: 200,
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12'>
        <div className='font-poppins'>
          {/* Header Section */}
          <div ref={headerRef} className='text-center mb-16'>
            {headerTrail.map((style, index) => (
              <animated.div key={index} style={style}>
                {index === 0 ? (
                  <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
                    Talk to Me
                  </h1>
                ) : (
                  <p className='text-xl md:text-2xl text-gray-600 font-medium'>
                    Let's discuss your next project
                  </p>
                )}
              </animated.div>
            ))}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Info Cards */}
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-8'>Get in Touch</h2>
              <div ref={cardsRef} className='space-y-6'>
                {trailCards.map((style, index) => {
                  const info = contactInfo[index];
                  const Icon = info.icon;
                  return (
                    <animated.div key={index} style={style}>
                      <div className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-transparent hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1`}>
                        <div className='flex items-start space-x-4'>
                          <div className={`w-14 h-14 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className='text-white text-xl' />
                          </div>
                          <div className='flex-1'>
                            <h3 className='text-xl font-bold text-gray-900 mb-2'>{info.title}</h3>
                            <p className='text-lg font-semibold text-gray-700 mb-1'>{info.info}</p>
                            <p className='text-gray-600'>{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </animated.div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-8'>Send Me a Message</h2>
              <animated.div ref={formRef}>
                <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-blue-100'>
                  {isSubmitted ? (
                    <div className='text-center py-8'>
                      <FaCheckCircle className='text-6xl text-green-500 mx-auto mb-4' />
                      <h3 className='text-2xl font-bold text-gray-900 mb-2'>Message Sent!</h3>
                      <p className='text-gray-600'>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      {trailForm.map((style, index) => (
                        <animated.div key={index} style={style}>
                          {index === 0 ? (
                            <div>
                              <label className='block text-sm font-semibold text-gray-700 mb-2'>Your Name</label>
                              <input
                                type='text'
                                name='name'  
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Enter your full name'
                                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900' 
                                required
                              />
                            </div>
                          ) : index === 1 ? (
                            <div>
                              <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                              <input
                                type='email'
                                name='email'  
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='your.email@example.com'
                                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900' 
                                required
                              />
                            </div>
                          ) : index === 2 ? (
                            <div>
                              <label className='block text-sm font-semibold text-gray-700 mb-2'>Project Details</label>
                              <textarea
                                name='message'  
                                value={formData.message}
                                onChange={handleChange}
                                placeholder='Tell me about your project, timeline, and any specific requirements...'
                                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 resize-none' 
                                rows='6'
                                required
                              />
                            </div>
                          ) : (
                            <button
                              type='submit'
                              disabled={isSubmitting}
                              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                            >
                              {isSubmitting ? (
                                <>
                                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                                  <span>Sending...</span>
                                </>
                              ) : (
                                <>
                                  <FaPaperPlane />
                                  <span>Send Message</span>
                                </>
                              )}
                            </button>
                          )}
                        </animated.div>
                      ))}
                    </form>
                  )}
                </div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
