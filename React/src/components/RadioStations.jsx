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

    const OverlayedGif = ({ src, overlaySrc, style }) => (
        <div style={{ position: 'relative', ...style }}>
            <img src={src} alt="Background" style={{ width: '100%', height: '100%' }} />
            <img src={overlaySrc} alt="Overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.6 }} />
        </div>
    );


    return (
        <>
            <h1 
                className="font-caveat  md:p-2 lg:p-7 font-semibold text-xl sm:text-2xl md:text-[40px] lg:text-[48px] 2xl:text-[70px] text-white">
                LofiHaven
            </h1>
            <ul style={{ borderRight: '2px solid rgba(255, 255, 255, 0.1)' }}
                className="text-white w-[300px] font-sawarabi flex flex-col p-3 gap-3 md:gap-9 md:pt-8 md:pl-2 lg:gap-7 lg:pl-8 lg:text-xl xl:text-[18px] 2xl:gap-14 2xl:text-[30px] border-r-2 border-opacity-10">
                <li onClick={() => handleGifSelect(TokyoTunes)}><button>Tokyo Tunes</button></li>
                <li onClick={() => handleGifSelect(ChillCityGrooves)}><button>Chill City Grooves</button></li>
                <li onClick={() => handleGifSelect(StudySerenity)}><button>Study Serenity</button></li>
                <li onClick={() => handleGifSelect(CozyCoffeeBeats)}><button>Cozy Coffee Beats</button></li>
                <li onClick={() => handleGifSelect(QuietQuarters)}><button>Quiet Quarters</button></li>
                <li onClick={() => handleGifSelect(ZenDenFlows)}><button>Zen Den Flows</button></li>
                <li onClick={() => handleGifSelect(DreamyBeats)}><button>Dreamy Beats</button></li>
                <li onClick={() => handleGifSelect(SereneScenes)}><button>Serene Scenes</button></li>
                <li onClick={() => handleGifSelect(LateNightLights)}><button>Late Night Lights</button></li>
                <li onClick={() => handleGifSelect(LoFiFlows)}><button>Lo-Fi Flows</button></li>
            </ul>
        </>
    );
}
