'use client'
import { useState, useRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Button } from "../ui/button"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

type Props = {
  onChange: (data: { style: string; room: string; vibe: string }) => void
  imageUrl: string | null
  setSubmitted: (value: boolean) => void
}

const StyleSelector = ({ onChange, imageUrl, setSubmitted }: Props) => {
  const [style, setStyle] = useState("")
  const [room, setRoom] = useState("")
  const [vibe, setVibe] = useState("")
  const [attempt, setAttempt] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setIsSubmitted] = useState(false)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const isReady = imageUrl && style && room && vibe

  const handleUpdates = (key: string, value: string) => {
    const newValues = { style, room, vibe, [key]: value }
    setStyle(newValues.style)
    setRoom(newValues.room)
    setVibe(newValues.vibe)
    onChange(newValues)
  }

  const handleSubmit = () => {
    if (!isReady) {
      setAttempt(true)
      return
    }

    setIsSubmitting(true)
    setAttempt(false)
    toast.info("Hang tight, we’re generating your design...")

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setSubmitted(true) // ✅ Trigger final image reveal
      previewRef.current?.scrollIntoView({ behavior: "smooth" })
      toast.success("Your design is ready")
    }, 4000)
  }

  return (
    <>
        <div className="w-full max-w-md mt-56 ml-10">
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
          disabled={isSubmitting}
          onClick={handleSubmit}
          className={`mt-10 py-3 rounded-md transition ${
            isReady
              ? "bg-black w-32 text-white hover:scale-105 cursor-pointer"
              : "bg-gray-200 w-32 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? 'Generating .. ' : 'Submit'}
        </Button>

        {submitted && (
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 p-6 border border-gray-200 rounded-lg shadow-md"
          >
            <p className="text-lg font-semibold mb-4">🎨 Your AI-styled room:</p>
            <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              This is where your generated result will appear.
            </div>
          </motion.div>
        )}

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
