import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';

// Import Map 1 stop scenes
import StopScene_GigglingGrove from './StopScene_GigglingGrove';
import StopScene_SparklingStream from './StopScene_SparklingStream';
import StopScene_MysticFalls from './StopScene_MysticFalls';
import StopScene_GlowbugGlade from './StopScene_GlowbugGlade';
import StopScene_ShadyCanopy from './StopScene_ShadyCanopy';
import StopScene_BoulderBluff from './StopScene_BoulderBluff';
import StopScene_EchoingCave from './StopScene_EchoingCave';
import StopScene_DragonHome from './StopScene_DragonHome';
import StopScene_StormyShoals from './StopScene_StormyShoals';

// Import Map 2 stop scenes
import StopScene_GlowingLagoon from './StopScene_GlowingLagoon';
import StopScene_WhisperingCliffs from './StopScene_WhisperingCliffs';
import StopScene_EmberIsle from './StopScene_EmberIsle';
import StopScene_SkybridgeArchipelago from './StopScene_SkybridgeArchipelago';
import StopScene_ShimmeringShore from './StopScene_ShimmeringShore';
import StopScene_DragonLair from './StopScene_DragonLair';
import StopScene_MysticFalls2 from './StopScene_MysticFalls2';
import StopScene_EchoingCave2 from './StopScene_EchoingCave2';

// Import Map 1 assets
import map1Background from '../assets/images/map_1/background.png';
import map1StartPoint from '../assets/images/map_1/start_point.png';
import gigglingGroveImage from '../assets/images/map_1/giggling_grove.png';
import sparklingStreamImage from '../assets/images/map_1/sparkling_stream.png';
import glowbugGladeImage from '../assets/images/map_1/glowbug_glade_animation.gif';
import shadowCanopyImage from '../assets/images/map_1/shadow_canopy.png';
import boulderBluffImage from '../assets/images/map_1/boulder_bluff.png';
import mysticFallsImage from '../assets/images/map_1/mystic_fall.png';
import echoingCaveImage from '../assets/images/map_1/echoing_cave.png';
import homeImage from '../assets/images/map_1/home.png';
import map1Path1 from '../assets/images/map_1/path_1.png';
import map1Path2 from '../assets/images/map_1/path_2.png';
import map1Path3 from '../assets/images/map_1/path_3.png';
import map1Footsteps from '../assets/images/map_1/footsteps.png';

// Import Map 2 assets
import map2Background from '../assets/images/map_2/background.png';
import map2StartPoint from '../assets/images/map_2/start_point.png';
import glowingLagoonImage from '../assets/images/map_2/Glowing_Lagoon.png';
import whisperingCliffsImage from '../assets/images/map_2/Whispering_Cliffs.png';
import emberIsleImage from '../assets/images/map_2/ember_Isle.png';
import skybridgeArchipelagoImage from '../assets/images/map_2/skybridge_archipelago.png';
import shimmeringShoreImage from '../assets/images/map_2/shimmering_shore.png';
import dragonLairImage from '../assets/images/map_2/dragon_lair.png';
import echoingCave2Image from '../assets/images/map_2/echoing_cave.png';
import stormyShoalsImage from '../assets/images/map_2/stormy_shoals.png';

// Import shared assets
import trophyImage from '../assets/images/trophy.png';
import redDragonImage from '../assets/images/dragons/red-dragon.png';
import blueDragonImage from '../assets/images/dragons/blue-dragon.png';
import greenDragonImage from '../assets/images/dragons/green-dragon.png';
import orangeDragonImage from '../assets/images/dragons/orange-dragon.png';
import purpleDragonImage from '../assets/images/dragons/purple-dragon.png';
import blackDragonImage from '../assets/images/dragons/black-dragon.png';
import map2Footsteps from '../assets/images/map_2/footsteps.png';

// Import styling
import './TitleScene.css';

// Define interfaces
interface Position {
  x: number;
  y: number;
}

interface Location {
  id: string;
  name: string;
  image: string;
  position: Position;
  width: number;
  height: number;
  isCompleted: boolean;
  isActive: boolean;
  isFinal?: boolean;
}

interface Path {
  id: string;
  from: string;
  to: string;
  image: string;
  position: Position;
  width: number;
  transform: string;
  zIndex: number;
  opacity: number;
}

const MapScene: React.FC = () => {
  const navigate = useNavigate();
  const { currentStop, setCurrentStop, footprintInfo, setFootprintInfo, currentMap } = useDragonStore();
  const dragonInfo = useDragonStore((state) => state.dragonInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<string>('start-point');
  const [completedLocations, setCompletedLocations] = useState<string[]>(['start-point']);
  const [showFootprints, setShowFootprints] = useState(false);
  
  // Define locations based on current map
  const locations = currentMap === 'map1' ? [
    { 
      id: 'start-point',
      name: 'Starting Point',
      image: map1StartPoint,
      position: { x: 50, y: 100 },
      width: 130, 
      height: 130,
      isCompleted: completedLocations.includes('start-point'),
      isActive: currentLocation === 'start-point',
    },
    { 
      id: 'giggling-grove',
      name: 'Giggling Grove',
      image: gigglingGroveImage,
      position: { x: 300, y: 200 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('giggling-grove'),
      isActive: currentLocation === 'giggling-grove',
    },
    { 
      id: 'sparkling-stream',
      name: 'Sparkling Stream',
      image: sparklingStreamImage,
      position: { x: 550, y: 150 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('sparkling-stream'),
      isActive: currentLocation === 'sparkling-stream',
    },
    { 
      id: 'mystic-falls',
      name: 'Mystic Falls',
      image: mysticFallsImage,
      position: { x: 500, y: 350 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('mystic-falls'),
      isActive: currentLocation === 'mystic-falls',
    },
    { 
      id: 'glowbug-glade',
      name: 'Glowbug Glade',
      image: glowbugGladeImage,
      position: { x: 750, y: 225 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('glowbug-glade'),
      isActive: currentLocation === 'glowbug-glade',
    },
    { 
      id: 'shadow-canopy',
      name: 'Shady Canopy',
      image: shadowCanopyImage,
      position: { x: 750, y: 450 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('shadow-canopy'),
      isActive: currentLocation === 'shadow-canopy',
    },
    { 
      id: 'echoing-cave',
      name: 'Echoing Cave',
      image: echoingCaveImage,
      position: { x: 950, y: 180},
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('echoing-cave'),
      isActive: currentLocation === 'echoing-cave',
    },
    { 
      id: 'boulder-bluff',
      name: 'Boulder Bluff',
      image: boulderBluffImage,
      position: { x: 1000, y: 400},
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('boulder-bluff'),
      isActive: currentLocation === 'boulder-bluff',
    },
    { 
      id: 'dragons-home',
      name: "Dragon's Home",
      image: homeImage,
      position: { x: 1300, y: 450 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('dragons-home'),
      isActive: currentLocation === 'dragons-home',
      isFinal: true,
    },
  ] : [
    { 
      id: 'start-point',
      name: 'Starting Point',
      image: map2StartPoint,
      position: { x: 50, y: 100 },
      width: 130, 
      height: 130,
      isCompleted: completedLocations.includes('start-point'),
      isActive: currentLocation === 'start-point',
    },
    { 
      id: 'glowing-lagoon',
      name: 'Glowing Lagoon',
      image: glowingLagoonImage,
      position: { x: 300, y: 200 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('glowing-lagoon'),
      isActive: currentLocation === 'glowing-lagoon',
    },
    { 
      id: 'whispering-cliffs',
      name: 'Whispering Cliffs',
      image: whisperingCliffsImage,
      position: { x: 550, y: 150 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('whispering-cliffs'),
      isActive: currentLocation === 'whispering-cliffs',
    },
    { 
      id: 'stormy-shoals',
      name: 'Stormy Shoals',
      image: stormyShoalsImage,
      position: { x: 550, y: 350 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('stormy-shoals'),
      isActive: currentLocation === 'stormy-shoals',
    },
    { 
      id: 'ember-isle',
      name: 'Ember Isle',
      image: emberIsleImage,
      position: { x: 750, y: 225 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('ember-isle'),
      isActive: currentLocation === 'ember-isle',
    },
    { 
      id: 'skybridge-archipelago',
      name: 'Skybridge Archipelago',
      image: skybridgeArchipelagoImage,
      position: { x: 950, y: 180 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('skybridge-archipelago'),
      isActive: currentLocation === 'skybridge-archipelago',
    },
    { 
      id: 'shimmering-shore',
      name: 'Shimmering Shore',
      image: shimmeringShoreImage,
      position: { x: 1000, y: 400 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('shimmering-shore'),
      isActive: currentLocation === 'shimmering-shore',
    },
    { 
      id: 'dragon-lair',
      name: "Dragon's Lair",
      image: dragonLairImage,
      position: { x: 1300, y: 450 },
      width: 130,
      height: 130,
      isCompleted: completedLocations.includes('dragon-lair'),
      isActive: currentLocation === 'dragon-lair',
      isFinal: true,
    },
  ];

  // Custom path connections - using SVG paths instead of images
  const pathConnections = currentMap === 'map1' ? [
    // Map 1 paths
    // Start Point → Giggling Grove
    { 
      id: 'start-giggling',
      from: 'start-point',
      to: 'giggling-grove',
      points: [
        { x: 185, y: 185 },
        { x: 250, y: 220 },
        { x: 320, y: 270 }
      ],
      color: 'rgba(255, 215, 0, 0.7)',
      dotColor: 'rgba(255, 215, 0, 0.9)',
    },
    
    // Giggling Grove → Sparkling Stream
    { 
      id: 'giggling-sparkling',
      from: 'giggling-grove',
      to: 'sparkling-stream',
      points: [
        { x: 385, y: 280 },
        { x: 450, y: 220 },
        { x: 550, y: 220 }
      ],
      color: 'rgba(255, 200, 100, 0.7)',
      dotColor: 'rgba(255, 200, 100, 0.9)',
    },
    
    // Giggling Grove → Mystic Falls
    { 
      id: 'giggling-mystic',
      from: 'giggling-grove',
      to: 'mystic-falls',
      points: [
        { x: 370, y: 300 },
        { x: 400, y: 350 },
        { x: 450, y: 420 }
      ],
      color: 'rgba(180, 230, 255, 0.7)',
      dotColor: 'rgba(180, 230, 255, 0.9)',
    },
    
    // Sparkling Stream → Glowbug Glade
    { 
      id: 'sparkling-glowbug',
      from: 'sparkling-stream',
      to: 'glowbug-glade',
      points: [
        { x: 615, y: 220 },
        { x: 650, y: 240 },
        { x: 700, y: 300 }
      ],
      color: 'rgba(180, 255, 200, 0.7)',
      dotColor: 'rgba(180, 255, 200, 0.9)',
    },
    
    // Sparkling Stream → Boulder Bluff
    { 
      id: 'sparkling-boulder',
      from: 'sparkling-stream',
      to: 'boulder-bluff',
      points: [
        { x: 615, y: 170 },
        { x: 750, y: 160 },
        { x: 950, y: 180 }
      ],
      color: 'rgba(255, 180, 120, 0.7)',
      dotColor: 'rgba(255, 180, 120, 0.9)',
    },
    
    // Mystic Falls → Glowbug Glade
    { 
      id: 'mystic-glowbug',
      from: 'mystic-falls',
      to: 'glowbug-glade',
      points: [
        { x: 515, y: 410 },
        { x: 620, y: 350 },
        { x: 700, y: 310 }
      ],
      color: 'rgba(180, 200, 255, 0.7)',
      dotColor: 'rgba(180, 200, 255, 0.9)',
    },
    
    // Mystic Falls → Shady Canopy
    { 
      id: 'mystic-shadow',
      from: 'mystic-falls',
      to: 'shadow-canopy',
      points: [
        { x: 520, y: 430 },
        { x: 650, y: 450 },
        { x: 800, y: 420 }
      ],
      color: 'rgba(170, 140, 220, 0.7)',
      dotColor: 'rgba(170, 140, 220, 0.9)',
    },
    
    // Glowbug Glade → Shady Canopy
    { 
      id: 'glowbug-shadow',
      from: 'glowbug-glade',
      to: 'shadow-canopy',
      points: [
        { x: 730, y: 345 },
        { x: 760, y: 380 },
        { x: 800, y: 410 }
      ],
      color: 'rgba(190, 160, 230, 0.7)',
      dotColor: 'rgba(190, 160, 230, 0.9)',
    },
    
    // Glowbug Glade → Boulder Bluff
    { 
      id: 'glowbug-boulder',
      from: 'glowbug-glade',
      to: 'boulder-bluff',
      points: [
        { x: 765, y: 270 },
        { x: 850, y: 220 },
        { x: 950, y: 200 }
      ],
      color: 'rgba(230, 210, 120, 0.7)',
      dotColor: 'rgba(230, 210, 120, 0.9)',
    },
    
    // Shady Canopy → Dragon's Home
    { 
      id: 'shadow-dragons',
      from: 'shadow-canopy',
      to: 'dragons-home',
      points: [
        { x: 860, y: 410 },
        { x: 950, y: 250 },
        { x: 1050, y: 120 }
      ],
      color: 'rgba(255, 200, 80, 0.8)',
      dotColor: 'rgba(255, 200, 80, 1)',
    },
    
    // Shady Canopy → Boulder Bluff
    { 
      id: 'shadow-boulder',
      from: 'shadow-canopy',
      to: 'boulder-bluff',
      points: [
        { x: 865, y: 390 },
        { x: 900, y: 300 },
        { x: 950, y: 210 }
      ],
      color: 'rgba(200, 170, 120, 0.7)',
      dotColor: 'rgba(200, 170, 120, 0.9)',
    },
    
    // Echoing Cave → Shady Canopy
    { 
      id: 'echo-shadow',
      from: 'echoing-cave',
      to: 'shadow-canopy',
      points: [
        { x: 880, y: 320 },
        { x: 850, y: 360 },
        { x: 830, y: 400 }
      ],
      color: 'rgba(150, 130, 200, 0.7)',
      dotColor: 'rgba(150, 130, 200, 0.9)',
    },
    
    // Echoing Cave → Boulder Bluff
    { 
      id: 'echo-boulder',
      from: 'echoing-cave',
      to: 'boulder-bluff',
      points: [
        { x: 910, y: 250 },
        { x: 930, y: 220 },
        { x: 950, y: 200 }
      ],
      color: 'rgba(210, 190, 150, 0.7)',
      dotColor: 'rgba(210, 190, 150, 0.9)',
    },
    
    // Boulder Bluff → Dragon's Home
    { 
      id: 'boulder-dragons',
      from: 'boulder-bluff',
      to: 'dragons-home',
      points: [
        { x: 1000, y: 170 },
        { x: 1025, y: 130 },
        { x: 1050, y: 110 }
      ],
      color: 'rgba(255, 220, 100, 0.8)',
      dotColor: 'rgba(255, 220, 100, 1)',
    },
  ] : [
    // Map 2 paths
    // Start Point → Glowing Lagoon
    { 
      id: 'start-lagoon',
      from: 'start-point',
      to: 'glowing-lagoon',
      points: [
        { x: 185, y: 185 },
        { x: 250, y: 220 },
        { x: 320, y: 270 }
      ],
      color: 'rgba(0, 255, 255, 0.7)',
      dotColor: 'rgba(0, 255, 255, 0.9)',
    },
    
    // Glowing Lagoon → Whispering Cliffs
    { 
      id: 'lagoon-cliffs',
      from: 'glowing-lagoon',
      to: 'whispering-cliffs',
      points: [
        { x: 385, y: 280 },
        { x: 450, y: 220 },
        { x: 550, y: 220 }
      ],
      color: 'rgba(200, 255, 255, 0.7)',
      dotColor: 'rgba(200, 255, 255, 0.9)',
    },
    
    // Whispering Cliffs → Ember Isle
    { 
      id: 'cliffs-ember',
      from: 'whispering-cliffs',
      to: 'ember-isle',
      points: [
        { x: 615, y: 220 },
        { x: 650, y: 240 },
        { x: 700, y: 300 }
      ],
      color: 'rgba(255, 100, 0, 0.7)',
      dotColor: 'rgba(255, 100, 0, 0.9)',
    },
    
    // Whispering Cliffs → Skybridge Archipelago
    { 
      id: 'cliffs-skybridge',
      from: 'whispering-cliffs',
      to: 'skybridge-archipelago',
      points: [
        { x: 615, y: 170 },
        { x: 750, y: 160 },
        { x: 950, y: 180 }
      ],
      color: 'rgba(150, 200, 255, 0.7)',
      dotColor: 'rgba(150, 200, 255, 0.9)',
    },
    
    // Ember Isle → Shimmering Shore
    { 
      id: 'ember-shore',
      from: 'ember-isle',
      to: 'shimmering-shore',
      points: [
        { x: 765, y: 270 },
        { x: 850, y: 220 },
        { x: 950, y: 200 }
      ],
      color: 'rgba(255, 200, 100, 0.7)',
      dotColor: 'rgba(255, 200, 100, 0.9)',
    },
    
    // Ember Isle → Skybridge Archipelago
    { 
      id: 'ember-skybridge',
      from: 'ember-isle',
      to: 'skybridge-archipelago',
      points: [
        { x: 730, y: 345 },
        { x: 760, y: 380 },
        { x: 800, y: 410 }
      ],
      color: 'rgba(180, 180, 255, 0.7)',
      dotColor: 'rgba(180, 180, 255, 0.9)',
    },
    
    // Skybridge Archipelago → Shimmering Shore
    { 
      id: 'skybridge-shore',
      from: 'skybridge-archipelago',
      to: 'shimmering-shore',
      points: [
        { x: 910, y: 250 },
        { x: 930, y: 220 },
        { x: 950, y: 200 }
      ],
      color: 'rgba(100, 200, 255, 0.7)',
      dotColor: 'rgba(100, 200, 255, 0.9)',
    },
    
    // Skybridge Archipelago → Dragon Lair
    { 
      id: 'skybridge-lair',
      from: 'skybridge-archipelago',
      to: 'dragon-lair',
      points: [
        { x: 1000, y: 170 },
        { x: 1025, y: 130 },
        { x: 1050, y: 110 }
      ],
      color: 'rgba(255, 220, 100, 0.8)',
      dotColor: 'rgba(255, 220, 100, 1)',
    },
    
    // Whispering Cliffs → Stormy Shoals
    { 
      id: 'cliffs-stormy',
      from: 'whispering-cliffs',
      to: 'stormy-shoals',
      points: [
        { x: 615, y: 220 },
        { x: 580, y: 280 },
        { x: 550, y: 350 }
      ],
      color: 'rgba(100, 100, 255, 0.7)',
      dotColor: 'rgba(100, 100, 255, 0.9)',
    },
    
    // Stormy Shoals → Skybridge Archipelago
    { 
      id: 'stormy-skybridge',
      from: 'stormy-shoals',
      to: 'skybridge-archipelago',
      points: [
        { x: 615, y: 350 },
        { x: 750, y: 280 },
        { x: 950, y: 180 }
      ],
      color: 'rgba(150, 150, 255, 0.7)',
      dotColor: 'rgba(150, 150, 255, 0.9)',
    },
  ];

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

  // Animation for the dragon's idle state
  const dragonIdleAnimation = {
    y: ['0px', '-5px', '0px'],
    rotate: ['0deg', '2deg', '0deg'],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut',
    },
  };

  // Handle location click
  const handleLocationClick = (locationId: string) => {
    // Simply set the location as active and completed
    setCurrentLocation(locationId);
    if (!completedLocations.includes(locationId)) {
      setCompletedLocations([...completedLocations, locationId]);
    }
    
    // Convert to scene name format (e.g., sparkling-stream → SparklingStream)
    const convertToSceneName = (id: string) => {
      // Special cases for scene mapping
      if (currentMap === 'map1') {
        if (id === 'shadow-canopy') {
          return 'ShadowCanopy';
        }
        if (id === 'boulder-bluff') {
          return 'BoulderBluff';
        }
        if (id === 'dragons-home') {
          return 'DragonHome';
        }
      } else {
        if (id === 'glowing-lagoon') {
          return 'GlowingLagoon';
        }
        if (id === 'whispering-cliffs') {
          return 'WhisperingCliffs';
        }
        if (id === 'ember-isle') {
          return 'EmberIsle';
        }
        if (id === 'skybridge-archipelago') {
          return 'SkybridgeArchipelago';
        }
        if (id === 'shimmering-shore') {
          return 'ShimmeringShore';
        }
        if (id === 'dragon-lair') {
          return 'DragonLair';
        }
      }
      
      // Default conversion
      return id.split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    };
    
    // Set the current stop to trigger the scene
    const sceneName = convertToSceneName(locationId);
    console.log(`Setting current stop to: ${sceneName}`);
    
    setTimeout(() => {
      setCurrentStop(sceneName);
    }, 500);
  };

  // Handle navigation back to dragon info
  const handleBackClick = () => {
    // Add debug log
    console.log('Back button clicked, navigating to dragon-info');
    // Navigate back to the dragon info screen
    navigate('/dragon-info');
  };

  // Get reference to footprint endpoints for animation
  const getLocationPosition = (locationId: string) => {
    const location = locations.find(loc => loc.id === locationId);
    if (!location) return { x: 0, y: 0 };
    
    return {
      x: location.position.x + location.width/2,
      y: location.position.y + location.height/2
    };
  };

  // Generate footprint path points between locations
  const getFootprintPath = (from: string, to: string) => {
    const fromPos = getLocationPosition(from);
    const toPos = getLocationPosition(to);
    
    if (fromPos.x === 0 || toPos.x === 0) return [];
    
    // Calculate distance and number of steps
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
    
    // More footprints for longer distances, especially to Dragon's Home
    let steps = Math.max(5, Math.floor(distance / 30)); // One footprint every 30px  
    if (to === 'dragons-home') steps = Math.max(15, steps); // At least 15 steps to Dragon's Home
    
    // Generate points
    const points = [];
    for (let i = 0; i <= steps; i++) {
      points.push({
        x: fromPos.x + (dx * i / steps),
        y: fromPos.y + (dy * i / steps)
      });
    }
    
    return points;
  };

  // Watch for footprintInfo changes to trigger animation
  useEffect(() => {
    if (footprintInfo.from && footprintInfo.to) {
      console.log(`Animating footprints from ${footprintInfo.from} to ${footprintInfo.to}`);
      
      // Generate the path points
      const pathPoints = getFootprintPath(footprintInfo.from, footprintInfo.to);
      console.log(`Generated ${pathPoints.length} footprint points`);
      
      // Show footprints
      setShowFootprints(true);
      
      // Determine animation duration based on distance
      const fromPos = getLocationPosition(footprintInfo.from);
      const toPos = getLocationPosition(footprintInfo.to);
      const distance = Math.sqrt(
        Math.pow(toPos.x - fromPos.x, 2) + 
        Math.pow(toPos.y - fromPos.y, 2)
      );
      
      // Longer animation for longer distances, especially to Dragon's Home
      let animationDuration = 2000; // Default 2 seconds
      if (distance > 300) animationDuration = 3000;
      if (distance > 500) animationDuration = 4000;
      if (footprintInfo.to === 'dragons-home') animationDuration = 5000; // Extra time for dragon's home
      
      console.log(`Animation duration set to ${animationDuration}ms based on distance ${distance}`);
      
      // After footprint animation completes, navigate to the next stop
      const timer = setTimeout(() => {
        setShowFootprints(false);
        
        // Update location based on destination
        setCurrentLocation(footprintInfo.to);
        
        // Convert to scene name format (e.g., sparkling-stream → SparklingStream)
        const convertToSceneName = (id: string) => {
          // Special cases for scene mapping
          if (id === 'shadow-canopy') {
            return 'ShadowCanopy';
          }
          if (id === 'boulder-bluff') {
            return 'BoulderBluff';
          }
          if (id === 'dragons-home') {
            return 'DragonHome';
          }
          
          // Default conversion
          return id.split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
        };
        
        const nextScene = convertToSceneName(footprintInfo.to);
        console.log(`Setting currentStop to: ${nextScene}`);
        
        // Set the next stop
        setCurrentStop(nextScene);
        console.log(`After setting currentStop: ${nextScene}, currentStop is: ${currentStop}`);
        
        // Reset footprint info
        setFootprintInfo({ from: '', to: '' });
      }, animationDuration);
      
      return () => clearTimeout(timer);
    }
  }, [footprintInfo, setCurrentStop, setFootprintInfo]);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          className="text-white text-2xl font-pixel"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {currentMap === 'map2' ? 'Loading dragon island...' : 'Loading mystical forest...'}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="map-scene relative overflow-hidden w-full h-screen">
      {/* Render stop scenes based on currentStop */}
      {currentMap === 'map1' ? (
        <>
          {currentStop === 'GigglingGrove' && <StopScene_GigglingGrove />}
          {currentStop === 'SparklingStream' && <StopScene_SparklingStream />}
          {currentStop === 'MysticFalls' && <StopScene_MysticFalls />}
          {currentStop === 'GlowbugGlade' && <StopScene_GlowbugGlade />}
          {currentStop === 'ShadowCanopy' && <StopScene_ShadyCanopy />}
          {currentStop === 'BoulderBluff' && <StopScene_BoulderBluff />}
          {currentStop === 'EchoingCave' && <StopScene_EchoingCave />}
          {currentStop === 'DragonHome' && <StopScene_DragonHome />}
        </>
      ) : (
        <>
          {currentStop === 'GlowingLagoon' && <StopScene_GlowingLagoon />}
          {currentStop === 'WhisperingCliffs' && <StopScene_WhisperingCliffs />}
          {currentStop === 'StormyShoals' && <StopScene_StormyShoals />}
          {currentStop === 'EmberIsle' && <StopScene_EmberIsle />}
          {currentStop === 'SkybridgeArchipelago' && <StopScene_SkybridgeArchipelago />}
          {currentStop === 'ShimmeringShore' && <StopScene_ShimmeringShore />}
          {currentStop === 'DragonLair' && <StopScene_DragonLair />}
          {currentStop === 'MysticFalls2' && <StopScene_MysticFalls2 />}
          {currentStop === 'EchoingCave2' && <StopScene_EchoingCave2 />}
        </>
      )}
      
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${currentMap === 'map1' ? map1Background : map2Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Ambient animations - drifting clouds */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute bg-white opacity-20 rounded-full"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${50 + Math.random() * 100}px`,
              top: `${10 + Math.random() * 30}%`,
              left: `-200px`,
            }}
            animate={{
              x: ['0vw', '100vw'],
              opacity: [0, 0.1, 0.2, 0.1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 40,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Header with story text - moved to upper left */}
      <motion.div
        className="absolute top-6 left-6 z-100 max-w-2xl w-full bg-gray-900 bg-opacity-70 rounded-lg p-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex items-center mb-2">
          <motion.img
            src={trophyImage}
            alt="Trophy"
            className="w-8 h-8 mr-3"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 
            }}
          />
          <h1 className="text-yellow-400 font-pixel text-2xl text-shadow-sm">THE DRAGON'S JOURNEY HOME</h1>
        </div>
        <p className="text-white font-semibold text-shadow-sm">
          Our majestic lost dragon <span className="text-yellow-300 font-pixel">{dragonInfo.name}</span> from <span className="text-yellow-300 font-pixel">{dragonInfo.origin}</span> is ready 
          to start its adventure to your home. However, there's a catch — this extraordinary journey will cross 
          a mystical forest inhabited by treacherous monsters that will stop at nothing to prevent this epic reunion!
        </p>
      </motion.div>

      {/* Map with locations - no paths */}
      <div className="absolute inset-0 z-15">
        {/* Render map locations */}
        {locations.map((location) => (
          <motion.div
            key={location.id}
            className="absolute cursor-pointer"
            style={{
              left: location.position.x,
              bottom: location.position.y,
              width: location.width,
              height: location.height,
              zIndex: 20,
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleLocationClick(location.id)}
          >
            <div className="relative flex items-center justify-center" style={{ width: '130px', height: '130px' }}>
              <img
                src={location.image}
                alt={location.name}
                className="w-auto h-auto max-w-full max-h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.5))',
                  borderRadius: '25%',
                  overflow: 'hidden',
                }}
              />
              {/* Soft glow for active locations */}
              {location.isActive && (
                <div 
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '25%',
                  }}
                />
              )}
              {/* Completion indicator */}
              {location.isCompleted && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            {/* Improved wooden mystic themed text box - positioned at consistent distance */}
            <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-auto min-w-[180px]">
              <div 
                className="relative px-4 py-1 text-center"
                style={{
                  background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' rx='4' fill='%23734A25' /><rect x='4' y='4' width='92' height='92' rx='2' fill='%238C5B30' /><rect x='7' y='7' width='86' height='86' rx='1' fill='%23A36E3E' /><path d='M0 0 L100 0 L100 100 L0 100 Z' stroke='%23523520' stroke-width='6' fill='none' /><circle cx='10' cy='10' r='2' fill='%23523520' /><circle cx='90' cy='10' r='2' fill='%23523520' /><circle cx='10' cy='90' r='2' fill='%23523520' /><circle cx='90' cy='90' r='2' fill='%23523520' /></svg>")`,
                  backgroundSize: '100% 100%',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
                  border: '2px solid #523520',
                }}
              >
                {/* Mystic runes/symbols at the edges */}
                <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-amber-300 opacity-70 shadow-md"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-300 opacity-70 shadow-md"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-amber-300 opacity-70 shadow-md"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-amber-300 opacity-70 shadow-md"></div>
                
                <span className="font-pixel text-amber-100 text-sm drop-shadow-md whitespace-nowrap">
                  {location.name}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Dragon at starting point with improved animation - appears simultaneously with stops */}
        <motion.div
          className="absolute"
          style={{
            left: '60px', // Match starting point x
            bottom: '100px', // Match starting point y, slightly adjusted
            zIndex: 90,
            width: '115px',
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: ['0px', '-10px', '0px'],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1 }, // Same delay as stops
            scale: { duration: 0.8, delay: 1 },   // Same delay as stops
            y: {
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
              repeatType: 'reverse',
              delay: 1.5, // Start hover animation after appearing
            }
          }}
        >
          <img
            src={getDragonImage()}
            alt={`${dragonInfo.color} Dragon`}
            className={`${getDragonScale()}`}
            style={{ filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5))' }}
          />
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black opacity-30 rounded-full blur-sm"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
              width: ['16px', '20px', '16px'],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Navigation buttons with functional back button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[200] flex gap-6">
        <motion.button
          className="font-pixel px-5 py-2 text-md relative group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackClick}
          style={{
            background: 'linear-gradient(to bottom, #6B7280, #4B5563)',
            borderRadius: '8px',
            border: '2px solid #1F2937',
            boxShadow: '0 3px 0 #1F2937, inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        >
          <span className="relative z-10 text-white drop-shadow-md">Back</span>
          <motion.div 
            className="absolute inset-0 rounded-md bg-gray-500 -z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
          />
        </motion.button>
        <motion.button
          className="font-pixel px-6 py-2 text-md relative group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            console.log('Start Journey clicked, starting footprint animation');
            setFootprintInfo({
              from: 'start-point',
              to: currentMap === 'map1' ? 'giggling-grove' : 'glowing-lagoon'
            });
          }}
          style={{
            background: 'linear-gradient(to bottom, #CA8A04, #A16207)',
            borderRadius: '8px',
            border: '2px solid #854D0E',
            boxShadow: '0 3px 0 #854D0E, inset 0 1px 0 rgba(255,255,255,0.2)',
            position: 'relative',
            zIndex: 200
          }}
        >
          <span className="relative z-10 text-white drop-shadow-md">Start Journey</span>
          <motion.div 
            className="absolute inset-0 rounded-md bg-yellow-500 -z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Footprint animation on the map */}
      {showFootprints && (
        <div className="absolute inset-0 z-[150] pointer-events-none">
          {getFootprintPath(footprintInfo.from, footprintInfo.to).map((point, i) => {
            // Calculate angle of path
            const angle = Math.atan2(
              getLocationPosition(footprintInfo.to).y - getLocationPosition(footprintInfo.from).y,
              getLocationPosition(footprintInfo.to).x - getLocationPosition(footprintInfo.from).x
            ) * (180/Math.PI);
            
            // Determine if this is a left or right foot
            const isLeftFoot = i % 2 === 0;
            
            // Add side offset to create a more natural walking pattern
            const sideOffset = isLeftFoot ? -12 : 12;
            
            // Calculate position with offset
            const radians = angle * (Math.PI / 180);
            const offsetX = sideOffset * Math.cos(radians + Math.PI/2);
            const offsetY = sideOffset * Math.sin(radians + Math.PI/2);
            
            return (
              <motion.div
                key={`map-footprint-${i}`}
                className="absolute"
                style={{ 
                  left: `${point.x + offsetX}px`, 
                  bottom: `${point.y + offsetY}px`,
                  width: '20px',
                  height: '35px',
                  transformOrigin: 'center',
                  transform: `rotate(${angle + (isLeftFoot ? -20 : 20)}deg)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 1],
                  scale: [0, 1, 1]
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              >
                {/* Inline SVG for footprint - using actual footprint shape */}
                <svg 
                  viewBox="0 0 100 180" 
                  fill="black" 
                  style={{
                    transform: isLeftFoot ? 'scaleX(-1)' : 'none',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <path d="M70,10 Q90,10 90,25 Q90,40 75,50 L60,55 Q40,65 35,80 Q30,95 30,120 Q30,145 25,160 Q20,175 5,175 Q0,170 0,155 Q0,140 10,120 Q15,105 15,80 Q15,55 25,40 Q35,25 50,15 Q60,10 70,10 Z" />
                  <circle cx="80" cy="15" r="8" />
                  <circle cx="90" cy="25" r="6" />
                  <circle cx="95" cy="40" r="5" />
                  <circle cx="95" cy="55" r="5" />
                </svg>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Update footprints to match new starting point position */}
      <div className="absolute z-25 pointer-events-none" style={{ left: '190px', bottom: '185px', zIndex: 22 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.img
            key={`footprint-${i}`}
            src={map1Footsteps}
            alt="Footprint"
            className="w-3 h-3 absolute"
            style={{
              left: `${i * 8}px`,
              top: `${i * 7}px`,
              opacity: 0.7 - (i * 0.15),
              transform: `rotate(${35 + (i * 5)}deg) scale(${0.8 - (i * 0.1)})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 - (i * 0.15) }}
            transition={{ delay: 2 + (i * 0.2), duration: 0.5 }}
          />
        ))}
      </div>

      {/* Additional particle effects */}
      <div className="absolute inset-0 pointer-events-none z-90 overflow-hidden">
        {/* Fireflies/glowing particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(${255}, ${220 + Math.random() * 35}, ${100 + Math.random() * 100}, ${0.6 + Math.random() * 0.4})`,
              boxShadow: `0 0 ${5 + Math.random() * 10}px rgba(255, 220, 150, 0.8)`,
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Enhanced ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {/* Ambient light sources */}
        {locations.map((location) => (
          <motion.div
            key={`ambient-${location.id}`}
            className="absolute rounded-full"
            style={{
              left: location.position.x + location.width/2,
              bottom: location.position.y + location.height/2,
              width: '180px',
              height: '180px',
              background: location.id === 'dragons-home' 
                ? 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(0,0,0,0) 70%)' 
                : location.id === 'shadow-canopy'
                  ? 'radial-gradient(circle, rgba(116,66,179,0.12) 0%, rgba(0,0,0,0) 70%)'
                  : 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
              zIndex: 0,
              transform: 'translate(-50%, -50%)',
              opacity: location.isActive ? 0.8 : 0.4,
            }}
            animate={{
              opacity: location.isActive 
                ? [0.8, 1, 0.8] 
                : [0.4, 0.5, 0.4],
              scale: location.isActive 
                ? [1, 1.05, 1] 
                : [1, 1.02, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random(),
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MapScene; 