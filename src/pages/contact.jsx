import React, { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';
import ContactCard from '../components/ContactCard';
import emailjs from 'emailjs-com';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Use EmailJS to send email with Public Key and Template ID
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
        }
      );
  
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  // Contact data for useTrail
  const contactData = [
    { icon: FaEnvelope, title: 'Email', info: 'farouqmoney55@gmail.com', buttonText: 'Write me' },
    { icon: FaWhatsapp, title: 'Whatsapp', info: '999-888-777', buttonText: 'Write me' },
    { icon: FaFacebookMessenger, title: 'Messenger', info: 'user.fb123', buttonText: 'Write me' },
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

  // Trail animation for contact cards
  const trailCards = useTrail(contactData.length, {
    opacity: cardsInView ? 1 : 0,
    transform: cardsInView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 120, friction: 20 },
  });

  // Trail animation for the form fields
  const trailForm = useTrail(3, {
    opacity: formInView ? 1 : 0,
    transform: formInView ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 120, friction: 20 },
  });

  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-4 sm:p-8 font-poppins'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-800'>Talk to me</h1>
      </div>

      {/* Responsive flex container */}
      <div className='flex flex-col md:flex-row justify-center md:space-x-10 space-y-8 md:space-y-0'>
        {/* Contact Cards */}
        <div ref={cardsRef} className='flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0'>
          {trailCards.map((style, index) => (
            <animated.div key={index} style={style}>
              <ContactCard
                icon={contactData[index].icon}
                title={contactData[index].title}
                info={contactData[index].info}
                buttonText={contactData[index].buttonText}
              />
            </animated.div>
          ))}
        </div>

        {/* Contact Form */}
        <animated.div ref={formRef} className='bg-white p-6 sm:p-8 shadow-md rounded-lg w-full md:w-96'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>Write me your project</h2>
          <form onSubmit={handleSubmit}>
            {trailForm.map((style, index) => (
              <animated.div key={index} style={style} className='mb-4'>
                {index === 0 ? (
                  <div>
                    <label className='block text-gray-700'>Name</label>
                    <input
                      type='text'
                      name='name'  
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='Insert your name'
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-900' 
                      required
                    />
                  </div>
                ) : index === 1 ? (
                  <div>
                    <label className='block text-gray-700'>Mail</label>
                    <input
                      type='email'
                      name='email'  
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='Insert your email'
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-900' 
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className='block text-gray-700'>Project</label>
                    <textarea
                      name='message'  
                      value={formData.message}
                      onChange={handleChange}
                      placeholder='Write your project'
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-900' 
                      rows='4'
                      required
                    />
                  </div>
                )}
              </animated.div>
            ))}
            <button
              type='submit'
              className='bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 w-full flex justify-center items-center'
            >
              Send Message <span className='ml-2'>✉️</span>
            </button>
          </form>
        </animated.div>
      </div>
    </div>
  );
}

export default Contact;
