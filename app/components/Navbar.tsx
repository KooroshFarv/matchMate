'use client'

import { Button } from "@/app/components/ui/button"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full bg-[#011112c2] text-white py-6 px-8 flex justify-between items-center border-b border-[#3F4F44]/50">
      <h1 className="text-xl font-bold">
         <Link href='/'>Match Mate</Link>
         </h1>

      <div className="flex gap-10 justify-center items-center">
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
        <div className="cursor-pointer font-medium hover:text-[#DCD7C9]/80 transition">Match Item</div>
        <div className="cursor-pointer font-medium hover:text-[#DCD7C9]/80 transition">Contact</div>
      </div>

      <Button className="text-[#DCD7C9] cursor-pointer hover:bg-black transition">
        Sign In
      </Button>
    </nav>
  )
}

export default Navbar
