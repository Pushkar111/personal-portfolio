import { useEffect, useRef } from "react";

// Sound effect hook
const useSound = (soundPath) => {
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(soundPath);
        audioRef.current.volume = 0.2;
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, [soundPath]);

    return {
        play: () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        },
    };
};

export default useSound;
