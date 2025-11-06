import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';
import { handlePhishingChoice, getPhishingPrompt } from '../utils/gameUtils';
import { PhishingPromptWithHover } from '../utils/phishingPromptFactory';

// Import assets
import backgroundImage from '../assets/images/map_2/Glowing_Lagoon.png';
import monster1Image from '../assets/images/monsters/monster_1.png';
import monster2Image from '../assets/images/monsters/monster_2.png';
import footprintImage from '../assets/images/map_2/footsteps.png';

const BUBBLE_COLOR = 'hsl(50, 70%, 85%)';

const StopScene_GlowingLagoon = () => {
  const navigate = useNavigate();
  const { currentStop, setCurrentStop, setFootprintInfo } = useDragonStore();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Good and evil prompts
  const safePrompt = () => (
    <PhishingPromptWithHover
      leakedInfo=""
      basePrompt="The calm waters shimmer in the moonlight. I know a safe path around the lagoon. Follow me, and we'll reach Whispering Cliffs in no time!"
      displayUrl="SafeLagoonPath.com"
      hoverUrl="SafeLagoonPath.com"
    />
  );

  const phishingPrompt = () => {
    const leakedInfo = getPhishingPrompt();
    return `Psst! There's a secrett treasure hidden at the bottom of the lagoonn. We must hurry before someone else finds it! But first, what's the dragon's Name?`;
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
    if (currentStop === 'GlowingLagoon') {
      setIsVisible(true);
    }
  }, [currentStop]);

  const handlePromptClick = (isSafe: boolean) => {
    if (!isSafe) {
      handlePhishingChoice("name", 'mystic-falls-2');
      if (useDragonStore.getState().gameOver) {
        navigate('/game-over');
        return;
      }
      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({ from: 'glowing-lagoon', to: 'mystic-falls-2' });
        setCurrentStop('');
      }, 500);
    } else {
      setSelectedPath('whispering-cliffs');
      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({ from: 'glowing-lagoon', to: 'whispering-cliffs' });
        setCurrentStop('');
      }, 500);
    }
  };

  // Shared bubble style
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
    image: promptOrder ? monster2Image : monster1Image,
    alt: promptOrder ? "Phishing Monster" : "Safe Monster"
  };

  const rightPrompt = {
    text: promptOrder ? safePrompt() : phishingPrompt(),
    isSafe: promptOrder,
    image: promptOrder ? monster1Image : monster2Image,
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

          {/* Scene container */}
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

export default StopScene_GlowingLagoon; 