'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faq = [
    {
        question : "Is MatchMate free to use ? ",
        answer: "Yes! MatchMate is completely free to style your space and furniture. Enjoy unlimited designs!",
    },
    {
        question: "Can I upload multiple photos?",
        answer: "Currently, we support one photo at a time to ensure the best quality. Batch uploads are coming soon!",
      },
      {
        question: "What styles can I choose from?",
        answer: "You can pick from minimalist, cozy, modern, industrial, and many more.",
      },
      {
        question: "Will my uploaded photos be saved?",
        answer: "Nope! Your photos are processed securely and deleted automatically after a while.",
      },
]


const FAQPage = () => {
    const [openIndex , setOpenIndex] = useState<number | null>(null)
    const toggle = (index : number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return ( 

             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20  text-[#DCD7C9]">
             <div className="max-w-7xl mx-auto px-6">
             <h2 className="text-3xl text-left text-black mb-10">FAQ</h2>
             <div className="space-y-4">
                {faq.map((item, index) => (
                    <div key={index} className="bg-[#011112c2] rounded-xl p-6 cursor-pointer shadow-md hover:shadow-lg transition-all"
                    onClick={() => toggle(index)}
                    >
                        <h3 className="text-xl font-semibold flex justify-between items-center">
                            {item.question}
                            <span className="ml-4">{openIndex === index ? '−' : '+'}</span>

                        </h3>

                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                               <motion.div
                               key="content"
                               initial={{ maxHeight: 0, opacity: 0 }}
                               animate={{ maxHeight: 500, opacity: 1 }}
                               exit={{ maxHeight: 0, opacity: 0 }}
                               transition={{ duration: 0.2, ease: "easeInOut" }}
                               className="overflow-hidden mt-4 text-[#DCD7C9]/80 text-md"
                             >
                               <p>{item.answer}</p>
                             </motion.div>

                            )}

                        </AnimatePresence>
               
                     <div
                     className={`mt-4 text-[#DCD7C9]/80 text-md overflow-hidden transition-all duration-300 ${
                       openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                     }`}
                   >
                    </div>
                    </div>
                ))}
             </div>
                </div>
                </section>
   
     );
}
 
export default FAQPage;