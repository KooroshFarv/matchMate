'use client'

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Spinner } from "../ui/Spinner"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { compressImage } from "@/utils/compress"

const CLOUDINARY_UPLOAD_PRESET = "matchmate_example"
const CLOUDINARY_CLOUD_NAME = "da0wbsjhp"

type UploadBoxProps = {
  onUpload: (url: string) => void
  resultUrl?: string | null
  isSubmitted?: boolean
  isGenerating? : boolean 
}




const UploadBox = ({ onUpload, resultUrl, isSubmitted, isGenerating }: UploadBoxProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const displayUrl = !isSubmitted ? previewUrl : null
  const isLocked = isSubmitted && !!resultUrl

  const handleUpload = async (file: File) => {
    setLoading(true);
  
    try {
      const compressed = await compressImage(file); 
      const formData = new FormData();
      formData.append('file', compressed);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
  
      setPreviewUrl(res.data.secure_url);
      onUpload(res.data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
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
      setPreviewUrl(null)
    }
  }, [resultUrl, isSubmitted])

  return (
    <div
      className={`relative w-[500px] h-[500px] rounded-lg overflow-hidden mt-20 flex items-center justify-center text-center text-white
         bg-[#011112c2] cursor-pointer ${displayUrl || (isSubmitted && resultUrl) ?
          'bg-transparent border-none' : 'border-2 border-dashed border-gray-300'}
      `}
      onDragOver={(e) => e.preventDefault()}
      onDrop={!isLocked && !loading && !isGenerating ? handleDrop : undefined}
      onClick={() => {
        if (!loading && !isLocked && !isGenerating) inputRef.current?.click()
      }}
    >
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center w-full h-full"
          >
            <Spinner className="w-6 h-6 text-gray-500 animate-spin" />
          </motion.div>
        )}

        {!loading && displayUrl && (
          <motion.div
            key={displayUrl}
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
                className="absolute top-0 right-0 text-white rounded-full p-1 hover:scale-105 hover:text-gray-800 cursor-pointer transition"
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
        )}

        {!loading && !displayUrl && (
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
