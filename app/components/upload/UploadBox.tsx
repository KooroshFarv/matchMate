'use client'
import { useState, useRef } from "react"
import axios from "axios"
import { Spinner } from "../ui/Spinner"
import { X } from "lucide-react"


const CLOUDINARY_UPLOAD_PRESET = "matchmate_example"
const CLOUDINARY_CLOUD_NAME = "da0wbsjhp"


const UploadBox = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleUpload = async(file : File) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

        try{
            setLoading(true)
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          ) 
          setPreviewUrl(res.data.secure_url)
        }catch(error){
            console.error("Upload failed:", error)
        }finally{
            setLoading(false)
        }
    }


    const handleDrop = (e : React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]
        if (file) handleUpload(file)
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleUpload(file)

    }

    return ( 
    <div className="w-80 h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-500 hover:bg-gray-50 transition cursor-pointer"
    onDragOver={(e) => e.preventDefault()}
    onDrop={loading || previewUrl ? undefined : handleDrop }
    onClick={() => {
        if(!loading && !previewUrl) inputRef.current?.click()
    }}
    >
        {previewUrl ? (
            <div className="relative w-full h-full">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2  text-gray-600 p-1 cursor-pointer hover:bg-gray-200"
            >
              <X />
            </button>
            <img
                src={previewUrl}
                alt="Uploaded preview"
                className="object-cover w-full h-full rounded-lg"
                />
            </div>
            ) : loading ?(

                <Spinner className="w-6 h-6 text-gray-500 animate-spin" />
        
                ) :previewUrl ? (
                    <img src={previewUrl} alt="Uploaded preview" className="object-cover w-full h-full rounded-lg" />
                ) : (
                    <p>📤 Drop your room photo here<br />or click to upload</p>
                )}
        

       
<input type="file" accept="image/*" ref={inputRef} className="hidden" onChange={handleChange}/>

    </div>
     );
}
 
export default UploadBox;