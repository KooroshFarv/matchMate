'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import UploadBox from "./components/upload/UploadBox";
import StyleSelector from "./components/upload/StyleSelector";
import { useState } from "react";



export default function Home() {
  const [ selection, setSelection] = useState({
    style : '',
    room : '',
    vibe : ''
  })
  

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-start gap-12 max-w-6xl mx-auto mt-10 px-4 w-full">
  <div className="w-full max-w-md mt-40">
    <UploadBox />
  </div>
  <div className="w-full max-w-md mt-56">
    <StyleSelector onChange={setSelection} />
  </div>
</div>

    </>
  );
}
