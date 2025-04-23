import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Button } from "../ui/button"

const StyleSelector = ({
  onChange,
  imageUrl,
}: {
  onChange: (data: { style: string; room: string; vibe: string }) => void
  imageUrl: string | null
}) => {
  const [style, setStyle] = useState("")
  const [room, setRoom] = useState("")
  const [vibe, setVibe] = useState("")
  const [attempt, setAttempt] = useState(false)

  const isReady = imageUrl && style && room && vibe

  const handleUpdates = (key: string, value: string) => {
    const newValues = { style, room, vibe, [key]: value }
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
              <SelectValue placeholder="Choose a style" />
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
              <SelectValue placeholder="Choose a room" />
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

        {/* Vibe */}
        <div>
          <label className="mb-1 block">Vibe</label>
          <Select onValueChange={(value) => handleUpdates("vibe", value)}>
            <SelectTrigger className="w-full h-12 rounded-md border border-gray-300 px-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
              <SelectValue placeholder="Choose a vibe" />
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

        {/* Submit Button */}
        <Button
          onClick={() => {
            if (!isReady) {
              setAttempt(true)
              return
            }
            console.log("Generate with", { imageUrl, style, room, vibe })
          }}
          className={`mt-10 py-3 rounded-md transition ${
            isReady
              ? "bg-black w-24 text-white hover:scale-105 cursor-pointer"
              : "bg-gray-200 w-24 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit
        </Button>

        {/* Inline warning if submitted too early */}
        {attempt && !isReady && (
          <p className="text-sm text-red-500 mt-2">
            Please complete all selections and upload a photo.
          </p>
        )}
      </div>
    </>
  )
}

export default StyleSelector
