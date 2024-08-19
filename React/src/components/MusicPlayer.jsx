import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function MusicPlayer({ isPlaying, setIsPlaying, playerRef }) {

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

    return (
        <div>
            <div className='transparent flex gap-6 text-white rounded-lg'>
                <button className='hover:opacity-80'>
                    <ChevronLeft className='w-6 h-6 sm:w-8 sm:h-8' />
                </button>
                <button className='hover:opacity-80' onClick={togglePlayPause}>
                    {isPlaying ? (
                        <Pause className='w-6 h-6 sm:w-8 sm:h-8' />
                    ) : (
                        <Play className='w-6 h-6 sm:w-8 sm:h-8' />
                    )}
                </button>
                <button className='hover:opacity-80'>
                    <ChevronRight className='w-6 h-6 sm:w-8 sm:h-8' />
                </button>
            </div>
        </div>
    );
}
