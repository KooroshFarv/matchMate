'use client'

import { Button } from "@/app/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react";


const Navbar = () => {
    const [open, setOpen] = useState(false)
  return (
    <nav className="w-full bg-[#011112c2] text-white py-6 md:px-8 px-8 flex justify-between items-center border-b border-[#3F4F44]/50">
      <h1 className="text-xl font-bold">
         <Link href='/'>Match Mate</Link>
         </h1>

         <div className="hidden md:flex flex-col md:flex-row gap-4 md:gap-10 items-center">
         {/* <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer font-medium hover:text-[#DCD7C9]/80 transition">
            Concepts
          </DropdownMenuTrigger> 
          <DropdownMenuContent>
            <DropdownMenuItem>Modern</DropdownMenuItem>
            <DropdownMenuItem>Minimal</DropdownMenuItem>
            <DropdownMenuItem>Cozy</DropdownMenuItem>
            <DropdownMenuItem>Industrial</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <div className="cursor-pointer font-medium hover:text-[#DCD7C9]/80 transition">Inspiration</div>
        <div className="cursor-pointer font-medium hover:text-[#DCD7C9]/80 transition">Match Items</div>
        <div className="cursor-pointer font-medium hover:text-[#DCD7C9]/80 transition">Contact</div>
      </div>

      <div className="md:hidden">
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
        {open ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>


        {open && (
         <div className="md:hidden fixed top-0 left-0 w-full h-full z-50 justify-center flex flex-col items-center bg-transparent text-white py-4 gap-4">
            <button 
      onClick={() => setOpen(false)} 
      className="absolute top-6 right-6 text-white focus:outline-none"
    >
      <X size={32} />
    </button>
            <Link href='#' onClick={() => setOpen(false)}  className="hover:text-[#DCD7C9]/80 transition">Inspiration</Link>
            <Link href='#' onClick={() => setOpen(false)}  className="hover:text-[#DCD7C9]/80 transition">Math Items</Link>
            <Link href='#' onClick={() => setOpen(false)}  className="hover:text-[#DCD7C9]/80 transition">Contact</Link>

            <Button className="text-[#DCD7C9] cursor-pointer hover:bg-black transition">
                Sign In
            </Button>
         </div>

        )}
    </nav>
  )
}

export default Navbar
