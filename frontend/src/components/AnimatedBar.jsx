import React from 'react';
import { motion } from 'framer-motion';

// AnimatedBar Component
const AnimatedBar = () => {
    const bars = [50, 80, 120, 90, 60, 100, 150]; // Example data

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {bars.map((height, index) => (
                <motion.div
                    key={index}
                    style={{
                        width: '50px',
                        height: `${height}px`,
                        backgroundColor: '#F2F3F5',
                        margin: '0 5px',
                        borderRadius: '5px',
                    }}
                    animate={{
                        height: [height, height + 30, height], // Animate height to simulate sorting
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 1,
                        delay: index * 0.2,
                    }}
                />
            ))}
        </div>
    );
};

export default AnimatedBar;