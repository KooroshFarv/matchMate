'use client'

import Navbar from "./components/Navbar";
import UploadBox from "./components/upload/UploadBox";
import StyleSelector from "./components/upload/StyleSelector";
import { useState } from "react";
import ChoicePage from "./components/Choice";
import Footer from "./components/Footer";
import TestimonialPage from "./components/Testimonial";
import FAQPage from "./components/Faq";
import ContactPage from "./components/Contact";

export default function Home() {
  const [selection, setSelection] = useState({
    style: '',
    room: '',
    vibe: ''
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mode, setMode] = useState<'design' | 'match' | null>(null); 
  const [resultUrl , setResultUrl] = useState<string | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {!mode && <ChoicePage setMode={setMode} />}
        
        {mode === 'design' && (
          <div className="flex justify-center items-center gap-24 max-w-6xl mx-auto px-4 w-full">
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
                onChange={setSelection}
                imageUrl={imageUrl}
                setSubmitted={setSubmitted}
                setResultUrl={setResultUrl}
                resultUrl={resultUrl}
                onChangeImage={setImageUrl}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
              />
            </div>
          </div>
        )}
      </main>
      <div className="mt-16">

        <FAQPage />


      <TestimonialPage />
      </div>

      <ContactPage />

      <Footer />
    </div>
  );
}
