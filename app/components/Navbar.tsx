import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu"


const Navbar = () => {
    return ( 
       <nav className="flex justify-between shadow-sm items-center p-4  ">
        <h1>MatchMade</h1>
        <div className="flex gap-10 justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer font-medium">
                    Concepts
                </DropdownMenuTrigger> 
                <DropdownMenuContent>
                    <DropdownMenuItem>Modern</DropdownMenuItem>
                    <DropdownMenuItem>Minimal</DropdownMenuItem>
                    <DropdownMenuItem>Cozy</DropdownMenuItem>
                    <DropdownMenuItem>Industrial</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="cursor-pointer font-medium hover:text-gray-800"> Inspiration </div>
            <div className="cursor-pointer font-medium hover:text-gray-800"> Contact </div>
        </div>
            <Button variant='ghost' className="cursor-pointer">Sign In</Button>
       </nav>
     );
}
 
export default Navbar;