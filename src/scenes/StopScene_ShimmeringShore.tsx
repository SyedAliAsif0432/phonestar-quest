import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';
import { handlePhishingChoice, getPhishingPrompt } from '../utils/gameUtils';
import { PhishingPromptWithHover } from '../utils/phishingPromptFactory';

// Import assets
import backgroundImage from '../assets/images/map_2/shimmering_shore.png';
import monster2Image from '../assets/images/monsters/monster_2.png';
import monster4Image from '../assets/images/monsters/monster_4.png';
import footprintImage from '../assets/images/map_2/footsteps.png';

const BUBBLE_COLOR = 'hsl(50, 70%, 85%)';

const StopScene_ShimmeringShore = () => {
  const navigate = useNavigate();
  const { currentStop, setCurrentStop, setFootprintInfo } = useDragonStore();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Safe and phishing prompts
  const safePrompt = "The sandbar is shallow and safe to cross. Stay close, and we'll finally make it home to the dragon's lair!";
  
  const phishingPrompt = () => (
    <PhishingPromptWithHover
      leakedInfo={getPhishingPrompt()}
      basePrompt="The coral maze is a hidden path only for smart adventurers. Come quickly before someone else discovers it!"
      displayUrl="CoralAdventure.fun"
      hoverUrl="http://suspicious-link.com"
    />
  );

  // Randomize which side shows the phishing prompt
  const promptOrder = useMemo(() => Math.random() < 0.5, []);

  // Animation variants
  const containerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (currentStop === 'ShimmeringShore') {
      setIsVisible(true);
    }
  }, [currentStop]);

  const handlePromptClick = (isSafe: boolean) => {
    if (!isSafe) {
      handlePhishingChoice("origin", 'dragon-lair');
      if (useDragonStore.getState().gameOver) {
        navigate('/game-over');
        return;
      }
      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({
          from: 'shimmering-shore',
          to: 'dragon-lair'
        });
        setCurrentStop('');
        // Keep map flow consistent: only navigate to game over when leak threshold is reached.
      }, 500);
    } else {
      setSelectedPath('dragon-lair');
      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({
          from: 'shimmering-shore',
          to: 'dragon-lair'
        });
        setCurrentStop('');
      }, 500);
    }
  };

  // Define prompts based on the random order
  const leftPrompt = {
    text: promptOrder ? phishingPrompt() : safePrompt,
    isSafe: !promptOrder,
    image: promptOrder ? monster2Image : monster4Image,
    alt: promptOrder ? "Phishing Monster" : "Safe Monster"
  };

  const rightPrompt = {
    text: promptOrder ? safePrompt : phishingPrompt(),
    isSafe: promptOrder,
    image: promptOrder ? monster4Image : monster2Image,
    alt: promptOrder ? "Safe Monster" : "Phishing Monster"
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
                        src={leftPrompt.image} 
                        alt={leftPrompt.alt} 
                        className="w-24 h-24 mx-auto mb-4"
                      />
                      {typeof leftPrompt.text === 'string' ? (
                        <p className="text-black font-pixel text-sm leading-relaxed px-2">{leftPrompt.text}</p>
                      ) : (
                        <span className="text-black font-pixel text-sm leading-relaxed px-2">{leftPrompt.text}</span>
                      )}
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
                        src={rightPrompt.image} 
                        alt={rightPrompt.alt} 
                        className="w-24 h-24 mx-auto mb-4"
                      />
                      {typeof rightPrompt.text === 'string' ? (
                        <p className="text-black font-pixel text-sm leading-relaxed px-2">{rightPrompt.text}</p>
                      ) : (
                        <span className="text-black font-pixel text-sm leading-relaxed px-2">{rightPrompt.text}</span>
                      )}
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

export default StopScene_ShimmeringShore; 