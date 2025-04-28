'use client'

import UploadBox from "../components/upload/UploadBox";
import StyleSelector from "../components/upload/StyleSelector";
import { useState } from "react";

export default function DesignPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center gap-24 max-w-6xl mx-auto px-4 w-full min-h-screen bg-[#23486A]">
      <div className="w-full max-w-md mt-40">
        {!submitted && !resultUrl && (
          <UploadBox
            onUpload={setImageUrl}
            resultUrl={resultUrl}
            isSubmitted={submitted}
            isGenerating={isSubmitting}
          />
        )}
      </div>
      <div className="w-full max-w-md mt-44">
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
  );
}