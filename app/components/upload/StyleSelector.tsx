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
import axios from "axios"

type Props = {
  onChange: (data: { style: string; room: string; vibe: string }) => void
  imageUrl: string | null
  setSubmitted: (value: boolean) => void
  setResultUrl: (url: string) => void
  resultUrl: string | null
}

const StyleSelector = ({
  onChange,
  imageUrl,
  setSubmitted,
  setResultUrl,
  resultUrl,
}: Props) => {
  const [style, setStyle] = useState("")
  const [room, setRoom] = useState("")
  const [vibe, setVibe] = useState("")
  const [attempt, setAttempt] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setIsSubmitted] = useState(false)
  const [after, setAfter] = useState(true) // <- NEW toggle state
  const previewRef = useRef<HTMLDivElement | null>(null)

  const isReady = imageUrl && style && room && vibe

  const handleUpdates = (key: "style" | "room" | "vibe", value: string) => {
    const updated = {
      style,
      room,
      vibe,
      [key]: value,
    }

    if (key === "style") setStyle(value)
    if (key === "room") setRoom(value)
    if (key === "vibe") setVibe(value)

    onChange(updated)
  }

  const handleSubmit = async () => {
    if (!isReady) {
      setAttempt(true)
      return
    }

    setIsSubmitting(true)
    setAttempt(false)
    toast.info("Hang tight, we’re generating your design...")

    const { data } = await axios.post("/api/generate", {
      imageUrl,
      room,
      vibe,
      style,
    })

    if (data?.resultUrl) {
      setIsSubmitting(false)
      setSubmitted(true)
      setResultUrl(data.resultUrl)
      setIsSubmitted(true)
      setAfter(true) 
      previewRef.current?.scrollIntoView({ behavior: "smooth" })
      toast.success("Your Design is Ready!")
    } else {
      toast.error("Something went wrong :(")
    }
  }

  return (
    <div className="w-full max-w-md mt-64 ml-10 space-y-4">
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
        {isSubmitting ? "Generating..." : "Submit"}
      </Button>

      {/* Result Preview */}
      {submitted && (
        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10 p-6 border border-gray-200 rounded-lg absolute left-24 bottom-20 shadow-md"
        >
      
          <img
            src={after ? resultUrl ?? "" : imageUrl ?? ""}
            alt="Generated design"
            className="w-full h-auto rounded-lg shadow"
          />

          <Button
            className="mt-4 bg-gray-700 px-3 py-1 text-sm rounded-md shadow-md hover:bg-black transition"
            onClick={() => setAfter((prev) => !prev)}
          >
            {after ? "Show Before" : "Show After"}
          </Button>
        </motion.div>
      )}

      {attempt && !isReady && (
        <p className="text-sm text-red-500 mt-2">
          Please complete all selections and upload a photo.
        </p>
      )}
    </div>
  )
}

export default StyleSelector
