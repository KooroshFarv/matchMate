'use client'

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#011112c2] text-white py-6 px-8 flex justify-between items-center border-b border-[#3F4F44]/50">
      <h1 className="text-xl font-bold">
        <Link href="/">Match Mate</Link>
      </h1>

      <div className="hidden md:flex flex-row gap-10 items-center">
        <Link href="#" className="hover:text-[#DCD7C9]/80 transition">Inspiration</Link>
        <Link href="#" className="hover:text-[#DCD7C9]/80 transition">Match Items</Link>
        <Link href="#" className="hover:text-[#DCD7C9]/80 transition">Contact</Link>
      </div>

      <div className="md:hidden w-[30px] flex justify-end">
  <button
    onClick={() => setOpen(true)}
    className={`focus:outline-none transition-opacity duration-200 ${
      open ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}
    aria-label="Open menu"
  >
    <Menu size={28} />
  </button>
</div>



      <div className={`md:hidden fixed top-0 right-0 w-1/2 h-full z-50 text-black pt-6 px-6 backdrop-blur-md bg-transparent border-l border-white/10 transition-all duration-300 ease-in-out transform ${
        open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="focus:outline-none"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-6 mt-10">
          <Link href="#" onClick={() => setOpen(false)} className="text-lg hover:text-[#DCD7C9]/80 transition">Inspiration</Link>
          <Link href="#" onClick={() => setOpen(false)} className="text-lg hover:text-[#DCD7C9]/80 transition">Match Items</Link>
          <Link href="#" onClick={() => setOpen(false)} className="text-lg hover:text-[#DCD7C9]/80 transition">Contact</Link>
          <Button className="text-[#DCD7C9] cursor-pointer hover:bg-black transition w-fit mt-2">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;