import { useState, useEffect } from 'react';
import dragonImage from '../assets/images/red-dragon.png';
import './TitleScene.css';

const TitleScene: React.FC = () => {
  const [dragonLoaded, setDragonLoaded] = useState(false);
  
  // Create a placeholder dragon image URL using a data URL for now
  const placeholderDragonImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23ff0000" /><text x="50%" y="50%" font-family="sans-serif" font-size="20" text-anchor="middle" fill="%23ffffff">Dragon</text></svg>';
  
  const handlePlayClick = () => {
    console.log('Play button clicked');
    // Navigate to game scene or start the game
  };

  const handleExitClick = () => {
    console.log('Exit button clicked');
    // Close the application or navigate elsewhere
  };

  // Simulate dragon image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setDragonLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="title-scene bg-sky-100 relative">
      {/* Pixel art clouds in the background */}
      <div className="absolute top-10 left-10 w-32 h-12 bg-contain bg-no-repeat opacity-80" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='30'><rect x='10' y='10' width='20' height='10' fill='%23d4d4ff' /><rect x='30' y='5' width='30' height='15' fill='%23d4d4ff' /><rect x='60' y='10' width='20' height='10' fill='%23d4d4ff' /></svg>")` 
      }}></div>
      
      <div className="absolute top-5 right-20 w-40 h-12 bg-contain bg-no-repeat opacity-80" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='30'><rect x='10' y='10' width='20' height='10' fill='%23d4d4ff' /><rect x='30' y='5' width='30' height='15' fill='%23d4d4ff' /><rect x='60' y='10' width='30' height='10' fill='%23d4d4ff' /></svg>")` 
      }}></div>

      {/* Ground tiles */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-repeat-x" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><rect x='0' y='0' width='32' height='20' fill='%2348a93b' /><rect x='0' y='20' width='32' height='12' fill='%233a3a75' /></svg>")` 
      }}></div>

      {/* Title with pixel style shadow */}
      <h1 className="title-heading text-4xl md:text-5xl font-bold text-yellow-600 relative z-10">
        Phonster Quest:<br />
        <span className="text-3xl md:text-4xl block mt-2">A Dragon's Journey</span>
      </h1>

      {/* Dragon image */}
      <div className="dragon-container">
        <img 
          src={dragonLoaded ? dragonImage : placeholderDragonImage} 
          alt="Red Dragon" 
          className="dragon-image"
        />
      </div>

      {/* Buttons */}
      <div className="buttons-container">
        <button 
          onClick={handlePlayClick} 
          className="pixel-btn-primary text-xl min-w-32"
        >
          Play
        </button>
        <button 
          onClick={handleExitClick} 
          className="pixel-btn-secondary text-xl min-w-32"
        >
          Exit
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-16 left-16 w-8 h-16 bg-contain bg-no-repeat" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='64'><rect x='12' y='40' width='8' height='24' fill='%23654321' /><polygon points='0,40 32,40 16,0' fill='%2348a93b' /></svg>")` 
      }}></div>
      
      <div className="absolute bottom-16 right-16 w-8 h-16 bg-contain bg-no-repeat" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='64'><rect x='12' y='40' width='8' height='24' fill='%23654321' /><polygon points='0,40 32,40 16,0' fill='%2348a93b' /></svg>")` 
      }}></div>

      {/* Add sunflowers */}
      <div className="absolute bottom-12 left-24 w-8 h-12 bg-contain bg-no-repeat" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='48'><rect x='14' y='24' width='4' height='24' fill='%23228B22' /><circle cx='16' cy='12' r='12' fill='%23FFD700' /><circle cx='16' cy='12' r='6' fill='%23654321' /></svg>")` 
      }}></div>

      <div className="absolute bottom-12 right-36 w-8 h-12 bg-contain bg-no-repeat" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='48'><rect x='14' y='24' width='4' height='24' fill='%23228B22' /><circle cx='16' cy='12' r='12' fill='%23FFD700' /><circle cx='16' cy='12' r='6' fill='%23654321' /></svg>")` 
      }}></div>

      {/* Add a simple house */}
      <div className="absolute bottom-12 right-64 w-24 h-24 bg-contain bg-no-repeat" style={{ 
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect x='16' y='48' width='64' height='48' fill='%23964B00' /><rect x='40' y='72' width='16' height='24' fill='%23483D8B' /><polygon points='0,48 96,48 48,8' fill='%23DAA520' /></svg>")` 
      }}></div>
    </div>
  );
};

export default TitleScene; 