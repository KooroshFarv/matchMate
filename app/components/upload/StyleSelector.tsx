import { useState } from "react";import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"


const StyleSelector = ({ onChange }: { onChange: (data: { style: string, room: string, vibe: string }) => void }) => {
    const [style, setStyle] = useState("")
    const [room, setRoom] = useState("")
    const [vibe, setVibe] = useState("")


    const handleUpdates = (key : string, value:string) => {
        const newValues = {style, room, vibe, [key]: value }
        setStyle(newValues.style)
        setRoom(newValues.room)
        setVibe(newValues.vibe)
        onChange(newValues)
    }
    return ( 
        <>
            <div className="flex flex-col gap-6 w-full max-w-md">
            {/* Style */}
            <div>
                <label className="mb-1 block">Style</label>
                <Select onValueChange={(value) => handleUpdates("style", value)}>
                <SelectTrigger className="w-full h-12 rounded-md border border-gray-300 px-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
                <SelectValue placeholder='Choose a style' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="scandinavian">Scandinavian</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="cozy">Cozy</SelectItem>
                        <SelectItem value="boho">Boho</SelectItem>
                        <SelectItem value="japandi">Japandi</SelectItem>
                     </SelectContent>
                </Select>
            </div>



            {/* Room */}

            <div>
                <label className="mb-1 block">Room</label>
                <Select onValueChange={(value) => handleUpdates("room", value)}>
                <SelectTrigger className="w-full h-12 rounded-md border border-gray-300 px-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
                        <SelectValue placeholder='Choose a room' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="living">Living Room</SelectItem>
                        <SelectItem value="bedroom">Bedroom</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="bathroom">Bathroom</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* vibe */}

            <div>
                <label className="mb-1 block">Vibe</label>
                <Select onValueChange={(value) => handleUpdates("vibe", value)}>
                <SelectTrigger className="w-full h-12 rounded-md border border-gray-300 px-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
                        <SelectValue placeholder='Choose a vibe' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="calm">Calm</SelectItem>
                        <SelectItem value="bright">Bright</SelectItem>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="moody">Moody</SelectItem>
                        <SelectItem value="Luxurious">Luxurious</SelectItem>
                 </SelectContent>
                </Select>
            </div>
        </div>
        </>
     );
}
 
export default StyleSelector;