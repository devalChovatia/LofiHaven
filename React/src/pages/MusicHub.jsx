import React, { useEffect, useState } from 'react';
import backgroundGif from "../assets/3.gif";
import RadioStations from '../components/RadioStations';
import Request from '../components/Request';
import Clock from '../components/Clock';
import MusicPlayer from '../components/MusicPlayer';

export default function MusicHub() {
    const [gif, setGif] = useState()


    useEffect(() => {
        setGif(backgroundGif)
    },[])

    const backgroundStyle = {
        backgroundImage: `url(${gif})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        width: '100%',
        position: 'relative',
      };


    const handleGifChange = (gif) => {
        setGif(gif)
    }

  return (
    <div style={backgroundStyle} className="flex flex-col flex-wrap items-center justify-center p-4">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-6 md:left-6 lg:top-5 lg:left-5 ">
            <RadioStations handleGifChange={handleGifChange}/>
            <Request />
        </div>
        <div className="text-white text-[25px] font-sawarabi absolute top-4 right-4">
            <Clock />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <MusicPlayer />
        </div>

    </div>
  );
}
