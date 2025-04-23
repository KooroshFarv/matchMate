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

  return (
    <>
      <Navbar />
      {!mode && <ChoicePage setMode={setMode} />}
      
      {mode === 'design' && (
        <div className="flex justify-center items-start gap-32 max-w-6xl mx-auto mt-10 px-4 w-full">
          <div className="w-full max-w-md mt-40">
            <UploadBox
              onUpload={setImageUrl}
              resultUrl={submitted ? "/mock-ai-output.jpg" : null}
              isSubmitted={submitted}
            />
          </div>
          <div className="w-full max-w-md  ">
            <StyleSelector
              onChange={setSelection}
              imageUrl={imageUrl}
              setSubmitted={setSubmitted}
            />
          </div>
        </div>
      )}
    </>
  );
}
