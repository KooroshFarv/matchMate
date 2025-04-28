'use client'

import UploadBox from "../components/upload/UploadBox";
import StyleSelector from "../components/upload/StyleSelector";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function DesignPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  return (
    <>
        <Navbar />
    <div className="flex flex-col md:flex-row md:gap-24 justify-center items-center gap-24 max-w-6xl mx-auto px-4 w-full min-h-screen">
      <div className="w-full max-w-md mt-20">
        {!submitted && !resultUrl && (
          <UploadBox
            onUpload={setImageUrl}
            resultUrl={resultUrl}
            isSubmitted={submitted}
            isGenerating={isSubmitting}
          />
        )}
      </div>
      <div className="w-full max-w-md mt-20">
        <StyleSelector
          onChangeImage={setImageUrl}
          onChange={console.log} 
          imageUrl={imageUrl}
          setSubmitted={setSubmitted}
          setResultUrl={setResultUrl}
          resultUrl={resultUrl}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </div>
    </>
  );
}