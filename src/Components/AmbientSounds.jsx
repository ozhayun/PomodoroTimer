import React from 'react';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import ParkIcon from '@mui/icons-material/Park';
import AirIcon from '@mui/icons-material/Air';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useAmbientSounds } from '../hooks/useAmbientSounds';

const ICON_MAP = {
  CloudRain: WaterDropIcon,
  Coffee: LocalCafeIcon,
  Trees: ParkIcon,
  Wind: AirIcon,
  Flame: WhatshotIcon
};

export const AmbientSounds = () => {
  const {
    activeSounds,
    masterVolume,
    isMuted,
    toggleSound,
    setMasterVolume,
    toggleMute,
    stopAll,
    SOUND_CONFIG
  } = useAmbientSounds();

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setMasterVolume(newVolume);
    if (isMuted && newVolume > 0) {
      // Automatically unmute when volume is increased
      toggleMute();
    }
  };

  return (
    <div className="fixed right-0 left-0 top-16 z-40 px-4 py-5 pointer-events-none lg:py-2 sm:top-20 sm:px-6">
      <div className="glass-card rounded-xl p-2 sm:p-3 backdrop-blur-[15px] border border-white/50 dark:border-white/20 pointer-events-auto max-w-4xl mx-auto">
        <div className="flex gap-2 justify-between items-center sm:gap-3">
          {/* Sound Icons Row */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {Object.entries(SOUND_CONFIG).map(([soundKey, config]) => {
              const IconComponent = ICON_MAP[config.icon];
              const isActive = activeSounds[soundKey];
              
              return (
                <button
                  key={soundKey}
                  onClick={() => toggleSound(soundKey)}
                  className={`
                    relative flex items-center justify-center p-1.5 sm:p-2 rounded-lg transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'glass-button bg-white/40 dark:bg-white/10 shadow-md scale-105' 
                      : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10'
                    }
                    hover:scale-110 active:scale-95
                  `}
                  aria-label={`Toggle ${soundKey} sound`}
                >
                  <IconComponent
                    sx={{ fontSize: { xs: 18, sm: 20 } }}
                    className={`
                      transition-all duration-300
                      ${isActive 
                        ? 'drop-shadow-sm text-slate-800 dark:text-slate-100' 
                        : 'text-slate-600 dark:text-slate-400'
                      }
                    `}
                  />
                  {isActive && (
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-slate-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="flex flex-grow gap-2 items-center max-w-xs sm:gap-3">
            <button
              onClick={toggleMute}
              className="flex-shrink-0 p-1 sm:p-1.5 rounded-lg transition-all duration-200 glass-button hover:scale-105 active:scale-95"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeOffIcon sx={{ fontSize: { xs: 16, sm: 18 } }} className="text-slate-600 dark:text-slate-400" />
              ) : (
                <VolumeUpIcon sx={{ fontSize: { xs: 16, sm: 18 } }} className="text-slate-700 dark:text-slate-300" />
              )}
            </button>
            
            <div className="flex-grow">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={masterVolume}
                onChange={handleVolumeChange}
                className="
                  w-full h-0.5 sm:h-1 bg-white/20 dark:bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white/80 [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-125
                  [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-white/80 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md
                  [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200
                  [&::-moz-range-track]:bg-transparent
                  sm:[&::-webkit-slider-thumb]:w-4 sm:[&::-webkit-slider-thumb]:h-4
                  sm:[&::-moz-range-thumb]:w-4 sm:[&::-moz-range-thumb]:h-4
                "
                style={{
                  background: `linear-gradient(to right, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) ${masterVolume * 100}%, rgba(255, 255, 255, 0.1) ${masterVolume * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                }}
              />
            </div>
            
            <span className="flex-shrink-0 w-6 text-xs font-medium text-right text-slate-600 dark:text-slate-400 sm:text-sm sm:w-8">
              {Math.round(masterVolume * 100)}
            </span>
          </div>

          {/* Clear All Button */}
          <button
            onClick={stopAll}
            className="flex-shrink-0 px-2 py-1 text-xs font-medium rounded-lg transition-all duration-200 glass-button text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 sm:px-3 sm:text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbientSounds;
