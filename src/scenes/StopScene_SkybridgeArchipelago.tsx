import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';
import { handlePhishingChoice, getPhishingPrompt } from '../utils/gameUtils';

// Import assets
import backgroundImage from '../assets/images/map_2/skybridge_archipelago.png';
import monster1Image from '../assets/images/monsters/monster_1.png';
import monster7Image from '../assets/images/monsters/monster_7.png';
import footprintImage from '../assets/images/map_2/footsteps.png';

const BUBBLE_COLOR = 'hsl(50, 70%, 85%)';

const StopScene_SkybridgeArchipelago = () => {
  const navigate = useNavigate();
  const { currentStop, setCurrentStop, setFootprintInfo } = useDragonStore();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Safe and phishing prompts
  const safePrompt = "Follow the rainbow arch! It's the safest way to cross the floating islands and get to the Shimmering Shore.";
  
  const phishingPrompt = () => {
    const leakedInfo = getPhishingPrompt();
    return `${leakedInfo} The wind is strong, but it can carry us over faster. Take this risky passage with me—it's worth it!`;
  };

  // Randomize which side shows the phishing prompt
  const promptOrder = useMemo(() => Math.random() < 0.5, []);

  // Animation variants
  const containerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (currentStop === 'SkybridgeArchipelago') {
      setIsVisible(true);
    }
  }, [currentStop]);

  const handlePromptClick = (isSafe: boolean) => {
    if (!isSafe) {
      handlePhishingChoice("age", 'stormy-shoals');
      if (useDragonStore.getState().gameOver) {
        navigate('/game-over');
        return;
      }
      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({
          from: 'skybridge-archipelago',
          to: 'stormy-shoals'
        });
        setCurrentStop('');
        // Stay on /map: MapScene runs footprint animation then sets next stop (same as Map 1).
      }, 500);
    } else {
      setSelectedPath('shimmering-shore');
      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({
          from: 'skybridge-archipelago',
          to: 'shimmering-shore'
        });
        setCurrentStop('');
        // Stay on /map: MapScene runs footprint animation then sets next stop (same as Map 1).
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="relative w-full max-w-4xl p-8">
            <div 
              className="relative rounded-lg shadow-xl overflow-hidden"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                aspectRatio: '16/9'
              }}
            >
              {/* Content container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8 p-6 w-full max-w-3xl">
                  {/* Left prompt */}
                  <motion.div
                    className="relative cursor-pointer transform hover:scale-105 transition-transform"
                    onClick={() => !selectedPath && handlePromptClick(!promptOrder)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div 
                      className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg border-2 border-gray-200"
                      style={{ backgroundColor: BUBBLE_COLOR }}
                    >
                      <img 
                        src={monster1Image} 
                        alt="Monster" 
                        className="w-24 h-24 mx-auto mb-4"
                      />
                      <p className="text-gray-800 text-center">
                        {promptOrder ? phishingPrompt() : safePrompt}
                      </p>
                    </div>
                  </motion.div>

                  {/* Right prompt */}
                  <motion.div
                    className="relative cursor-pointer transform hover:scale-105 transition-transform"
                    onClick={() => !selectedPath && handlePromptClick(promptOrder)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div 
                      className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg border-2 border-gray-200"
                      style={{ backgroundColor: BUBBLE_COLOR }}
                    >
                      <img 
                        src={monster7Image} 
                        alt="Monster" 
                        className="w-24 h-24 mx-auto mb-4"
                      />
                      <p className="text-gray-800 text-center">
                        {promptOrder ? safePrompt : phishingPrompt()}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StopScene_SkybridgeArchipelago; 