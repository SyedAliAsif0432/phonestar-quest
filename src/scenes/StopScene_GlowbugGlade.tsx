import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';
import { handlePhishingChoice, getPhishingPrompt } from '../utils/gameUtils';
import { PhishingPromptWithHover } from '../utils/phishingPromptFactory';

// Import assets
import backgroundImage from '../assets/images/map_1/glowbug_glade_animation.gif';
import monster3Image from '../assets/images/monsters/monster_3.png';
import monster5Image from '../assets/images/monsters/monster_5.png';
import monster6Image from '../assets/images/monsters/monster_6.png';
import monster7Image from '../assets/images/monsters/monster_7.png';
import footprintImage from '../assets/images/map_1/footsteps.png';

// Consistent pale yellow for bubbles
const BUBBLE_COLOR = 'hsl(50, 70%, 85%)';

const StopScene_GlowbugGlade = () => {
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
      monster3Image,
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

  // Safe prompt (static)
  const safePrompt = () => (
    <PhishingPromptWithHover
      leakedInfo=""
      basePrompt="The glowbugs are lighting the way—follow their glow, and we'll find our way safely to Shady Canopy. Stay on the main path, and we'll catch up to the dragon soon."
      displayUrl="GlowbugGlade.com"
      hoverUrl="GlowbugGlade.com"
    />
  );

  // Build phishing prompt with only the most recently leaked information
  const phishingPrompt = () => {
    const leakedInfo = getPhishingPrompt();
    return (
      <PhishingPromptWithHover
        leakedInfo={leakedInfo}
        basePrompt="The glowbugs are guarding a secret path! You're smart enugh to take it, right? Follow me, and we'll beat the dragon to Boulder Bluff before anyone else!"
        displayUrl="glowbougs-paath.com"
        hoverUrl="http://global-info.com"
      />
    );
  };

  // Animation variants for better performance
  const containerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (currentStop === 'GlowbugGlade') {
      setIsVisible(true);
    }
  }, [currentStop]);

  const handlePromptClick = (isSafe: boolean) => {
    if (!isSafe) {
      handlePhishingChoice("origin", 'echoing-cave');
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
            from: 'glowbug-glade',
            to: 'echoing-cave'
          });
          
          // Important: Clear current stop first to ensure map is visible
          setCurrentStop('');
        }, 500);
      }
    } else {
      setSelectedPath('echoing-cave');
      // Start zoom-out animation
      setIsVisible(false);
      
      // Return to map for footprint animation 
      setTimeout(() => {
        // Set the footprint info for map to handle
        setFootprintInfo({
          from: 'glowbug-glade',
          to: 'echoing-cave'
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
    text: promptOrder ? phishingPrompt() : safePrompt(),
    isSafe: !promptOrder,
    image: promptOrder ? phishingMonster : safeMonster,
    alt: promptOrder ? "Phishing Monster" : "Safe Monster"
  };

  const rightPrompt = {
    text: promptOrder ? safePrompt() : phishingPrompt(),
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
            
            {/* Ambient glowing particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`glow-${i}`}
                  className="absolute rounded-full bg-yellow-300"
                  style={{
                    width: `${3 + Math.random() * 8}px`,
                    height: `${3 + Math.random() * 8}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${8 + Math.random() * 12}px rgba(255, 255, 150, 0.8)`,
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.2, 1],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

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
                  {typeof leftPrompt.text === 'string' ? (
                    <p className="text-black font-pixel text-sm leading-relaxed px-2">{leftPrompt.text}</p>
                  ) : (
                    <span className="text-black font-pixel text-sm leading-relaxed px-2">{leftPrompt.text}</span>
                  )}
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
                  {typeof rightPrompt.text === 'string' ? (
                    <p className="text-black font-pixel text-sm leading-relaxed px-2">{rightPrompt.text}</p>
                  ) : (
                    <span className="text-black font-pixel text-sm leading-relaxed px-2">{rightPrompt.text}</span>
                  )}
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

export default StopScene_GlowbugGlade; 