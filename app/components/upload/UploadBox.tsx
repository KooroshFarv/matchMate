'use client'
import { useState, useRef } from "react"
import axios from "axios"
import { Spinner } from "../ui/Spinner"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const CLOUDINARY_UPLOAD_PRESET = "matchmate_example"
const CLOUDINARY_CLOUD_NAME = "da0wbsjhp"

type UploadBoxProps = {
  onUpload: (url: string) => void
  resultUrl?: string | null
  isSubmitted?: boolean
}

const UploadBox = ({ onUpload, resultUrl, isSubmitted }: UploadBoxProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const displayUrl = isSubmitted && resultUrl ? resultUrl : previewUrl
  const isLocked = isSubmitted && !!resultUrl

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

    try {
      setLoading(true)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      setPreviewUrl(res.data.secure_url)
      onUpload(res.data.secure_url)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && !isLocked) handleUpload(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && !isLocked) handleUpload(file)
  }

  return (
    <div
      className="relative w-[500px] h-[500px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center text-center text-gray-500 hover:bg-gray-50 transition cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={!isLocked && !loading ? handleDrop : undefined}
      onClick={() => {
        if (!loading && !isLocked) inputRef.current?.click()
      }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center w-full h-full"
          >
            <Spinner className="w-6 h-6 text-gray-500 animate-spin" />
          </motion.div>
        ) : displayUrl ? (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            {!isLocked && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewUrl(null)
                  onUpload("")
                }}
                className="absolute top-2 right-2 bg-white text-gray-600 rounded-full p-1 shadow-md hover:bg-red-100 transition"
              >
                <X />
              </button>
            )}
            <img
              src={displayUrl}
              alt="Preview"
              className="object-cover w-full h-full rounded-lg"
            />
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            📤 Drop your room photo here<br />or click to upload
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}

export default UploadBox
