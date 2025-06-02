import React from "react";

const HeroSection = () => {
    return (
        <section className="bg-[#c3d5db] flex flex-col md:flex-row items-center justify-between px-10 py-16 h-[60vh]">
            <div className="max-w-xl text-center md:text-left">
                <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                    The new Pixel 6 phones are here.
                </h1>
                <p className="text-gray-700 mb-6">
                    Powered by Google Tensor, Google's first custom-built
                    processor, they're fast and secure. And they adapt to you.
                </p>
                <button className="border border-gray-700 px-5 py-2 rounded hover:bg-gray-100 transition">
                    Learn more
                </button>
            </div>
            <div className="mt-8 md:mt-0 h-full flex gap-0">
                <img src="/hero.png" alt="Pixel 6" className="hidden lg:block h-full w-[40rem]" />
                {/* <img src="/phone.png" alt="Pixel 6" className="h-full " />
                <img src="/phone.png" alt="Pixel 6" className="h-full " /> */}
            </div>
        </section>
    );
};

export default HeroSection;
