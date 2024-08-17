import React from 'react';
import TokyoTunes from "../assets/TokyoTunes.gif"
import ChillCityGrooves from "../assets/ChillCityGrooves.gif"
import StudySerenity from "../assets/StudySerenity.gif"
import CozyCoffeeBeats from "../assets/CozyCoffeeBeats.gif"
import QuietQuarters from "../assets/QuietQuarters.gif"
import ZenDenFlows from "../assets/ZenDenFlows.gif"
import DreamyBeats from "../assets/DreamyBeats.gif"
import SereneScenes from "../assets/SereneScenes.gif"
import LateNightLights from "../assets/LateNightLights.gif"
import LoFiFlows from "../assets/LoFiFlows.gif"

export default function RadioStations({ handleGifChange }) {

    const handleGifSelect = (gif) => {
        handleGifChange(gif)
    }

        return (
            <>
                
                <ul className="absolute top-32 left-4 sm:left-6 md:left-8 lg:left-12 text-white font-sawarabi space-y-2 border-r-2 border-white border-opacity-10 pr-2">
                    <li onClick={() => handleGifSelect(TokyoTunes)}><button className="hover:underline">Tokyo Tunes</button></li>
                    <li onClick={() => handleGifSelect(ChillCityGrooves)}><button className="hover:underline">Chill City Grooves</button></li>
                    <li onClick={() => handleGifSelect(StudySerenity)}><button className="hover:underline">Study Serenity</button></li>
                    <li onClick={() => handleGifSelect(CozyCoffeeBeats)}><button className="hover:underline">Cozy Coffee Beats</button></li>
                    <li onClick={() => handleGifSelect(QuietQuarters)}><button className="hover:underline">Quiet Quarters</button></li>
                    <li onClick={() => handleGifSelect(ZenDenFlows)}><button className="hover:underline">Zen Den Flows</button></li>
                    <li onClick={() => handleGifSelect(SereneScenes)}><button className="hover:underline">Serene Scenes</button></li>
                    <li onClick={() => handleGifSelect(LateNightLights)}><button className="hover:underline">Late Night Lights</button></li>
                    <li onClick={() => handleGifSelect(LoFiFlows)}><button className="hover:underline">Lo-Fi Flows</button></li>
                </ul>
            </>
        );
    }
    