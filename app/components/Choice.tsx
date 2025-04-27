'use client'

import { motion } from "framer-motion"
import { Button } from "./ui/button"

type ChoicePageProps = {
  setMode: (value: 'design' | 'match') => void
}

const ChoicePage = ({ setMode }: ChoicePageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen text-center space-y-6"
    >
      <h1 className="text-3xl font-semibold text-black">What do you want to do today?</h1>
      <div className="flex gap-4">
        <Button className="cursor-pointer" onClick={() => setMode('design')}>Style my room</Button>
        <Button className="cursor-pointer" onClick={() => setMode('match')}>Match this item</Button>
      </div>
    </motion.div>
  )
}

export default ChoicePage
