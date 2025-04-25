'use client'
import Navbar from "./components/Navbar";
import UploadBox from "./components/upload/UploadBox";
import StyleSelector from "./components/upload/StyleSelector";
import { useState } from "react";
import ChoicePage from "./components/Choice";

export default function Home() {
  const [selection, setSelection] = useState({
    style: '',
    room: '',
    vibe: ''
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<'design' | 'match' | null>(null); 
  const [resultUrl , setResultUrl] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      {!mode && <ChoicePage setMode={setMode}  setResultUrl={setResultUrl} resultUrl={resultUrl}/>}
      
      {mode === 'design' && (
        <div className="flex justify-center items-start gap-32 max-w-6xl mx-auto px-4 w-full">
          <div className="w-full max-w-md mt-40">
            <UploadBox
            key={resultUrl}
              onUpload={setImageUrl}
              resultUrl={resultUrl}
              isSubmitted={submitted}
            />
          </div>
          <div className="w-full max-w-md ">
            <StyleSelector
              onChange={setSelection}
              imageUrl={imageUrl}
              setSubmitted={setSubmitted}
              setResultUrl={setResultUrl}
              resultUrl={resultUrl}
            />
          </div>
        </div>
      )}
    </>
  );
}
