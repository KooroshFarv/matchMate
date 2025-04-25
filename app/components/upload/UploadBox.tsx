'use client'

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Spinner } from "../ui/Spinner"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "../ui/button"

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
  const [after, setAfter] = useState(true)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const displayUrl = !isSubmitted ? previewUrl : null;
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

  useEffect(() => {
    if (resultUrl && isSubmitted) {
      setAfter(true)
      setPreviewUrl(null)
    }
  }, [resultUrl, isSubmitted])

  return (
    
    <div
    className={`relative w-[500px] h-[500px] 
      rounded-lg overflow-hidden mt-20
      flex items-center justify-center text-center text-gray-500 cursor-pointer
      ${previewUrl || (isSubmitted && resultUrl) ? 'border-none' : 'border-2 border-dashed border-gray-300'}
    `}
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
            key={displayUrl + after}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex justify-center items-center"
          >
            {!isLocked && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewUrl(null)
                  onUpload("")
                }}
                className="absolute top-2 right-2 text-gray-600 rounded-full p-1 hover:scale-105 hover:text-gray-800 cursor-pointer transition"
              >
                <X />
              </button>
            )}
            <img
              src={displayUrl}
              alt="Preview"
              className="object-contain max-w-full max-h-full rounded-lg"
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

      {previewUrl && resultUrl && (
        <Button
          className="absolute top-3 left-3 z-10 bg-white px-3 py-1 text-sm rounded-md shadow-md hover:bg-gray-100 transition"
          onClick={(e) => {
            e.stopPropagation()
            setAfter((prev) => !prev)
          }}
        >
          {after ? "Show Before" : "Show After"}
        </Button>
      )}

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
