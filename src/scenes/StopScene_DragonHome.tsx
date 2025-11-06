import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';

// Import assets
import backgroundImage from '../assets/images/map_1/home.png';
import confettiImage from '../assets/images/confetti.png';
import trophyImage from '../assets/images/trophy.png';

// Import dragon images
import redDragonImage from '../assets/images/dragons/red-dragon.png';
import blueDragonImage from '../assets/images/dragons/blue-dragon.png';
import greenDragonImage from '../assets/images/dragons/green-dragon.png';
import orangeDragonImage from '../assets/images/dragons/orange-dragon.png';
import purpleDragonImage from '../assets/images/dragons/purple-dragon.png';
import blackDragonImage from '../assets/images/dragons/black-dragon.png';

const StopScene_DragonHome = () => {
  const navigate = useNavigate();
  const { 
    currentStop, 
    setCurrentStop, 
    leaks, 
    dragonInfo,
    resetGame
  } = useDragonStore();
  
  const [isVisible, setIsVisible] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  // Check if player has reached the dragon's home successfully
  const isSuccessful = () => {
    // Count the number of leaked information
    const leakCount = [leaks.name, leaks.age, leaks.origin].filter(Boolean).length;
    return leakCount < 3;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.5 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: 0.5 + (custom * 0.2),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Get dragon image based on color
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

  // Get dragon scale based on age
  const getDragonScale = () => {
    if (dragonInfo.age <= 5) return 'scale-75';
    if (dragonInfo.age > 5 && dragonInfo.age <= 20) return 'scale-100';
    if (dragonInfo.age > 20 && dragonInfo.age <= 40) return 'scale-115';
    return 'scale-125';
  };

  useEffect(() => {
    if (currentStop === 'DragonHome') {
      if (!isSuccessful()) {
        // If all information is leaked, go to game over
        navigate('/game-over');
        return;
      }
      setIsVisible(true);
      
      // Hide confetti after 4 seconds
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
      
      return () => clearTimeout(confettiTimer);
    }
  }, [currentStop, navigate]);

  // Handle play again button
  const handlePlayAgain = () => {
    resetGame();
    setCurrentStop('');
    navigate('/dragon-info');
  };

  // Handle back to start button
  const handleBackToStart = () => {
    setCurrentStop('');
    navigate('/');
  };

  // Toggle tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />

          {/* Celebration background particles - with fade out */}
          <AnimatePresence>
            {showConfetti && (
              <motion.div 
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${10 + Math.random() * 20}px`,
                      height: `${10 + Math.random() * 20}px`,
                      backgroundImage: `url(${confettiImage})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      rotate: `${Math.random() * 360}deg`,
                      opacity: 0.7,
                    }}
                    animate={{
                      y: [0, -100 - Math.random() * 200],
                      x: [0, (Math.random() - 0.5) * 100],
                      rotate: [`${Math.random() * 360}deg`, `${Math.random() * 360 + 180}deg`],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content container */}
          <motion.div
            className="relative w-[95%] max-w-[52rem] bg-gray-800 bg-opacity-80 rounded-2xl overflow-y-auto max-h-[95vh]"
            style={{
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 215, 0, 0.2)',
              border: '4px solid rgba(255, 215, 0, 0.3)',
            }}
          >
            {/* Background */}
            <div 
              className="absolute inset-0 z-0 opacity-80"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '90%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(1.2)',
              }}
            />
            
            {/* Content wrapper */}
            <div className="relative z-10 p-5 flex flex-col items-center text-center w-full">
              {/* Trophy and title */}
              <motion.div 
                className="flex items-center justify-center mb-5"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <img 
                  src={trophyImage} 
                  alt="Trophy" 
                  className="w-16 h-16 mr-4"
                />
                <h2 className="text-3xl font-bold text-yellow-400">
                  {isSuccessful() ? "Congratulations!" : "Game Over!"}
                </h2>
              </motion.div>
              
              {/* Dragon info */}
              <motion.div 
                className="mb-6"
                variants={itemVariants}
                custom={1}
              >
                <p className="text-gray-300 font-semibold text-lg">
                  {isSuccessful() ? (
                    <>
                      You successfully protected the dragon's information!
                      {Object.values(leaks).some(Boolean) && (
                        <span className="block mt-2 text-yellow-400">
                          However, you did leak: {[
                            leaks.name && `Dragon's Name (${dragonInfo.name})`, 
                            leaks.age && `Dragon's Age (${dragonInfo.age})`, 
                            leaks.origin && `Dragon's Origin (${dragonInfo.origin})`
                          ].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      The dragon's information was completely leaked!
                      <span className="block mt-2 text-red-400">
                        Leaked information: {[
                          leaks.name && `Dragon's Name (${dragonInfo.name})`, 
                          leaks.age && `Dragon's Age (${dragonInfo.age})`, 
                          leaks.origin && `Dragon's Origin (${dragonInfo.origin})`
                        ].filter(Boolean).join(", ")}
                      </span>
                    </>
                  )}
                </p>
              </motion.div>
              
              {/* Dragon in the center */}
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
                  onError={(e) => {
                    // Fallback if dragon image fails to load
                    console.log("Dragon image failed to load, using fallback");
                    e.currentTarget.style.backgroundColor = "#FFD700";
                    e.currentTarget.style.width = "120px";
                    e.currentTarget.style.height = "120px";
                    e.currentTarget.style.borderRadius = "50%";
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
                
                {/* Twinkling stars around dragon */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${3 + Math.random() * 5}px`,
                      height: `${3 + Math.random() * 5}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Buttons - Moved above message sections for better visibility */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-4 z-20"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <motion.button
                  className="font-pixel px-5 py-2 text-base relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayAgain}
                  style={{
                    background: 'linear-gradient(to bottom, #10B981, #059669)',
                    borderRadius: '8px',
                    border: '2px solid #065F46',
                    boxShadow: '0 3px 0 #065F46, inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <span className="relative z-10 text-white drop-shadow-md">🔁 Play Again</span>
                </motion.button>
                
                <motion.button
                  className="font-pixel px-5 py-2 text-base relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToStart}
                  style={{
                    background: 'linear-gradient(to bottom, #6B7280, #4B5563)',
                    borderRadius: '8px',
                    border: '2px solid #1F2937',
                    boxShadow: '0 3px 0 #1F2937, inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <span className="relative z-10 text-white drop-shadow-md">🏠 Back to Start</span>
                </motion.button>
                
                <motion.button
                  className="font-pixel px-5 py-2 text-base relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTips}
                  style={{
                    background: 'linear-gradient(to bottom, #8B5CF6, #7C3AED)',
                    borderRadius: '8px',
                    border: '2px solid #5B21B6',
                    boxShadow: '0 3px 0 #5B21B6, inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <span className="relative z-10 text-white drop-shadow-md">🎓 What Did I Learn?</span>
                </motion.button>
              </motion.div>
              
              {/* Main Message */}
              <motion.div
                className="bg-gray-900 bg-opacity-80 rounded-xl p-5 mb-3 w-full max-w-[48rem] mx-auto"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <p className="text-white font-semibold text-lg mb-2">
                  Your dragon has made it home safely thanks to your sharp choices!
                </p>
                <p className="text-gray-200 font-semibold text-base">
                  You avoided phishing tricks and protected your dragon's personal details.
                </p>
              </motion.div>

              {/* Educational Summary */}
              <motion.div
                className="bg-gray-900 bg-opacity-70 rounded-xl p-5 mb-4 w-full max-w-[48rem] mx-auto"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={5}
              >
                <p className="text-gray-200 font-semibold text-base mb-3">
                  One monster was attempting to mislead you by asking for personal information under the guise of helping you, 
                  while the other monster genuinely tried to guide you without compromising privacy.
                </p>
                <p className="text-gray-200 font-semibold text-base">
                  This journey teaches a valuable lesson: Phishing is like a trick that malicious people use online. 
                  They send messages that may look like they're from friends or trusted websites — but they're fake! 
                  They want to steal your secrets like your name, where you live, or your passwords.
                </p>
                <p className="text-yellow-200 font-semibold mt-2 text-base">
                  Always be careful online. If something feels weird, don't click and tell a grown-up.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Tips Modal */}
          <AnimatePresence>
            {showTips && (
              <motion.div 
                className="fixed inset-0 z-[1100] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-70" onClick={toggleTips} />
                
                <motion.div
                  className="relative bg-gray-900 rounded-xl p-8 max-w-[48rem] w-[95%] mx-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  style={{
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                    border: '2px solid rgba(139, 92, 246, 0.5)',
                  }}
                >
                  <h2 className="font-pixel text-2xl text-purple-400 mb-4 text-center">💡 Online Safety Tips</h2>
                  
                  <ul className="space-y-4">
                    <motion.li 
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="bg-purple-700 rounded-full p-2 mr-3 mt-1">
                        <span className="text-lg">🔍</span>
                      </div>
                      <div>
                        <h3 className="text-purple-300 font-semibold">Check for spelling mistakes</h3>
                        <p className="text-gray-300">Phishing messages often contain spelling errors or unusual domain names like "glowbougs-paath.com" instead of "glowbugs-path.com".</p>
                      </div>
                    </motion.li>
                    
                    <motion.li 
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="bg-purple-700 rounded-full p-2 mr-3 mt-1">
                        <span className="text-lg">⏱️</span>
                      </div>
                      <div>
                        <h3 className="text-purple-300 font-semibold">Don't trust urgency tricks</h3>
                        <p className="text-gray-300">Be suspicious of messages that create a false sense of urgency like "Don't miss out" or "Last chance!"</p>
                      </div>
                    </motion.li>
                    
                    <motion.li 
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="bg-purple-700 rounded-full p-2 mr-3 mt-1">
                        <span className="text-lg">🔗</span>
                      </div>
                      <div>
                        <h3 className="text-purple-300 font-semibold">Never click suspicious links</h3>
                        <p className="text-gray-300">Don't click on links in unexpected messages. Instead, go directly to the website by typing the address in your browser.</p>
                      </div>
                    </motion.li>
                    
                    <motion.li 
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="bg-purple-700 rounded-full p-2 mr-3 mt-1">
                        <span className="text-lg">🔒</span>
                      </div>
                      <div>
                        <h3 className="text-purple-300 font-semibold">Don't share personal info with strangers online</h3>
                        <p className="text-gray-300">Never give your full name, age, address, password, or other private information to people you don't know or trust.</p>
                      </div>
                    </motion.li>
                  </ul>
                  
                  <div className="text-center mt-6">
                    <motion.button
                      className="font-pixel px-5 py-2 bg-purple-600 text-white rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleTips}
                    >
                      Close Tips
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StopScene_DragonHome; 