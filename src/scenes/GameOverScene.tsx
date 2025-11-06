import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';

// Import assets
import backgroundImage from '../assets/images/gameover.png';

// Import dragon images
import redDragonImage from '../assets/images/dragons/red-dragon.png';
import blueDragonImage from '../assets/images/dragons/blue-dragon.png';
import greenDragonImage from '../assets/images/dragons/green-dragon.png';
import orangeDragonImage from '../assets/images/dragons/orange-dragon.png';
import purpleDragonImage from '../assets/images/dragons/purple-dragon.png';
import blackDragonImage from '../assets/images/dragons/black-dragon.png';

const GameOverScene = () => {
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // Handle play again button
  const handlePlayAgain = () => {
    resetGame();
    setCurrentStop('');
    navigate('/dragon-info');
  };

  // Handle back to start button
  const handleBackToStart = () => {
    setCurrentStop('');
    resetGame();
    navigate('/');
  };

  // Toggle tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Full-screen background */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Game elements */}
      <div className="fixed inset-0 w-full h-full">
        {/* Title */}
        <motion.div 
          className="absolute top-[13.5vh] left-0 right-0 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="font-pixel text-5xl text-red-400 text-shadow-lg">Game Over</h1>
        </motion.div>
        
        {/* Main Message */}
        <motion.div
          className="absolute top-[25vh] left-0 right-0 mx-auto bg-gray-900 bg-opacity-60 rounded-xl p-5 w-[95%] max-w-[83.6rem] border border-red-800 max-h-[20vh] overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-900"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-red-300 font-semibold text-xl mb-2">
            You've reached the end of your journey. The path to the dragon's home was blocked by misplaced trust and leaked secrets. Every step shaped your fate.
          </p>
          <div className="text-gray-300 font-semibold text-lg">
            <p className="mb-2">Information leaked to the monsters:</p>
            <ul className="list-disc list-inside space-y-1">
              {leaks.name && <li className="text-red-400">Dragon's Name: {dragonInfo.name}</li>}
              {leaks.age && <li className="text-red-400">Dragon's Age: {dragonInfo.age}</li>}
              {leaks.origin && <li className="text-red-400">Dragon's Origin: {dragonInfo.origin}</li>}
            </ul>
          </div>
          <p className="text-yellow-200 font-semibold mt-2 text-base">
            Remember: The monsters worked together to gather all this information about your dragon!
          </p>
        </motion.div>
        
        {/* Dragon in the center */}
        <motion.div
          className="absolute top-[48vh] left-0 right-0 mx-auto flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.img
            src={getDragonImage()}
            alt={`${dragonInfo.color} Dragon`}
            className={`${getDragonScale()} max-h-52 drop-shadow-lg grayscale brightness-75`}
            animate={{
              y: [0, -5, 0],
              rotate: [-2, 0, -2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.7)) grayscale(70%) brightness(0.8)',
            }}
          />
          
          {/* Shadow effect under dragon */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-[-1] w-3/4 h-6 rounded-full bg-black"
            style={{ opacity: 0.4 }}
            animate={{
              scaleX: [0.9, 1.1, 0.9],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Buttons */}
        <motion.div
          className="absolute top-[65vh] left-0 right-0 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
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
            <span className="relative z-10 text-white drop-shadow-md">📚 Learn About Phishing</span>
          </motion.button>
        </motion.div>
        
        {/* Educational Summary */}
        <motion.div
          className="absolute top-[75vh] left-0 right-0 mx-auto bg-gray-900 bg-opacity-60 rounded-xl p-5 w-[95%] max-w-[83.6rem] border border-red-800 max-h-[20vh] overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-900"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-gray-200 font-semibold text-lg mb-3">
            Phishing is a trick used by attackers who pretend to help. One monster asked for your private information… and you gave it away. Always read carefully. Think before you trust.
          </p>
          <p className="text-gray-200 font-semibold text-lg">
            During your journey, you encountered monsters who seemed friendly. But they were trying to steal information about your dragon. 
            Being too trusting led to sharing too much personal information, which prevented you from reaching the dragon's home safely.
          </p>
          <p className="text-yellow-200 font-semibold mt-2 text-lg">
            Remember: Never share personal details with strangers. If something feels suspicious, it probably is!
          </p>
        </motion.div>
      </div>

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
              className="relative bg-gray-900 rounded-xl p-8 max-w-[83.6rem] w-[95%] mx-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-gray-900"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                border: '2px solid rgba(139, 92, 246, 0.5)',
              }}
            >
              <h2 className="font-pixel text-3xl text-purple-400 mb-4 text-center">💡 Online Safety Tips</h2>
              
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
                    <h3 className="text-purple-300 font-semibold text-lg">Check for spelling mistakes</h3>
                    <p className="text-gray-300 text-base">Phishing messages often contain spelling errors or unusual domain names like "glowbougs-paath.com" instead of "glowbugs-path.com".</p>
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
                    <h3 className="text-purple-300 font-semibold text-lg">Don't trust urgency tricks</h3>
                    <p className="text-gray-300 text-base">Be suspicious of messages that create a false sense of urgency like "Don't miss out" or "Last chance!"</p>
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
                    <h3 className="text-purple-300 font-semibold text-lg">Never click suspicious links</h3>
                    <p className="text-gray-300 text-base">Don't click on links in unexpected messages. Instead, go directly to the website by typing the address in your browser.</p>
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
                    <h3 className="text-purple-300 font-semibold text-lg">Don't share personal info with strangers online</h3>
                    <p className="text-gray-300 text-base">Never give your full name, age, address, password, or other private information to people you don't know or trust.</p>
                  </div>
                </motion.li>
              </ul>
              
              <div className="text-center mt-6">
                <motion.button
                  className="font-pixel px-5 py-2 bg-purple-600 text-white rounded-lg text-lg"
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
    </div>
  );
};

export default GameOverScene; 