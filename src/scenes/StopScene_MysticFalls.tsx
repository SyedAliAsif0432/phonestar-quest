import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';
import { handlePhishingChoice, getPhishingPrompt } from '../utils/gameUtils';

// Import assets
import backgroundImage from '../assets/images/map_1/mystic_fall.png';
import monster1Image from '../assets/images/monsters/monster_1.png';
import monster2Image from '../assets/images/monsters/monster_2.png';
import monster5Image from '../assets/images/monsters/monster_5.png';
import monster6Image from '../assets/images/monsters/monster_6.png';
import monster7Image from '../assets/images/monsters/monster_7.png';
import footprintImage from '../assets/images/map_1/footsteps.png';

// Consistent pale yellow for bubbles
const BUBBLE_COLOR = 'hsl(50, 70%, 85%)';

const StopScene_MysticFalls = () => {
  const navigate = useNavigate();
  const { 
    currentStop, 
    setCurrentStop, 
    leaks, 
    setLeaks, 
    setFootprintInfo,
    dragonInfo,
    lastLeakedField,
    setLastLeakedField
  } = useDragonStore();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Randomly select two monsters on component mount
  const [safeMonster, setSafeMonster] = useState('');
  const [phishingMonster, setPhishingMonster] = useState('');

  // Randomize which side shows the phishing prompt
  const promptOrder = useMemo(() => {
    // Random boolean to determine if phishing is on the left
    return Math.random() < 0.5;
  }, []);

  useEffect(() => {
    // Array of available monster images
    const monsterImages = [
      monster1Image,
      monster2Image,
      monster5Image,
      monster6Image,
      monster7Image
    ];
    
    // Select two different random monsters
    const randomIndex1 = Math.floor(Math.random() * monsterImages.length);
    let randomIndex2 = Math.floor(Math.random() * monsterImages.length);
    
    // Make sure we don't select the same monster twice
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * monsterImages.length);
    }
    
    setSafeMonster(monsterImages[randomIndex1]);
    setPhishingMonster(monsterImages[randomIndex2]);
  }, []);

  // Safe and phishing prompts
  const safePrompt = "The safest route is along the edge of the falls. Stick with me, and we'll make our way to Glowbug Glade without any problems.";
  
  // Build phishing prompt with only the most recently leaked information
  const phishingPrompt = () => {
    const leakedInfo = getPhishingPrompt();
    return `There's a secret cavern behind the fals! ${leakedInfo} Only daring players like you can find it. Let's go explore, then head to Shady Canopy. Don't miss this chancee!`;
  };

  // Animation variants for better performance
  const containerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (currentStop === 'MysticFalls') {
      setIsVisible(true);
    }
  }, [currentStop]);

  const handlePromptClick = (isSafe: boolean) => {
    if (!isSafe) {
      handlePhishingChoice("age", 'shadow-canopy');
      if (useDragonStore.getState().gameOver) {
        navigate('/game-over');
        return;
      }
      // If we're still here (not game over), proceed with animations
      if (!useDragonStore.getState().gameOver) {
        // Start zoom-out animation
        setIsVisible(false);
        
        // Return to map for footprint animation 
        setTimeout(() => {
          // Set the footprint info for map to handle
          setFootprintInfo({
            from: 'mystic-falls',
            to: 'shadow-canopy'
          });
          
          // Important: Clear current stop first to ensure map is visible
          setCurrentStop('');
        }, 500);
      }
    } else {
      setSelectedPath('glowbug-glade');
      // Start zoom-out animation
      setIsVisible(false);
      
      // Return to map for footprint animation 
      setTimeout(() => {
        // Set the footprint info for map to handle
        setFootprintInfo({
          from: 'mystic-falls',
          to: 'glowbug-glade'
        });
        
        // Important: Clear current stop first to ensure map is visible
        setCurrentStop('');
      }, 500);
    }
  };

  // Shared bubble style with updated positioning
  const bubbleStyle = {
    width: '350px',
    minHeight: '200px',
    padding: '25px',
    background: BUBBLE_COLOR,
    borderRadius: '50px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 10px 20px rgba(255,255,255,0.4)',
    border: '3px solid rgba(0,0,0,0.8)',
    position: 'relative' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 10,
    marginBottom: '80px',
    marginTop: '30px',
    overflowWrap: 'break-word' as const,
    wordBreak: 'break-word' as const
  };

  // Small bubble style
  const smallBubbleStyle = {
    background: BUBBLE_COLOR,
    borderRadius: '50%',
    border: '3px solid rgba(0,0,0,0.8)',
  };

  // Define prompts based on the random order
  const leftPrompt = {
    text: promptOrder ? phishingPrompt() : safePrompt,
    isSafe: !promptOrder,
    image: promptOrder ? phishingMonster : safeMonster,
    alt: promptOrder ? "Phishing Monster" : "Safe Monster"
  };

  const rightPrompt = {
    text: promptOrder ? safePrompt : phishingPrompt(),
    isSafe: promptOrder,
    image: promptOrder ? safeMonster : phishingMonster,
    alt: promptOrder ? "Safe Monster" : "Phishing Monster"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          {/* Scene container - 75% of screen */}
          <div 
            className="relative w-3/4 h-3/4 rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(0,0,0,0.7)',
              border: '4px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Background */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Monsters with speech bubbles */}
            <div className="absolute inset-0 flex items-center justify-around p-8">
              {/* Left Monster */}
              <div
                className="relative cursor-pointer h-full flex flex-col justify-center"
                onClick={() => !selectedPath && handlePromptClick(leftPrompt.isSafe)}
              >
                <div
                  className="mb-8"
                  style={bubbleStyle}
                >
                  {/* Small bubbles */}
                  <div 
                    className="absolute -bottom-10 left-10"
                    style={{ ...smallBubbleStyle, width: '20px', height: '20px' }}
                  />
                  <div 
                    className="absolute -bottom-16 left-4"
                    style={{ ...smallBubbleStyle, width: '12px', height: '12px' }}
                  />
                  <p className="text-black font-pixel text-sm leading-relaxed px-2">{leftPrompt.text}</p>
                </div>

                <motion.img
                  src={leftPrompt.image}
                  alt={leftPrompt.alt}
                  className="w-56 h-56"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Right Monster */}
              <div
                className="relative cursor-pointer h-full flex flex-col justify-center"
                onClick={() => !selectedPath && handlePromptClick(rightPrompt.isSafe)}
              >
                <div
                  className="mb-8"
                  style={bubbleStyle}
                >
                  {/* Small bubbles */}
                  <div 
                    className="absolute -bottom-10 left-10"
                    style={{ ...smallBubbleStyle, width: '20px', height: '20px' }}
                  />
                  <div 
                    className="absolute -bottom-16 left-4"
                    style={{ ...smallBubbleStyle, width: '12px', height: '12px' }}
                  />
                  <p className="text-black font-pixel text-sm leading-relaxed px-2">{rightPrompt.text}</p>
                </div>

                <motion.img
                  src={rightPrompt.image}
                  alt={rightPrompt.alt}
                  className="w-56 h-56"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StopScene_MysticFalls; 