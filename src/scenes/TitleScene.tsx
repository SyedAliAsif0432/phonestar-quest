import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import dragonImage from '../assets/images/red-dragon.png';
import cloudImage from '../assets/images/cloud.png';
import groundImage from '../assets/images/ground.png';
import treeImage from '../assets/images/tree.png';
import houseImage from '../assets/images/house.png';
import './TitleScene.css';

const TitleScene: React.FC = () => {
  const [dragonLoaded, setDragonLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Create a placeholder dragon image URL using a data URL for now
  const placeholderDragonImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23ff0000" /><text x="50%" y="50%" font-family="sans-serif" font-size="20" text-anchor="middle" fill="%23ffffff">Dragon</text></svg>';
  
  const handlePlayClick = () => {
    console.log('Play button clicked');
    navigate('/intro');
  };

  const handleExitClick = () => {
    console.log('Exit button clicked');
    if (window.confirm('Thanks for visiting Phonster Quest!')) {
      window.close();
    }
  };

  // Simulate dragon image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setDragonLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Create ground tiles with slight overlap to prevent cracks
  const groundTiles = Array.from({ length: 15 }).map((_, index) => ({
    left: `${index * 6.5}%`,
    delay: 0.05 * index
  }));

  return (
    <div className="title-scene bg-sky-100 relative overflow-hidden">
      {/* Cloud decorations */}
      <motion.div 
        className="absolute top-10 left-10 w-48 h-24 bg-contain bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${cloudImage})` }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute top-5 right-20 w-64 h-32 bg-contain bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${cloudImage})` }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute top-24 left-64 w-40 h-20 bg-contain bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${cloudImage})` }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
      
      <motion.div 
        className="absolute top-16 right-80 w-36 h-18 bg-contain bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${cloudImage})` }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      />

      {/* Ground - using multiple overlapping tiles */}
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        {groundTiles.map((tile, index) => (
          <motion.div 
            key={index}
            className="absolute bottom-0 h-16"
            style={{
              left: tile.left,
              width: '8%',
              backgroundImage: `url(${groundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center bottom',
              imageRendering: 'pixelated'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: tile.delay }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center px-4 h-screen">
        {/* Title with pixel style shadow */}
        <motion.h1 
          className="title-heading text-4xl md:text-5xl font-bold text-yellow-600 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LET'S PLAY<br />
          <span className="text-3xl md:text-4xl block mt-2">Phonster Quest</span>
        </motion.h1>

        {/* Dragon image */}
        <motion.div 
          className="dragon-container mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.img 
            src={dragonLoaded ? dragonImage : placeholderDragonImage} 
            alt="Red Dragon" 
            className="dragon-image"
            animate={{ y: ["0px", "-10px", "0px"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="buttons-container mt-8 flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button 
            onClick={handlePlayClick} 
            className="font-pixel px-8 py-3 text-lg relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'100\' height=\'100\' rx=\'12\' fill=\'%23854D0E\' /><rect x=\'3\' y=\'3\' width=\'94\' height=\'94\' rx=\'10\' fill=\'%23A16207\' /><rect x=\'5\' y=\'5\' width=\'90\' height=\'90\' rx=\'8\' fill=\'%23CA8A04\' /></svg>")',
              backgroundSize: 'cover',
              borderRadius: '12px',
              border: '2px solid #854D0E',
              boxShadow: '0 4px 0 #854D0E'
            }}
          >
            <span className="relative z-10 text-white drop-shadow-md">Play</span>
            <motion.div 
              className="absolute inset-0 rounded-xl bg-yellow-500 -z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
            />
          </motion.button>
          <motion.button 
            onClick={handleExitClick} 
            className="font-pixel px-6 py-3 text-lg relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'100\' height=\'100\' rx=\'12\' fill=\'%234B5563\' /><rect x=\'3\' y=\'3\' width=\'94\' height=\'94\' rx=\'10\' fill=\'%236B7280\' /><rect x=\'5\' y=\'5\' width=\'90\' height=\'90\' rx=\'8\' fill=\'%236B7280\' /></svg>")',
              backgroundSize: 'cover',
              borderRadius: '12px',
              border: '2px solid #1F2937',
              boxShadow: '0 4px 0 #1F2937'
            }}
          >
            <span className="relative z-10 text-white drop-shadow-md">Exit</span>
            <motion.div 
              className="absolute inset-0 rounded-xl bg-gray-500 -z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Trees - more of them with different scales and positions */}
      <motion.div 
        className="absolute bottom-16 left-16 w-32 h-48 bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${treeImage})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          delay: 0.3
        }}
      />
      
      <motion.div 
        className="absolute bottom-16 right-16 w-32 h-48 bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${treeImage})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          delay: 0.5
        }}
      />
      
      <motion.div 
        className="absolute bottom-16 left-48 w-24 h-36 bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${treeImage})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4
        }}
      />
      
      <motion.div 
        className="absolute bottom-16 right-48 w-28 h-42 bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${treeImage})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          delay: 0.6
        }}
      />
      
      <motion.div 
        className="absolute bottom-16 left-80 w-20 h-30 bg-contain bg-no-repeat z-11"
        style={{ backgroundImage: `url(${treeImage})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          delay: 0.7
        }}
      />

      {/* House */}
      <motion.div 
        className="absolute bottom-16 right-64 w-64 h-48 bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${houseImage})` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          ease: "easeOut",
          delay: 0.2
        }}
      />
    </div>
  );
};

export default TitleScene; 