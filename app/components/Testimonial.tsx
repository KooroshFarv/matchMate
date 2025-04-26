const TestimonialPage = () => {
    return ( 
        <>
        <section className="w-full py-20 text-[#DCD7C9]">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl text-black mb-10 font-bold">What's our user say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#010f10]  p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <p className="text-lg b-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt nihil non alias tenetur modi dolorem. Repudiandae rerum quibusdam temporibus voluptate.</p>
            <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🛋️</span>
            <span className="text-sm">John</span>
        </div>
        </div>
        <div className="bg-[#010f10]  p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <p className="text-lg mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero porro quod perspiciatis voluptatibus quos inventore eaque facilis nam optio blanditiis!</p>
            <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎨</span>
            <span className="text-sm">Jane</span>
        </div>
        </div>

        <div className="bg-[#010f10] p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
        <p className="text-lg mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero porro quod perspiciatis voluptatibus quos inventore eaque facilis nam optio blanditiis!</p>
        <div className="flex items-center justify-center gap-2">
        <span className="text-2xl">🏡</span>
        <span className="text-sm">Emily</span>
        </div>
        </div>
        </div>
        </div>
        </section>
        </>
     );
}
 
export default TestimonialPage;