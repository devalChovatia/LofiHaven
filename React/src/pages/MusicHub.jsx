import React, { useEffect, useState, useRef } from 'react';
import backgroundGif from "../assets/Placeholder.gif";
import RadioStations from '../components/RadioStations';
import Request from '../components/Request';
import Clock from '../components/Clock';
import MusicPlayer from '../components/MusicPlayer';
import Links from '../components/Links';
import { Maximize, Minimize } from 'lucide-react';
import AudioSlider from '../components/AudioSlider';

export default function MusicHub() {
    const [gif, setGif] = useState();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [audioSrc, setAudioSrc] = useState('');
    const audio = useRef(new Audio());
    const [channelName, setChannelName] = useState(null);
    const [livestreamLink, setLivestreamLink] = useState();
    const [genreID, setGenreID] = useState();
    const playerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChannelName = (name) => {
        setChannelName(name);
    };

    const handleLivestreamLink = (link) => {
        setLivestreamLink(link);
    };

    const handleGenreID = (genre) => {
        setGenreID(genre);
    };

    const handleCurrentIndex = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const currentAudio = audio.current;
        currentAudio.loop = true;
        currentAudio.src = audioSrc;

        const playAudio = async () => {
            try {
                if (isPlaying && !playerRef.current){ 
                    await currentAudio.play();
                } else {
                    currentAudio.pause();
                }
                currentAudio.volume = volume / 100;
            } catch (error) {
                console.error("Error playing audio:", error);
            }
        };

        playAudio();

        return () => {
            currentAudio.pause();
            currentAudio.src = '';
        };
    }, [isPlaying, volume, audioSrc]);

    useEffect(() => {
        setGif(backgroundGif);
    }, []);

    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                playerRef.current = new window.YT.Player('player', {
                    height: '0',
                    width: '0',
                    videoId: livestreamLink ? livestreamLink.split('v=')[1] : '',
                    events: {
                        'onReady': (event) => {
                            if (isPlaying) {
                                event.target.playVideo();
                            }
                        },
                        'onStateChange': (event) => {
                            if (event.data === window.YT.PlayerState.ENDED) {
                                setIsPlaying(false);
                            }
                        }
                    }
                });
            } else {
                const script = document.createElement('script');
                script.src = "https://www.youtube.com/iframe_api";
                script.onload = () => {
                    if (window.YT && window.YT.Player) {
                        playerRef.current = new window.YT.Player('player', {
                            height: '0',
                            width: '0',
                            videoId: livestreamLink ? livestreamLink.split('v=')[1] : '',
                            events: {
                                'onReady': (event) => {
                                    if (isPlaying) {
                                        event.target.playVideo();
                                    }
                                },
                                'onStateChange': (event) => {
                                    if (event.data === window.YT.PlayerState.ENDED) {
                                        setIsPlaying(false);
                                    }
                                }
                            }
                        });
                    }
                };
                document.body.appendChild(script);
            }
        };

        loadYouTubeAPI();

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [livestreamLink, isPlaying]);

    useEffect(() => {
        if (playerRef.current) {
            const volumeLevel = Math.min(Math.max(volume, 0), 100);
            playerRef.current.setVolume(volumeLevel); 
        }
    }, [volume]);

    useEffect(() => {
        if (playerRef.current) {
            setIsPlaying(false); 
        }
    }, [livestreamLink]);

    const backgroundStyle = {
        backgroundImage: `url(${gif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    };

    const handleGifChange = (gif) => {
        setGif(gif);
    };

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
    };

    return (
        <div style={backgroundStyle}>
            <div className='flex flex-col text-center md:flex-row md:text-left md:justify-between px-5 pt-10'>
                <h1 className="font-caveat font-semibold text-3xl md:text-[40px] lg:text-[48px] 2xl:text-[70px] text-white">
                    LofiHaven
                </h1>
                <div className="md:text-xl font-sawarabi xl:text-2xl text-white">
                    <Clock />
                </div>
            </div>
            <div className='flex flex-col gap-6 xl:gap-20 xl:w-[275px]'>
                <div>
                    <RadioStations 
                        handleGifChange={handleGifChange} 
                        handleChannelName={handleChannelName} 
                        handleLivestreamLink={handleLivestreamLink} 
                        handleGenreID={handleGenreID} 
                        handleCurrentIndex={handleCurrentIndex} 
                        setAudioSrc={setAudioSrc} // Pass the function to update audio source
                    />
                </div>
                <div>
                    <Request />
                </div>
            </div>
            <div className='absolute bottom-1 w-full p-2 flex flex-col md:flex-row items-center justify-between gap-6 text-overflow'>
                <div className="md:ml-4 fixed-width-container">
                    <Links channelName={channelName} livestreamLink={livestreamLink} />
                </div>  
                <div className="flex flex-col items-center">
                    <AudioSlider volume={volume} onVolumeChange={handleVolumeChange} />
                    <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} playerRef={playerRef} genreID={genreID} handleCurrentIndex={handleCurrentIndex} currentIndex={currentIndex} handleChannelName={handleChannelName} handleLivestreamLink={handleLivestreamLink} 
                    />
                </div>
                <button onClick={handleFullscreenToggle} className=" text-white rounded hidden sm:block md:mr-4">
                    {isFullscreen ? <Minimize className='w-6 h-6 xl:w-8 xl:h-8'/> : <Maximize className='w-6 h-6 xl:w-8 xl:h-8' />}
                </button>  
            </div>
            <div id="player" style={{ display: 'none' }}></div>
        </div>
    );
}
