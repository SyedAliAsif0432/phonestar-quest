import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';
import { handlePhishingChoice, getPhishingPrompt } from '../utils/gameUtils';
import { PhishingPromptWithHover } from '../utils/phishingPromptFactory';

// Import assets
import backgroundImage from '../assets/images/map_1/boulder_bluff.png';
import monster1Image from '../assets/images/monsters/monster_1.png';
import monster2Image from '../assets/images/monsters/monster_2.png';
import monster3Image from '../assets/images/monsters/monster_3.png';
import monster4Image from '../assets/images/monsters/monster_4.png';
import monster5Image from '../assets/images/monsters/monster_5.png';
import monster6Image from '../assets/images/monsters/monster_6.png';
import monster7Image from '../assets/images/monsters/monster_7.png';

const BUBBLE_COLOR = 'hsl(50, 70%, 85%)';

const StopScene_BoulderBluff = () => {
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

  const [safeMonster, setSafeMonster] = useState('');
  const [phishingMonster, setPhishingMonster] = useState('');

  const promptOrder = useMemo(() => Math.random() < 0.5, []);

  useEffect(() => {
    const monsterImages = [
      monster1Image,
      monster2Image,
      monster3Image,
      monster4Image,
      monster5Image,
      monster6Image,
      monster7Image
    ];

    const randomIndex1 = Math.floor(Math.random() * monsterImages.length);
    let randomIndex2 = Math.floor(Math.random() * monsterImages.length);

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * monsterImages.length);
    }

    setSafeMonster(monsterImages[randomIndex1]);
    setPhishingMonster(monsterImages[randomIndex2]);
  }, []);

  const safePrompt = "We're almost there! Just follow me over these bluffs, and we'll reach Dragon's Home in no time. The dragon's home is just ahead!";

  const phishingPrompt = () => (
    <PhishingPromptWithHover
      leakedInfo={getPhishingPrompt()}
      basePrompt="This is yur last chance! The shortcut over the bluffs is the fastest way, but it's risky. Only bold players take it! Prove your bravey"
      displayUrl="shortcut-bluff.com"
      hoverUrl="http://collect-info.net"
    />
  );

  const containerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (currentStop === 'BoulderBluff') {
      setIsVisible(true);
    }
  }, [currentStop]);

  const handlePromptClick = (isSafe: boolean) => {
    if (!isSafe) {
      let fieldToLeak: "name" | "age" | "origin" = "name";
      if (!leaks.name) fieldToLeak = "name";
      else if (!leaks.age) fieldToLeak = "age";
      else if (!leaks.origin) fieldToLeak = "origin";

      handlePhishingChoice(fieldToLeak, 'dragons-home');

      if (useDragonStore.getState().gameOver) {
        navigate('/game-over');
        return;
      }

      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({ from: 'boulder-bluff', to: 'dragons-home' });
        setCurrentStop('');
      }, 500);
    } else {
      setSelectedPath('dragons-home');
      setIsVisible(false);
      setTimeout(() => {
        setFootprintInfo({ from: 'boulder-bluff', to: 'dragons-home' });
        setCurrentStop('');
      }, 500);
    }
  };

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

  const smallBubbleStyle = {
    background: BUBBLE_COLOR,
    borderRadius: '50%',
    border: '3px solid rgba(0,0,0,0.8)',
  };

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
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          <div 
            className="relative w-3/4 h-3/4 rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(0,0,0,0.7)',
              border: '4px solid rgba(255,255,255,0.1)',
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={`dust-${i}`}
                  className="absolute bg-amber-800"
                  style={{
                    width: `${5 + Math.random() * 10}px`,
                    height: `${5 + Math.random() * 10}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${60 + Math.random() * 40}%`,
                    borderRadius: '50%',
                    opacity: 0.2,
                    filter: 'blur(3px)',
                  }}
                  animate={{
                    y: [0, -30 - Math.random() * 20],
                    x: [0, Math.random() * 20 - 10],
                    opacity: [0.2, 0, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-around p-8">
              {[leftPrompt, rightPrompt].map((prompt, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer h-full flex flex-col justify-center"
                  onClick={() => !selectedPath && handlePromptClick(prompt.isSafe)}
                >
                  <div className="mb-8" style={bubbleStyle}>
                    <div className="absolute -bottom-10 left-10" style={{ ...smallBubbleStyle, width: '20px', height: '20px' }} />
                    <div className="absolute -bottom-16 left-4" style={{ ...smallBubbleStyle, width: '12px', height: '12px' }} />
                    {typeof prompt.text === 'string' ? (
                      <p className="text-black font-pixel text-sm leading-relaxed px-2">{prompt.text}</p>
                    ) : (
                      <span className="text-black font-pixel text-sm leading-relaxed px-2">{prompt.text}</span>
                    )}
                  </div>
                  <motion.img
                    src={prompt.image}
                    alt={prompt.alt}
                    className="w-56 h-56"
                    animate={{ y: [0, -5, 0], filter: ['brightness(0.9)', 'brightness(1)', 'brightness(0.9)'] }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StopScene_BoulderBluff;
