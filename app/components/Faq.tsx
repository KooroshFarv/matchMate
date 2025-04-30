'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const faq = [
  { question: 'Is MatchMate free to use?', answer: 'Yes! MatchMate is completely free to style your space and furniture. Enjoy unlimited designs!' },
  { question: 'Can I upload multiple photos?', answer: 'Currently, we support one photo at a time to ensure the best quality. Batch uploads are coming soon!' },
  { question: 'What styles can I choose from?', answer: 'You can pick from minimalist, cozy, modern, industrial, and many more.' },
  { question: 'Will my uploaded photos be saved?', answer: 'Nope! Your photos are processed securely and deleted automatically after a while.' },
  { question: 'Can I use MatchMate on mobile devices?', answer: 'Yes, MatchMate is fully responsive and works smoothly on smartphones and tablets.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="w-full px-6 py-20 text-[#DCD7C9]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl text-black mb-10">FAQ</h2>


        <div className="flex flex-wrap items-start gap-8">
          {faq.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-2rem)] lg:flex-[0_0_calc(33.333%-2rem)]
             bg-[#011112c2] rounded-xl p-6 shadow-md hover:shadow-lg transition">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-xl font-semibold">{f.question}</h3>
                  <span className="ml-4 text-2xl">{isOpen ? '−' : '+'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden mt-4"
                    >
                      <p className="text-[#DCD7C9]/80 text-md">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}