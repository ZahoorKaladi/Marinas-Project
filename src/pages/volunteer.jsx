import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    location: '',
    education: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState('initial'); // 'initial', 'submitting', 'success', 'error'
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmissionStatus('submitting');
    console.log('Volunteer Form Submitted:', formData);

    try {
      // ✅ This is the key change to connect to Strapi
      await axios.post('http://localhost:1337/api/volunteer-applications', { data: formData });
      
      setSubmissionStatus('success');
      setTimeout(() => {
        // You can redirect to a "thank you" page here
        navigate('/about');
      }, 3000);

    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      setSubmissionStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Page Header Banner */}
      <div 
        className="relative py-24 sm:py-32 text-white text-center overflow-hidden"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599052950929-e889b70b5d5d?auto=format&fit=crop&q=80&w=1470')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-blue-800 opacity-90"></div>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">Become a Volunteer</h1>
          <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto">
            Your time and compassion can make a difference in our community.
          </p>
        </motion.div>
      </div>

      {/* Main Volunteer Form Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <motion.div
            className="p-8 bg-white rounded-xl shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
              Sign Up to Volunteer
            </h2>

            {submissionStatus === 'success' && (
              <motion.div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-bold">Thank you for your interest!</p>
                <p className="text-sm">Our volunteer coordinator will contact you shortly.</p>
              </motion.div>
            )}
            {submissionStatus === 'error' && (
              <motion.div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-bold">Submission failed.</p>
                <p className="text-sm">Please try again or contact us directly.</p>
              </motion.div>
            )}
            {submissionStatus === 'initial' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
                  <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (City/Town)</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
                  <select id="education" name="education" value={formData.education} onChange={handleInputChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
                    <option value="">Select your highest education</option>
                    <option value="high_school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Why do you want to volunteer?</label>
                  <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleInputChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Your skills, availability, and motivation"></textarea>
                </div>
                <button type="submit" className="w-full py-3 px-6 bg-blue-600 text-white rounded-md shadow-lg font-bold hover:bg-blue-700 transition">
                  Submit Application
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
