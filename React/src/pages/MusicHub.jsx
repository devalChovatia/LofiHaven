import React from 'react'
import backgroundGif from "../assets/2.gif"

export default function MusicHub() {

    const backgroundStyle = {
        backgroundImage: `url(${backgroundGif})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        width: '100%',
        position: 'relative'
      };

  return (
    <div style={backgroundStyle} className="flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-6 md:left-6 lg:top-5 lg:left-5">
            <h1 className="font-caveat border-b-2 md:p-2 lg:p-7 font-semibold text-xl sm:text-2xl md:text-[40px] lg:text-[65px] text-white">
                LofiHaven
            </h1>
            <ul className="text-white w-full flex flex-col gap-3 md:gap-8 md:pt-8 md:pl-2 lg:gap-7 lg:pl-12 lg:text-xl border-r-2">
                <li>Radio Channel 1</li>
                <li>Radio Channel 2</li>
                <li>Radio Channel 3</li>
                <li>Radio Channel 4</li>
                <li>Radio Channel 5</li>
                <li>Radio Channel 6</li>
                <li>Radio Channel 7</li>
                <li>Radio Channel 8</li>
                <li>Radio Channel 9</li>
                <li>Radio Channel 10</li>

            </ul>
            <div>
                <button>
                    Submit a Request
                </button>
            </div>
        </div>

    </div>
  )
}
