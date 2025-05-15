'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/app/components/ui/button'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full bg-[#011112c2] text-white py-6 px-8 flex items-center border-b border-[#3F4F44]/50">

      <Link href="/" className="text-3xl font-bold flex-shrink-0">
        Match-Mate
      </Link>

      <div className="hidden md:flex flex-1 justify-center gap-10">
        <Link href='/inspiration' className="hover:text-[#DCD7C9]/80 transition">
          Inspiration
        </Link>
        <Link href="#" className="hover:text-[#DCD7C9]/80 transition">
          Match Items
        </Link>
        <Link href="#" className="hover:text-[#DCD7C9]/80 transition">
          Contact
        </Link>
      </div>


      <div className="hidden md:block flex-shrink-0">
        <Button size="sm" className="bg-[#3F4F44] hover:bg-[#2C3930] text-[#DCD7C9]">
          Sign In
        </Button>
      </div>


      <div className="md:hidden ml-auto">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="focus:outline-none"
          >
            <Menu size={28} />
          </button>
        )}
      </div>


      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-full z-50 text-black pt-6 px-6 backdrop-blur-md border-l border-white/10
                    transition-transform duration-300 ease-in-out ${
                      open ? 'translate-x-0' : 'translate-x-full pointer-events-none'
                    }`}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="ml-auto mb-8 focus:outline-none"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col gap-6">
          <Link href="/inspiration" onClick={() => setOpen(false)} className="text-lg hover:text-[#DCD7C9]/80 transition">
            Inspiration
          </Link>
          <Link href="#" onClick={() => setOpen(false)} className="text-lg hover:text-[#DCD7C9]/80 transition">
            Match Items
          </Link>
          <Link href="#" onClick={() => setOpen(false)} className="text-lg hover:text-[#DCD7C9]/80 transition">
            Contact
          </Link>
          <Button onClick={() => setOpen(false)} className="mt-2 text-[#DCD7C9] hover:bg-black w-fit">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar