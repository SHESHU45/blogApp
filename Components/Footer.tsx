import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6">
        {/* Logo */}
        <div>
          <Image src={assets.logo_light} alt="Logo" width={120} height={0} />
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-center sm:text-left">
          All rights reserved. made by ❤️️ Sheshu
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook">
            <Image src={assets.facebook_icon} alt="Facebook" width={30} height={30} />
          </a>
          <a href="#" aria-label="Twitter">
            <Image src={assets.twitter_icon} alt="Twitter" width={30} height={30} />
          </a>
          <a href="#" aria-label="Google Plus">
            <Image src={assets.googleplus_icon} alt="Google Plus" width={30} height={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
