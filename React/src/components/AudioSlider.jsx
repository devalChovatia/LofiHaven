import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

export default function AudioSlider({ volume, onVolumeChange }) {
  const getVolumeIcon = () => {
    if (volume < 1) return <VolumeX className="w-6 h-6 xl:w-8 xl:h-8"/>;
    if (volume < 51) return <Volume1 className="w-6 h-6 xl:w-8 xl:h-8"/>;
    return <Volume2 className="w-6 h-6 xl:w-8 xl:h-8"/>;
  };

  return (
    <div className="volume-slider flex flex-row gap-2 items-center mb-5">
      <div className="volume-icon text-white">{getVolumeIcon()}</div>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={onVolumeChange}
        className="slider h-1"
        style={{
          accentColor: 'white',
          background: 'black',
        }}
      />
    </div>
  );
}
