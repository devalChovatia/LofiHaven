import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const [genres, setGenres] = useState([]);

    const gifs = {
        "Tokyo Tunes": TokyoTunes,
        "Chill City Grooves": ChillCityGrooves,
        "Study Serenity": StudySerenity,
        "Cozy Coffee Beats": CozyCoffeeBeats,
        "Quiet Quarters": QuietQuarters,
        "Zen Den Flows": ZenDenFlows,
        "Dreamy Beats": DreamyBeats,
        "Serene Scenes": SereneScenes,
        "Late Night Lights": LateNightLights,
        "Lo-Fi Flows": LoFiFlows
    };

    const handleGifSelect = (gif) => {
        setSelectedGif(gif);
        handleGifChange(gif);
    };

    const buttonClass = (gif) => 
        `transition-transform duration-300 ${selectedGif === gif ? 'scale-125' : 'hover:scale-125'}`;

    useEffect(() => {
        const getAllGenres = async () => {
            const res = await axios.get('http://localhost:8000/genres');
            const genreNames = res.data.map(item => item.genre_name);
            setGenres(genreNames);
        }
        getAllGenres();
    }, []);

    return (
        <>
            <ul className="absolute p-2 flex flex-col gap-1 top-40 left-4 sm:left-6 md:top-48 md:left-8 lg:left-12 w-[230px] text-[11px] sm:text-[13px] xl:top-60 xl:text-[15px] 2xl:top-72 2xl:text-[14px] text-white font-sawarabi space-y-2 border-r-2 border-white border-opacity-10 pr-2">
                {genres.map((genre, index) => (
                    <li key={index} onClick={() => handleGifSelect(gifs[genre])}>
                        <button className={buttonClass(gifs[genre])}>{genre}</button>
                        
                    </li>
                ))}
            </ul>
        </>
    );
}
