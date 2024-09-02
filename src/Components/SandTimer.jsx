import React from 'react';
import { motion } from 'framer-motion';

const SandTimer = ({ duration, elapsedSeconds }) => {
    const animationProgress = (elapsedSeconds / duration) * 100;

    return (
        <div className="relative w-24 h-48 mt-10 flex flex-col items-center">
            <motion.div
                className="absolute top-0 w-full bg-[#ffff66]"
                initial={{ height: '50%' }}
                animate={{ height: `${50 - animationProgress / 2}%` }}
                transition={{ duration: duration, ease: "linear" }}
                style={{ clipPath: 'polygon(50% 0%, 100% 0%, 75% 50%, 100% 100%, 0% 100%, 25% 50%, 0% 0%)' }}
            />
            <motion.div
                className="absolute bottom-0 w-full bg-[#ffff66]"
                initial={{ height: '0%' }}
                animate={{ height: `${animationProgress / 2}%` }}
                transition={{ duration: duration, ease: "linear" }}
                style={{ clipPath: 'polygon(50% 0%, 100% 0%, 75% 50%, 100% 100%, 0% 100%, 25% 50%, 0% 0%)' }}
            />
            <div className="absolute top-0 w-full h-full bg-[#b01e6e]" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 75% 50%, 100% 100%, 0% 100%, 25% 50%, 0% 0%)' }}></div>
        </div>
    );
};

export default SandTimer;
