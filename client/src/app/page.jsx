import React from 'react';
import WebsiteLayout from '@layouts/WebsiteLayout';
import Image from 'next/image';
import home from '@assets/images/home.png';
import Link from 'next/link';

const Home = () => {
  return (
    <WebsiteLayout>
      <div>
        {/* Heading for the homepage */}
        <section className="hero bg-gray-100 text-center py-12">
          <h1 className="text-3xl font-bold">Welcome to the Grievance Management System</h1>
        </section>

        {/* Content Section */}
        <section className="bg-gray-200 py-8">
          <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-4">
              <div className=" shadow-md rounded-lg relative">
                <Image
                  src={home}
                  alt="no profile"
                  width={400} // Set the width here
                  height={300} // Set the height here
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 mb-4">
              <div className="border p-4 bg-gray-200 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4">About Grievance Management</h2>
                <p className="text-black-600 mb-4">
                  Our Grievance Management System offers a user-friendly platform for effectively addressing concerns and issues. With us, you can easily submit your grievances online, track your status in real-time, and reach out to our dedicated support team for assistance. We're committed to providing a streamlined process that empowers individuals and organizations to manage your concerns efficiently and professionally.Our platform prioritizes transparency and efficiency, ensuring that your grievances are handled promptly and with the utmost professionalism. Join us today to take advantage of a cutting-edge system that makes grievance management hassle-free and user-centric.
                </p>
                <Link href="/login" className="cta-button bg-orange-600 text-white py-2 px-4 rounded-lg mt-2 inline-block hover:border-white ">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
};

export default Home;
