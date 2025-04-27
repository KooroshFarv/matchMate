const TestimonialPage = () => {
    return (
      <>
        <section className="w-full py-20 text-white text-center">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl text-left mb-10 font-bold text-black">
              What our users say
            </h2>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
              <div className="bg-[#010f10] p-6 rounded-xl shadow-md hover:scale-105 transition-transform flex flex-col justify-between">
                <p className="text-lg mb-4 flex-1">
                  I’m not the type to hire an interior designer, but I still wanted a nice-looking space. MatchMate was exactly what I needed. The suggestions felt fresh, modern, and surprisingly affordable too. It felt like having a professional designer in my pocket — without the insane costs.
                </p>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <span className="text-2xl">🛋️</span>
                  <span className="text-sm">John</span>
                </div>
              </div>
  
  
              <div className="bg-[#010f10] p-6 rounded-xl shadow-md hover:scale-105 transition-transform flex flex-col justify-between">
                <p className="text-lg mb-4 flex-1">
                  I was struggling for weeks trying to figure out how to redesign my bedroom. Every time I tried to piece ideas together from Pinterest, it just made me more confused. With MatchMate, I simply uploaded one picture and picked a vibe — and suddenly, it all made sense. The design suggestions were beautiful, easy to visualize, and actually achievable. It felt like having a personal designer who just got me.
                </p>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <span className="text-2xl">🎨</span>
                  <span className="text-sm">Jane</span>
                </div>
              </div>
  
              <div className="bg-[#010f10] p-6 rounded-xl shadow-md hover:scale-105 transition-transform flex flex-col justify-between">
                <p className="text-lg mb-4 flex-1">
                  Decorating used to feel overwhelming for me. So many styles, so many decisions. But MatchMate made it incredibly simple. I just picked a vibe I loved, and the AI did the rest. The best part? It actually understood my messy room and gave suggestions that felt personal, not random.
                </p>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <span className="text-2xl">🏡</span>
                  <span className="text-sm">Emily</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default TestimonialPage;