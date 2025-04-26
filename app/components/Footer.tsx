'use client'

import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-[#011112c2] py-10 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-6">
        
        {/* Left side */}
        <div className="text-center md:text-left">
          <h3 className="text-[#DCD7C9] text-lg font-semibold">MatchMate</h3>
          <p className="text-[#DCD7C9] text-sm mt-2">Find your perfect match for furniture and spaces ✨</p>
        </div>

        {/* Right side: Socials */}
        <div className="flex gap-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-[#DCD7C9] hover:text-[#DCD7C9]/70 transition">
            <FaGithub size={24} />
          </a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-[#DCD7C9] hover:text-[#DCD7C9]/70 transition">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-[#DCD7C9] hover:text-[#DCD7C9]/70 transition">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-[#DCD7C9]/60 text-xs mt-8">
        © 2025 MatchMate. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
