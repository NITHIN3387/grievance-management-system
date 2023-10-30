import React from 'react';
import WebsiteLayout from "@layouts/WebsiteLayout";
import Image from 'next/image';
import thiranga from '@assets/images/thiranga.jpeg'
const Home = () => {
  return (
    <WebsiteLayout>
       <div>
        
{/* its a heading for our homepage */}
      <section className="hero bg-gray-100 text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Grievance Management System</h1>
        <p>Your platform for addressing concerns and issues.</p>
        <a href="#submit" className="cta-button bg-blue-950 text-white py-2 px-4 rounded-lg mt-4 inline-block">
          Submit a Grievance
        </a>
      </section>

      {/* <section className="features bg-gray-200 py-8 text-center">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature">
            <i className="fas fa-comments text-4xl text-blue-500"></i>
            <button className=" font-bold mt-4 bg-blue-950 text-white">Submit Your Grievance</button>
            <p>Quickly and easily submit your grievance online.</p>
          </div>
          <div className="feature">
            <i className="fas fa-check-circle text-4xl text-blue-500"></i>
            <button className=" font-bold mt-4 bg-blue-950 text-white">Check Status</button>
            <p>Track the status of your grievance in real-time.</p>
          </div>
          <div className="feature">
            <i className="fas fa-envelope text-4xl text-blue-500"></i>
            <button className=" font-bold mt-4 bg-blue-950 text-white">Contact Us</button>
            <p>Get in touch with our support team for assistance.</p>
          </div>
        </div>
      </section> */}


      <footer className="bg-blue-950 text-white text-center py-4 ">
     
        <h2 className="  font-bold">Contact Information</h2>
        <p>If you need assistance or have questions, please contact us:</p>
        <p>Email: <a href="mailto:support@example.com">interwefour@example.com</a></p>
        <p>Phone: <a href="tel:123-456-7890">123-456-7890</a></p>
     
        &copy; 2023 Government Department
      </footer>
    </div>
  
    </WebsiteLayout>
  );
};

export default Home;
