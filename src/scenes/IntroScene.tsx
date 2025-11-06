import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import cactusImage from '../assets/images/cactus.png';
import grassImage from '../assets/images/grass_2.png';
import cornerGrassImage from '../assets/images/grass.png';
import './TitleScene.css';

const IntroScene: React.FC = () => {
  const navigate = useNavigate();
  
  const handleContinueClick = () => {
    navigate('/dragon-info');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // Create multiple layers of bushes with different scales and positions
  const bushLayers = Array.from({ length: 5 }).map((_, index) => ({
    height: `${60 + index * 15}px`,
    opacity: 1 - (index * 0.05),
    translateY: -index * 10,
    delay: 0.1 + (index * 0.1)
  }));

  return (
    <div className="title-scene bg-sky-100 relative overflow-hidden">
      {/* Corner grass decorations */}
      <motion.div 
        className="absolute top-0 left-0 w-32 h-32 bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${cornerGrassImage})` }}
        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${cornerGrassImage})` }}
        initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Cactus on the left */}
      <motion.div 
        className="absolute bottom-16 left-16 w-24 h-36 bg-contain bg-no-repeat z-20"
        style={{ backgroundImage: `url(${cactusImage})` }}
        initial={{ opacity: 0, x: -50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          scale: { duration: 0.3 }
        }}
      />

      {/* Cactus on the right */}
      <motion.div 
        className="absolute bottom-16 right-16 w-24 h-36 bg-contain bg-no-repeat z-20"
        style={{ backgroundImage: `url(${cactusImage})` }}
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          scale: { duration: 0.3 }
        }}
      />

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 z-10 relative">
        {/* Speech bubble */}
        <motion.div 
          className="speech-bubble bg-green-700 text-white p-8 rounded-lg relative mb-12 w-full"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.p 
              className="text-2xl md:text-3xl text-center font-pixel leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Are you in search of a mythical companion to add enchantment to your life? Look no further! A majestic and awe-inspiring dragon, found alone and lost, is in need of a loving forever home.
            </motion.p>
          </div>
          {/* Speech bubble pointer */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-green-700 border-r-[20px] border-r-transparent" />
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex gap-6 z-20">
          <motion.button 
            onClick={handleBackClick} 
            className="font-pixel px-6 py-3 text-lg relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.6,
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{
              background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'100\' height=\'100\' rx=\'12\' fill=\'%234B5563\' /><rect x=\'3\' y=\'3\' width=\'94\' height=\'94\' rx=\'10\' fill=\'%236B7280\' /><rect x=\'5\' y=\'5\' width=\'90\' height=\'90\' rx=\'8\' fill=\'%236B7280\' /></svg>")',
              backgroundSize: 'cover',
              borderRadius: '12px',
              border: '2px solid #1F2937',
              boxShadow: '0 4px 0 #1F2937'
            }}
          >
            <span className="relative z-10 text-white drop-shadow-md">Back</span>
            <motion.div 
              className="absolute inset-0 rounded-xl bg-gray-500 -z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
            />
          </motion.button>
          <motion.button 
            onClick={handleContinueClick} 
            className="font-pixel px-8 py-3 text-lg relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.6,
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{
              background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'100\' height=\'100\' rx=\'12\' fill=\'%23854D0E\' /><rect x=\'3\' y=\'3\' width=\'94\' height=\'94\' rx=\'10\' fill=\'%23A16207\' /><rect x=\'5\' y=\'5\' width=\'90\' height=\'90\' rx=\'8\' fill=\'%23CA8A04\' /></svg>")',
              backgroundSize: 'cover',
              borderRadius: '12px',
              border: '2px solid #854D0E',
              boxShadow: '0 4px 0 #854D0E'
            }}
          >
            <span className="relative z-10 text-white drop-shadow-md">Continue</span>
            <motion.div 
              className="absolute inset-0 rounded-xl bg-yellow-500 -z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Bottom bushes layers */}
      <div className="absolute bottom-0 left-0 w-full z-50" style={{ pointerEvents: 'none' }}>
        {bushLayers.map((layer, index) => (
          <motion.div 
            key={index}
            className="absolute bottom-0 left-0 w-full bg-repeat-x bg-bottom"
            style={{ 
              backgroundImage: `url(${grassImage})`,
              height: layer.height,
              opacity: layer.opacity,
              transform: `translateY(${layer.translateY}px) scale(${1 + index * 0.2})`,
              filter: index > 0 ? `brightness(${0.98 - index * 0.03})` : 'none',
              zIndex: 50 - index,
              backgroundSize: 'auto 100%'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: layer.opacity, y: layer.translateY }}
            transition={{ duration: 0.5, delay: layer.delay }}
          />
        ))}
      </div>
    </div>
  );
};

export default IntroScene; 