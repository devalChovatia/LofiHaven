import React, { useState } from 'react';
import TokyoTunes from "../assets/TokyoTunes.gif";
import ChillCityGrooves from "../assets/ChillCityGrooves.gif";
import StudySerenity from "../assets/StudySerenity.gif";
import CozyCoffeeBeats from "../assets/CozyCoffeeBeats.gif";
import QuietQuarters from "../assets/QuietQuarters.gif";
import ZenDenFlows from "../assets/ZenDenFlows.gif";
import DreamyBeats from "../assets/DreamyBeats.gif";
import SereneScenes from "../assets/SereneScenes.gif";
import LateNightLights from "../assets/LateNightLights.gif";
import LoFiFlows from "../assets/LoFiFlows.gif";

export default function RadioStations({ handleGifChange }) {
    const [selectedGif, setSelectedGif] = useState(null);

    const handleGifSelect = (gif) => {
        setSelectedGif(gif);
        handleGifChange(gif);
    };

    const buttonClass = (gif) => 
        `transition-transform duration-300 ${selectedGif === gif ? 'scale-125' : 'hover:scale-125'}`;

    return (
        <>
            <ul className="absolute p-2 flex flex-col gap-1 top-40 left-4 sm:left-6 md:top-48 md:left-8 lg:left-12 w-[230px] text-[11px] sm:text-[13px] xl:top-60 xl:text-[15px] 2xl:top-72 2xl:text-[14px] text-white font-sawarabi space-y-2 border-r-2 border-white border-opacity-10 pr-2">
                <li onClick={() => handleGifSelect(TokyoTunes)}><button className={buttonClass(TokyoTunes)}>Tokyo Tunes</button></li>
                <li onClick={() => handleGifSelect(ChillCityGrooves)}><button className={buttonClass(ChillCityGrooves)}>Chill City Grooves</button></li>
                <li onClick={() => handleGifSelect(StudySerenity)}><button className={buttonClass(StudySerenity)}>Study Serenity</button></li>
                <li onClick={() => handleGifSelect(CozyCoffeeBeats)}><button className={buttonClass(CozyCoffeeBeats)}>Cozy Coffee Beats</button></li>
                <li onClick={() => handleGifSelect(QuietQuarters)}><button className={buttonClass(QuietQuarters)}>Quiet Quarters</button></li>
                <li onClick={() => handleGifSelect(ZenDenFlows)}><button className={buttonClass(ZenDenFlows)}>Zen Den Flows</button></li>
                <li onClick={() => handleGifSelect(SereneScenes)}><button className={buttonClass(SereneScenes)}>Serene Scenes</button></li>
                <li onClick={() => handleGifSelect(LateNightLights)}><button className={buttonClass(LateNightLights)}>Late Night Lights</button></li>
                <li onClick={() => handleGifSelect(LoFiFlows)}><button className={buttonClass(LoFiFlows)}>Lo-Fi Flows</button></li>
            </ul>
        </>
    );
}
