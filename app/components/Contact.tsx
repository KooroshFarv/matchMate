'use client'
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

const ContactForm = z.object({
    name : z.string(),
    email : z.string().email("Email is not valid")
})

type ContactFormData = z.infer<typeof ContactForm>

const ContactPage = () => {
    const { register, handleSubmit, formState : {errors}, reset} = useForm<ContactFormData>({resolver : zodResolver(ContactForm)})
    const submit = () => {
        alert('Message Sent !')
        reset()
    }
    return ( 
        <>
        <section className="w-full py-20">
        <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Get In Touch</h2>

            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
                <input type="text" placeholder="Your Name .." {...register('name')}           
                 className="bg-transparent border-b-2 border-[#3F4F44] py-3 px-2 text-lg placeholder-gray-500 focus:outline-none focus:border-[#DCD7C9] focus:placeholder-transparent transition"
                 />
                {errors.name && (
                 <p className="text-sm text-red-400">{errors.name.message}</p>
                )}


                <input type="email" {...register('email')} placeholder="Your Email .."
                className="bg-transparent border-b-2 border-[#3F4F44] py-3 px-2 text-lg placeholder-gray-500 focus:outline-none focus:border-[#DCD7C9] focus:placeholder-transparent transition"

                />
                 {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
                )}

                <Button type="submit" className="mt-6 bg-[#3F4F44] hover:bg-[#2C3930] text-[#DCD7C9] py-3 rounded-lg text-lg transition"
                >
                    Send Message
                </Button>
            </form>


        </div>
        </section>
        </>
     );
}
 
export default ContactPage;