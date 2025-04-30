'use client'

import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-[#011112eb]  mt-10">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-8 ">
        
        {/* Left side */}
        <div className="text-center md:text-left">
          <h3 className="text-[#DCD7C9] text-lg font-semibold">MatchMate</h3>
          <p className="text-[#DCD7C9] text-sm mt-2">Find your perfect match for furniture and spaces ✨</p>
        </div>

        {/* Right side: Socials */}
        <div className="flex gap-6">
          <Link href="https://github.com/KooroshFarv" target="_blank" rel="noopener noreferrer" className="text-[#DCD7C9] hover:text-[#DCD7C9]/70 transition">
            <FaGithub size={24} />
          </Link>
          <Link href="https://instagram.com/originalmedic" target="_blank" rel="noopener noreferrer" className="text-[#DCD7C9] hover:text-[#DCD7C9]/70 transition">
            <FaInstagram size={24} />
          </Link>
          <Link href="https://www.linkedin.com/in/koorosh-farvardin" 
          target="_blank" rel="noopener noreferrer" className="text-[#DCD7C9] hover:text-[#DCD7C9]/70 transition">
            <FaLinkedin size={24} />
          </Link>
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
