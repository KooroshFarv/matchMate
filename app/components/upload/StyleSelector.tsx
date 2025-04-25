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
import { X } from "lucide-react"

type Props = {
  onChange: (data: { style: string; room: string; vibe: string }) => void
  imageUrl: string | null
  setSubmitted: (value: boolean) => void
  setResultUrl: (url: string | null) => void
  onChangeImage: (url: string | null) => void
  resultUrl: string | null
  isSubmitting : boolean
  setIsSubmitting : ( value : boolean) => void
}

const StyleSelector = ({
  onChange,
  onChangeImage,
  imageUrl,
  setSubmitted,
  setResultUrl,
  isSubmitting,
  setIsSubmitting,
  resultUrl,
}: Props) => {
  const [style, setStyle] = useState("")
  const [room, setRoom] = useState("")
  const [vibe, setVibe] = useState("")
  const [attempt, setAttempt] = useState(false)
  const [submitted, setIsSubmitted] = useState(false)
  const [after, setAfter] = useState(true) 
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
    toast.info("Hang tight, we're generating your design...")

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
      // toast.success("Your Design is Ready!")
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
          <SelectTrigger
          disabled = {isSubmitting}
          className="w-full h-12 rounded-md border border-gray-300 px-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
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
          <SelectTrigger 
          disabled = {isSubmitting}
          className="w-full h-12 rounded-md border border-gray-300 px-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
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
          <SelectTrigger
          disabled = {isSubmitting}
          className="w-full h-12 rounded-md border border-gray-300 px-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
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
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
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

        {isSubmitting && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
        )}

      <div className="w-[500px] h-[500px] flex items-center justify-center overflow-hidden rounded-lg">

            {(after ? resultUrl : imageUrl) &&(
          <img
          src={after ? resultUrl! : imageUrl!}
          alt="Generated design"
          className="object-contain max-w-full max-h-full"
          
          />
        )}
        </div>

          <Button
            className="mt-4 bg-gray-700 px-3 py-1 text-sm rounded-md shadow-md hover:bg-black transition"
            onClick={() => setAfter((prev) => !prev)}
          >
            {after ? "Show Before" : "Show After"}
          </Button>
                {imageUrl && resultUrl && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSubmitted(false)
            setIsSubmitted(false)
            setResultUrl(null)
            onChangeImage(null)
            setStyle("")
            setRoom("")
            setVibe("")
            setAfter(true)
            onChange({ style: "", room: "", vibe: "" })
          }}
          className="absolute top-0 right-0 text-gray-600 rounded-full p-1 hover:scale-105
           hover:text-gray-800 cursor-pointer transition"
        >
          <X />
        </button>
)}

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
