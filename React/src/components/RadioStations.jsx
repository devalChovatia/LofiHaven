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

export default function RadioStations({ handleGifChange, handleChannelName, handleLivestreamLink }) {
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

    const handleGifSelect = async (genre) => {
        const gif = gifs[genre.name];
        setSelectedGif(gif);
        handleGifChange(gif);

        try {
            const genreID = genre.id;
            const res = await axios.get(`http://localhost:8000/livestreams/${genreID}`);
            const channelData = res.data[0]; 

            if (channelData) {
                handleChannelName(channelData.channel_name);
                handleLivestreamLink(channelData.livestream_link);
            }
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const buttonClass = (gif) =>
        `transition-transform duration-300 ${selectedGif === gif ? 'scale-125' : 'hover:scale-125'}`;

    useEffect(() => {
        const getAllGenres = async () => {
            try {
                const res = await axios.get('http://localhost:8000/genres');
                const genreList = res.data.map(item => ({ id: item.id, name: item.genre_name }));
                setGenres(genreList);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        getAllGenres();
    }, []);

    return (
        <div className='mt-12 md:mt-20 xl:mt-32'>
            <ul className="flex flex-col pl-4 md:pl-8 gap-1 text-[11px] md:w-[230px] xl:text-[15px] xl:w-[300px] xl:gap-2 text-white font-sawarabi space-y-2 border-r-2 border-white border-opacity-10 ">
                {genres.map((genre) => (
                    <li key={genre.id} onClick={() => handleGifSelect(genre)}>
                        <button className={buttonClass(gifs[genre.name])}>{genre.name}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
