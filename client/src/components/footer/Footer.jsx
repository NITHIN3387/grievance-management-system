// components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white text-center p-2">
      &copy; {new Date().getFullYear()} internshipwefour. All rights reserved.
    </footer>
  );
};

export default Footer;
