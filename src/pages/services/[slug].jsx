import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Stethoscope,
  Ambulance,
  HeartPulse,
  FlaskConical,
  Pill,
  Baby,
} from 'lucide-react';

const iconComponents = {
  Stethoscope,
  Ambulance,
  HeartPulse,
  FlaskConical,
  Pill,
  Baby,
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:1337/api/services?filters[slug][$eq]=${slug}&populate=*`
    )
      .then((res) => res.json())
      .then(({ data }) => {
        const item = data?.[0];
        if (!item) {
          setService(null);
          setIsLoading(false);
          return;
        }

        // ✅ handle image (Strapi v5 media)
        const img = item.image || item.imageUrl || null;
        const imageUrl =
          img?.url ||
          img?.formats?.medium?.url ||
          img?.formats?.thumbnail?.url ||
          '';

        // ✅ handle fullDescription (HTML or JSON rich text)
        let fullDescription = '';
        if (typeof item.fullDescription === 'string') {
          fullDescription = item.fullDescription;
        } else if (Array.isArray(item.fullDescription)) {
          fullDescription = item.fullDescription
            .map((block) =>
              block.children?.map((child) => child.text).join(' ')
            )
            .join('\n');
        }

        setService({
          id: item.id,
          title: item.title,
          description: item.description,
          fullDescription,
          imageUrl,
          icon: iconComponents[item.iconName] || null,
        });

        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((error) => {
        console.error('Failed to fetch service details:', error);
        setService(null);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            404 - Service Not Found
          </h1>
          <p className="text-lg text-gray-600">
            The service you are looking for does not exist.
          </p>
          <Link
            to="/service"
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const PageIcon = service.icon;

  return (
    <motion.div
      className="font-poppins bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="relative bg-blue-800 text-white py-20 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {PageIcon && (
            <PageIcon
              size={64}
              className="mx-auto mb-4 text-blue-400 drop-shadow-md"
            />
          )}
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>
      </div>

      {/* Main Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Image */}
            {service.imageUrl && (
              <img
                src={`http://localhost:1337${service.imageUrl}`}
                alt={service.title}
                className="w-full h-auto mb-8 rounded-xl shadow-md"
              />
            )}

            {/* Full Description */}
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: service.fullDescription }}
            ></div>

            {/* Back Button */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <Link
                to="/service"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition"
              >
                <ArrowLeft size={20} /> Back to All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServiceDetailPage;
