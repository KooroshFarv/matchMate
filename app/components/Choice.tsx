'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import { Button } from "./ui/button";
import UploadBox from "./upload/UploadBox"
import StyleSelector from "./upload/StyleSelector"

const ChoicePage = ({setMode} : { setMode : (value : 'design' | 'match') => void}) => {
    const [choice, setChoice] = useState<'design' | 'match' | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState(false)
    const [selection, setSelection] = useState({ style : '', room : '', vibe : ''})

    return ( 
            <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
                <AnimatePresence mode="wait">
                    {!choice && (
                         <motion.div
                         key="choice"
                         initial={{ opacity: 0, y: 40 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -20 }}
                         transition={{ duration: 0.5 }}
                         className="text-center"
                       >
                    <h1 className="text-3xl font-semibold mb-8">What do yo you like to do today ?</h1>
                    <div className="flex gap-4 justify-center">
                    <Button onClick={() => setChoice("design")} className="cursor-pointer"> Style my room</Button>
                    <Button onClick={() => setChoice("match")} className="cursor-pointer"> Match this item</Button>
                    </div>
                    </motion.div>
                    )}

                    {choice === 'design' && (
                           <motion.div
                           key="design"
                           initial={{ opacity: 0, y: 40 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.5 }}
                           className="flex flex-col lg:flex-row items-start justify-center gap-12 max-w-6xl mt-20 w-full"
                         >
                            <div className="w-full max-w-md">
                            <UploadBox onUpload={setImageUrl} isSubmitted={submitted}/>
                            </div>
                            <div className="w-full max-w-md">
                            <StyleSelector onChange={setSelection} imageUrl={imageUrl} setSubmitted={setSubmitted}/>
                            </div>
                            
                    </motion.div>
                    )}

                    {choice === 'match' && (
                        <motion.div
                        initial={{ opacity: 0, y: 40 }}
                         animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        >
                        <h2>Cooming soon</h2>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

     );
}
 
export default ChoicePage;