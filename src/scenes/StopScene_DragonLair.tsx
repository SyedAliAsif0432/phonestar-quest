import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';

// Import assets
import backgroundImage from '../assets/images/map_2/dragon_lair.png';
import redDragonImage from '../assets/images/dragons/red-dragon.png';
import blueDragonImage from '../assets/images/dragons/blue-dragon.png';
import greenDragonImage from '../assets/images/dragons/green-dragon.png';
import orangeDragonImage from '../assets/images/dragons/orange-dragon.png';
import purpleDragonImage from '../assets/images/dragons/purple-dragon.png';
import blackDragonImage from '../assets/images/dragons/black-dragon.png';

const StopScene_DragonLair = () => {
  const navigate = useNavigate();
  const { dragonInfo, leaks, resetGame } = useDragonStore();
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.3,
        duration: 0.5
      }
    })
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVictoryMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getDragonImage = () => {
    switch (dragonInfo.color) {
      case 'Red': return redDragonImage;
      case 'Blue': return blueDragonImage;
      case 'Green': return greenDragonImage;
      case 'Orange': return orangeDragonImage;
      case 'Purple': return purpleDragonImage;
      case 'Black': return blackDragonImage;
      default: return redDragonImage;
    }
  };

  const getDragonScale = () => {
    switch (dragonInfo.color) {
      case 'Red': return 'scale-100';
      case 'Blue': return 'scale-90';
      case 'Green': return 'scale-95';
      case 'Orange': return 'scale-105';
      case 'Purple': return 'scale-85';
      case 'Black': return 'scale-110';
      default: return 'scale-100';
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    navigate('/intro');
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative w-full max-w-4xl p-8">
        <div 
          className="relative rounded-lg shadow-xl overflow-hidden min-h-[600px]"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Victory content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black bg-opacity-40">
            {showVictoryMessage && (
              <div className="text-center">
                <motion.h1 
                  className="text-4xl font-bold text-yellow-300 mb-6 font-pixel"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  VICTORY!
                </motion.h1>

                <motion.div
                  className="text-xl text-white mb-8 font-pixel"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  {Object.values(leaks).filter(Boolean).length === 0 ? (
                    <p className="text-green-300">
                      Congratulations! You've successfully guided {dragonInfo.name} home without revealing any sensitive information!
                    </p>
                  ) : (
                    <div>
                      <p className="text-yellow-200 mb-4">
                        You've reached home, but some information was leaked to the monsters:
                      </p>
                      <ul className="list-disc list-inside text-red-300">
                        {leaks.name && <li>Dragon's Name: {dragonInfo.name}</li>}
                        {leaks.age && <li>Dragon's Age: {dragonInfo.age}</li>}
                        {leaks.origin && <li>Dragon's Origin: {dragonInfo.origin}</li>}
                      </ul>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="relative my-3"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <motion.img
                    src={getDragonImage()}
                    alt={`${dragonInfo.color} Dragon`}
                    className={`${getDragonScale()} max-h-52 drop-shadow-lg`}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Glowing effect around dragon */}
                  <motion.div
                    className="absolute inset-0 z-[-1] rounded-full bg-yellow-300 filter blur-xl"
                    style={{ opacity: 0.3 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.button
                  className="mt-8 px-8 py-3 bg-yellow-500 text-black rounded-lg font-pixel hover:bg-yellow-400 transition-colors"
                  onClick={handlePlayAgain}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StopScene_DragonLair; 