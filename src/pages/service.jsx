import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This hook now fetches data from your local Strapi instance
  useEffect(() => {
    fetch('http://localhost:1337/api/services?populate=*')
      .then(res => res.json())
      .then(data => {
        const transformedServices = data.data.map(item => ({
          id: item.id,
          // Strapi v5 flattens scalar fields and nests media
          title: item.title,
          description: item.description,
          slug: item.slug,
          // Correctly handle the nested media object
          imageUrl: item.imageUrl?.url || '',
        }));
        setServices(transformedServices);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch services:", error);
        setIsLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-gray-700">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="font-poppins">
      <div className="bg-blue-800 text-white py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">Our Services</h1>
        <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto">
          Comprehensive healthcare services provided with compassion and care.
        </p>
      </div>

      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer group transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                variants={itemVariants}
              >
                <Link to={`/service/${service.slug}`}>
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={`http://localhost:1337${service.imageUrl}`}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-600 opacity-20 transition-opacity duration-300 group-hover:opacity-0"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 transition-colors duration-300 group-hover:text-blue-600 drop-shadow">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16 sm:py-20 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Make a Difference.</h2>
          <p className="text-lg sm:text-xl opacity-80 mb-6 max-w-2xl mx-auto">
            Your support can help us continue our mission of providing free, compassionate care to all.
          </p>
          <Link
            to="/donation"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg shadow-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;