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
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24 mx-auto px-4 w-full min-h-screen pt-24">
        <div className="w-full max-w-md">
        {!submitted && !resultUrl && (
          <UploadBox
            onUpload={setImageUrl}
            resultUrl={resultUrl}
            isSubmitted={submitted}
            isGenerating={isSubmitting}
          />
        )}
      </div>
      <div className="w-full max-w-md">
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