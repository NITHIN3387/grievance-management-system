// components/Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white p-4">
      <div className="container mx-auto">
        <div className="footer-content flex justify-between items-center">
          <div className="social-icons mr-2">
            <a className ='mx-10'  href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
              < FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a className ='mx-10' href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a  className ='mx-10' href="https://twitter.com/your-twitter-page" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
          <div className="footer-text">
            &copy; {new Date().getFullYear()} internshipwefour. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
