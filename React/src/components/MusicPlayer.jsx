import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import React, { useState } from 'react';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <div className='transparent flex gap-6 text-white rounded-lg ml-[50%] '>
                
                <button className='hover:opacity-80'><ChevronLeft size={50} /></button>
                <button className='hover:opacity-80' onClick={togglePlayPause}>{isPlaying ? <Pause size={50} /> : <Play size={50} />}</button>
                <button className='hover:opacity-80'><ChevronRight size={50} /></button>
            </div>
        </div>
    );
}
