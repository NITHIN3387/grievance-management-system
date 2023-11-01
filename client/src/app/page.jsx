'use client'

import React, { useEffect, useState } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import Image from "next/image";
import home from "@assets/images/home.png";
import Link from "next/link";
import Footer from "@components/footer/Footer";
import authUser from "@utils/authUser";

const Home = () => {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const auth = async () => {
      await authUser()
        .then((data) => {
          // checking whether user is authorized or not
          if (data) setUser(data);
          else router.replace("/login");
        })
        .catch((err) => {
          console.log("fail to fetch user details\n", err);
        });
    };

    auth()
  }, [user])

  return (
    <WebsiteLayout>
      <div className="h-[calc(100vh-5rem)] grid grid-rows-[1fr_2.5rem] overflow-y-scroll">
        <section className="md:p-8 p-4 grid lg:grid-cols-2 md:grid-cols-[2fr_3fr]">
          <div className="md:flex hidden justify-center relative">
            <Image
              src={home}
              alt="no profile"
              layout="fill"
              objectFit="contain"
              className="xl:scale-75"
            />
          </div>
          <div className="sm:p-4 flex flex-col justify-center items-start">
            <h2 className="lg:text-3xl text-2xl font-bold mb-4">
              About Grievance Management
            </h2>
            <p className="text-black-600 mb-4">
              Our Grievance Management System offers a user-friendly platform
              for effectively addressing concerns and issues. With us, you can
              easily submit your grievances online, track your status in
              real-time, and reach out to our dedicated support team for
              assistance. We're committed to providing a streamlined process
              that empowers individuals and organizations to manage your
              concerns efficiently and professionally.Our platform prioritizes
              transparency and efficiency, ensuring that your grievances are
              handled promptly and with the utmost professionalism. Join us
              today to take advantage of a cutting-edge system that makes
              grievance management hassle-free and user-centric.
            </p>
            { !user ?
              (<Link
                href="/login"
                className="cta-button bg-orange-600 text-white py-2 px-4 rounded-lg mt-2 inline-block hover:border-white "
              >
                Login
              </Link>) :
              // user.email.endsWith("kar.in") ?
              true ?
              (<Link
                href="/admin"
                className="cta-button bg-orange-600 text-white py-2 px-4 rounded-lg mt-2 inline-block hover:border-white "
              >
                Go to Dashboard
              </Link>) :
              (<Link
                href="/user"
                className="cta-button bg-orange-600 text-white py-2 px-4 rounded-lg mt-2 inline-block hover:border-white "
              >
                Go to Dashboard
              </Link>)


            }
          </div>
        </section>
        <Footer />
      </div>
    </WebsiteLayout>
  );
};

export default Home;
