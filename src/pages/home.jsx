// src/pages/home.jsx
import React from "react";
import Hero from "../components/hero"; // Assuming your hero component is in this path
import MissionSection from "../components/MissionSection";
import CounterSection from "../components/countersection";
import ServicesSection from "../components/ServicesSection";
import DonationSection from "../components/donationsection";
//import TestimonialsSection from "../components/TestimonialsSection";
import GallerySection from "../components/gallerysection";
import BlogSection from "../components/blogsection";
//import ServiceSection from "../components/ServiceSection"; // Add other sections here
//import AboutSection from "../components/AboutSection";


const Home = () => {
  return (
    <div>
      {/* The Hero component is now correctly placed here */}
      <Hero /> 
<MissionSection/>
<BlogSection/>
<CounterSection/>
<ServicesSection/>
<DonationSection/>
<GallerySection/>
      {/* Other sections of your homepage go here */}
     
    </div>
  );
};

export default Home;
