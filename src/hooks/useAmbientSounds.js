import { useState, useEffect, useRef } from 'react';

const SOUND_CONFIG = {
  rain: { file: '/sounds/rain.mp3', icon: 'CloudRain' },
  coffee: { file: '/sounds/cafe.mp3', icon: 'Coffee' },
  forest: { file: '/sounds/forest.mp3', icon: 'Trees' },
  whiteNoise: { file: '/sounds/whitenoise.mp3', icon: 'Wind' },
  fire: { file: '/sounds/fire.mp3', icon: 'Flame' }
};

export const useAmbientSounds = () => {
  const [activeSounds, setActiveSounds] = useState({});
  const [masterVolume, setMasterVolume] = useState(() => {
    const saved = localStorage.getItem('ambientMasterVolume');
    return saved !== null ? parseFloat(saved) : 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef({});

  // Initialize audio objects for all sounds
  useEffect(() => {
    const audioObjects = {};
    Object.keys(SOUND_CONFIG).forEach(soundKey => {
      const audio = new Audio(SOUND_CONFIG[soundKey].file);
      audio.loop = true;
      audio.volume = 0;
      audioObjects[soundKey] = audio;
      audioRefs.current[soundKey] = audio;
    });

    // Cleanup on unmount
    return () => {
      Object.values(audioObjects).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Update master volume for all active sounds
  useEffect(() => {
    localStorage.setItem('ambientMasterVolume', masterVolume.toString());
    Object.keys(activeSounds).forEach(soundKey => {
      if (audioRefs.current[soundKey]) {
        audioRefs.current[soundKey].volume = isMuted ? 0 : masterVolume;
      }
    });
  }, [masterVolume, isMuted, activeSounds]);

  // Toggle a specific sound
  const toggleSound = (soundKey) => {
    const audio = audioRefs.current[soundKey];
    if (!audio) return;

    setActiveSounds(prev => {
      const isActive = prev[soundKey];
      
      if (isActive) {
        // Stop the sound
        audio.pause();
        audio.currentTime = 0;
        const updated = { ...prev };
        delete updated[soundKey];
        return updated;
      } else {
        // Start the sound
        audio.volume = isMuted ? 0 : masterVolume;
        audio.play().catch(error => {
          console.error(`Error playing ${soundKey}:`, error);
        });
        return { ...prev, [soundKey]: true };
      }
    });
  };

  // Mute all sounds
  const muteAll = () => {
    setIsMuted(true);
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = 0;
    });
  };

  // Unmute all sounds
  const unmuteAll = () => {
    setIsMuted(false);
    Object.keys(activeSounds).forEach(soundKey => {
      if (audioRefs.current[soundKey]) {
        audioRefs.current[soundKey].volume = masterVolume;
      }
    });
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      unmuteAll();
    } else {
      muteAll();
    }
  };

  // Stop all sounds
  const stopAll = () => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setActiveSounds({});
    setIsMuted(false);
  };

  return {
    activeSounds,
    masterVolume,
    isMuted,
    toggleSound,
    setMasterVolume,
    toggleMute,
    stopAll,
    SOUND_CONFIG
  };
};