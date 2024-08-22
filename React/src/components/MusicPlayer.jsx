import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import axios from 'axios';

export default function MusicPlayer({ isPlaying, setIsPlaying, playerRef, genreID, currentIndex, handleCurrentIndex, handleChannelName, handleLivestreamLink }) {

    const togglePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
            setIsPlaying(prev => !prev);
        }
    };

    const toggleNextPrev = async(direction) =>{
        try {
            const genre_id = genreID
            const res = await axios.get(`http://localhost:8000/livestreams/${genre_id}`)
            const length = res.data.length

            if(direction === 'next' && currentIndex < length){
                handleCurrentIndex(currentIndex +1)
                const channelData = res.data[currentIndex +1]
                handleChannelName(channelData.channel_name)
                handleLivestreamLink(channelData.livestream_link)

            } else if(direction === 'prev'){
                handleCurrentIndex(currentIndex -1)
                const channelData = res.data[currentIndex -1]
                handleChannelName(channelData.channel_name)
                handleLivestreamLink(channelData.livestream_link)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='transparent flex gap-6 text-white rounded-lg'>
                <button className='hover:opacity-80' onClick={() => toggleNextPrev('prev')}>
                    <ChevronLeft className='w-6 h-6 sm:w-8 sm:h-8' />
                </button>
                <button className='hover:opacity-80' onClick={togglePlayPause}>
                    {isPlaying ? (
                        <Pause className='w-6 h-6 sm:w-8 sm:h-8' />
                    ) : (
                        <Play className='w-6 h-6 sm:w-8 sm:h-8' />
                    )}
                </button>
                <button className='hover:opacity-80' onClick={() => toggleNextPrev('next')}>
                    <ChevronRight className='w-6 h-6 sm:w-8 sm:h-8' />
                </button>
            </div>
        </div>
    );
}
