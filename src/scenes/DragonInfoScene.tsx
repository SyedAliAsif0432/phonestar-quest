import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';
import cloudImage from '../assets/images/cloud.png';
import treeImage from '../assets/images/tree.png';
import grassImage from '../assets/images/grass.png';
import dragonInfoBgImage from '../assets/images/dragon_info.png';
import redDragonImage from '../assets/images/dragons/red-dragon.png';
import blueDragonImage from '../assets/images/dragons/blue-dragon.png';
import greenDragonImage from '../assets/images/dragons/green-dragon.png';
import orangeDragonImage from '../assets/images/dragons/orange-dragon.png';
import purpleDragonImage from '../assets/images/dragons/purple-dragon.png';
import blackDragonImage from '../assets/images/dragons/black-dragon.png';
import './TitleScene.css'; // Reuse existing styling

// List of countries for autocomplete
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const DragonInfoScene: React.FC = () => {
  const navigate = useNavigate();
  const setDragonInfo = useDragonStore((state) => state.setDragonInfo);
  
  // Form state
  const [name, setName] = useState('');
  const [age, setAge] = useState(2);
  const [origin, setOrigin] = useState('');
  const [color, setColor] = useState<'Red' | 'Blue' | 'Green' | 'Orange' | 'Purple' | 'Black'>('Red');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter countries based on current input
  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(country => 
      country.toLowerCase().includes(origin.toLowerCase())
    ).slice(0, 5); // Show top 5 matches
  }, [origin]);

  // Get dragon image based on color
  const getDragonImage = () => {
    switch (color) {
      case 'Red': return redDragonImage;
      case 'Blue': return blueDragonImage;
      case 'Green': return greenDragonImage;
      case 'Orange': return orangeDragonImage;
      case 'Purple': return purpleDragonImage;
      case 'Black': return blackDragonImage;
      default: return redDragonImage;
    }
  };

  // Get scale based on age
  const getDragonScale = () => {
    if (age <= 5) return 'scale-75';
    if (age > 5 && age <= 20) return 'scale-100';
    if (age > 20 && age <= 40) return 'scale-115';
    return 'scale-125';
  };

  // Get dragon age category
  const getDragonAgeCategory = () => {
    if (age <= 5) return 'baby';
    if (age > 5 && age <= 12) return 'young';
    if (age > 12 && age <= 20) return 'adult';
    if (age > 20 && age <= 40) return 'elder';
    return 'ancient';
  };

  // Get additional aging effects based on the dragon's age
  const getAgingEffects = () => {
    const category = getDragonAgeCategory();
    
    switch(category) {
      case 'baby':
        return {
          filter: 'brightness(1.2) saturate(1.3)',
          transform: 'rotate(-5deg)',
          opacity: 0.95
        };
      case 'young':
        return {
          filter: 'brightness(1.1) saturate(1.1)',
          transform: 'rotate(-2deg)',
          opacity: 0.98
        };
      case 'adult':
        return {
          filter: 'brightness(1) saturate(1)',
          transform: 'rotate(0deg)',
          opacity: 1
        };
      case 'elder':
        return {
          filter: 'brightness(0.9) contrast(1.1) saturate(0.9)',
          transform: 'rotate(3deg)',
          opacity: 0.95
        };
      case 'ancient':
        return {
          filter: 'brightness(0.8) contrast(1.3) saturate(0.7) sepia(0.2)',
          transform: 'rotate(5deg)',
          opacity: 0.9
        };
      default:
        return {
          filter: 'brightness(1) saturate(1)',
          transform: 'rotate(0deg)',
          opacity: 1
        };
    }
  };

  // Get animation properties based on age
  const getAgeAnimation = () => {
    const category = getDragonAgeCategory();
    
    switch(category) {
      case 'baby':
        // Baby dragons move erratically and playfully
        return { 
          y: ["0px", "-15px", "-5px", "-12px", "0px"],
          rotate: ["-5deg", "5deg", "-3deg", "3deg", "-5deg"],
          scale: [1, 1.08, 1.03, 1.06, 1],
          duration: 3,
        };
      case 'young':
        // Young dragons move energetically with lightning-like movements
        return { 
          y: ["0px", "-12px", "-2px", "-8px", "0px"],
          rotate: ["-2deg", "3deg", "-1deg", "2deg", "-2deg"],
          scale: [1, 1.05, 1.02, 1.04, 1],
          duration: 2.5,
        };
      case 'adult':
        // Adult dragons move confidently and smoothly
        return { 
          y: ["0px", "-10px", "0px"],
          rotate: ["0deg", "1deg", "0deg"],
          duration: 2,
        };
      case 'elder':
        // Elder dragons move deliberately with more weight
        return { 
          y: ["0px", "-7px", "0px"],
          rotate: ["0deg", "2deg", "0deg"],
          scale: [1, 1.02, 1],
          duration: 3,
        };
      case 'ancient':
        // Ancient dragons move very slowly with mystical presence
        return { 
          y: ["0px", "-5px", "0px"],
          rotate: ["0deg", "3deg", "0deg"],
          scale: [1, 1.03, 1],
          duration: 4,
        };
      default:
        return { 
          y: ["0px", "-10px", "0px"],
          duration: 2,
        };
    }
  };

  // Get dragon color description
  const getDragonColorDescription = () => {
    switch (color) {
      case 'Red':
        return "Fierce and passionate with a fiery temperament. Known for powerful flame breath.";
      case 'Blue':
        return "Calm and intellectual with control over water. Prefers strategy over brute force.";
      case 'Green':
        return "Connected to nature and earth magic. Healing abilities and protective instincts.";
      case 'Orange':
        return "Energetic and charismatic with solar affinity. Radiates warmth and inspiration.";
      case 'Purple':
        return "Mystical and enigmatic with psychic abilities. Master of arcane magic.";
      case 'Black':
        return "Rare and powerful with shadow manipulation. Commands respect and fear.";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with dragon info:', { name, age, origin, color });
    
    // Set the dragon info in the store
    setDragonInfo({
      name,
      age,
      origin,
      color,
    });
    
    console.log('Navigating to /map');
    navigate('/map');
  };

  const handleSelectCountry = (country: string) => {
    setOrigin(country);
    setShowSuggestions(false);
  };

  // Navigate back to intro screen
  const handleBackClick = () => {
    navigate('/intro');
  };

  // Create ground tiles with slight overlap to prevent cracks
  const groundTiles = Array.from({ length: 15 }).map((_, index) => ({
    left: `${index * 6.5}%`,
    delay: 0.05 * index
  }));

  // Get background color based on dragon color for contrast
  const getDragonBgColor = () => {
    switch (color) {
      case 'Red': return 'bg-blue-100';
      case 'Blue': return 'bg-yellow-50';
      case 'Green': return 'bg-purple-50';
      case 'Orange': return 'bg-blue-50';
      case 'Purple': return 'bg-amber-50';
      case 'Black': return 'bg-gray-100';
      default: return 'bg-blue-100';
    }
  };

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

      {/* Trees on left and right */}
      <motion.div 
        className="absolute bottom-16 left-16 w-32 h-48 bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${treeImage})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      />
      
      <motion.div 
        className="absolute bottom-16 right-16 w-32 h-48 bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${treeImage})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
      />

      {/* Ground - using multiple overlapping tiles */}
      <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden z-10">
        {groundTiles.map((tile, index) => (
          <motion.div 
            key={index}
            className="absolute bottom-0 h-24"
            style={{
              left: tile.left,
              width: '8%',
              backgroundImage: `url(${grassImage})`,
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

      {/* Main content container - moved up slightly to avoid overlap with ground */}
      <div className="flex flex-col items-center justify-center h-screen px-4 pb-28 relative z-20">
        {/* Dragon info card */}
        <motion.div 
          className="pixel-card relative max-w-3xl w-full bg-cream-100 border-4 border-gray-800 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            backgroundImage: `url(${dragonInfoBgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            imageRendering: 'pixelated',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
        >
          <div className="bg-teal-500 text-center py-3 px-4 rounded mb-6 border-2 border-gray-800">
            <h1 className="text-gray-900 text-2xl font-pixel">ENTER YOUR DRAGON'S INFO</h1>
          </div>

          <div className="font-pixel text-center text-xl mb-8 text-indigo-900">
            INFORMATION ABOUT YOUR DRAGON
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-yellow-200 p-4 rounded flex items-center">
                <label className="font-mono text-gray-800 font-bold w-32">NAME:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-yellow-100 border-2 border-yellow-400 px-3 py-2 font-mono"
                  required
                />
              </div>

              <div className="bg-yellow-200 p-4 rounded flex items-center">
                <label className="font-mono text-gray-800 font-bold w-32">AGE:</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="flex-1 bg-yellow-100 border-2 border-yellow-400 px-3 py-2 font-mono"
                  required
                />
                <span className="ml-2 font-mono font-bold">YR</span>
              </div>

              <div className="bg-yellow-200 p-4 rounded flex items-center">
                <label className="font-mono text-gray-800 font-bold w-32">COLOR:</label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value as any)}
                  className="flex-1 bg-yellow-100 border-2 border-yellow-400 px-3 py-2 font-mono"
                  required
                >
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Orange">Orange</option>
                  <option value="Purple">Purple</option>
                  <option value="Black">Black</option>
                </select>
              </div>

              <div className="bg-yellow-200 p-4 rounded flex flex-col relative">
                <div className="flex items-center">
                  <label className="font-mono text-gray-800 font-bold w-32">ORIGIN:</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => {
                      setOrigin(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="flex-1 bg-yellow-100 border-2 border-yellow-400 px-3 py-2 font-mono"
                    placeholder="Type to search countries"
                    required
                  />
                </div>
                {showSuggestions && origin.length > 0 && (
                  <div className="absolute top-full left-32 right-4 bg-white border-2 border-yellow-400 rounded overflow-y-auto max-h-32" style={{ zIndex: 1000 }}>
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <div
                          key={country}
                          className="px-3 py-1 hover:bg-yellow-100 cursor-pointer font-mono text-sm"
                          onClick={() => handleSelectCountry(country)}
                          onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing too soon
                        >
                          {country}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-1 text-gray-500 font-mono text-sm">No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <motion.button
                  type="button"
                  onClick={handleBackClick}
                  className="font-pixel px-6 py-3 text-lg relative group w-1/3"
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
                  <span className="relative z-10 text-white drop-shadow-md">Back</span>
                  <motion.div 
                    className="absolute inset-0 rounded-xl bg-gray-500 -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  type="submit"
                  className="font-pixel px-8 py-3 text-lg relative group w-2/3"
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
                  <span className="relative z-10 text-white drop-shadow-md">Start Journey</span>
                  <motion.div 
                    className="absolute inset-0 rounded-xl bg-yellow-500 -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                  />
                </motion.button>
              </div>
            </form>

            {/* Dragon preview with contrasting background */}
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 text-center font-pixel text-lg">Your Dragon</div>
              <div className={`relative h-64 w-64 flex items-center justify-center rounded-lg ${getDragonBgColor()} p-4 border-2 border-gray-300 overflow-hidden`}>
                {/* Age-specific background effects */}
                {getDragonAgeCategory() === 'ancient' && (
                  <motion.div 
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.1, 0.3, 0.1],
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8,
                      ease: "easeInOut" 
                    }}
                    style={{
                      background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'2\' height=\'10\' x=\'10\' y=\'10\' fill=\'%23AAAACC\'/><rect width=\'2\' height=\'10\' x=\'30\' y=\'20\' fill=\'%23AAAACC\'/><rect width=\'2\' height=\'10\' x=\'50\' y=\'30\' fill=\'%23AAAACC\'/><rect width=\'2\' height=\'10\' x=\'70\' y=\'40\' fill=\'%23AAAACC\'/><rect width=\'2\' height=\'10\' x=\'90\' y=\'50\' fill=\'%23AAAACC\'/></svg>")',
                      backgroundSize: '100px 100px',
                    }}
                  />
                )}
                
                {getDragonAgeCategory() === 'elder' && (
                  <motion.div 
                    className="absolute inset-0 z-0 opacity-20"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(0,0,0,0) 70%)'
                    }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut" 
                    }}
                  />
                )}
                
                {getDragonAgeCategory() === 'young' && (
                  <motion.div 
                    className="absolute inset-0 z-0 opacity-20"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(200,255,255,0.3) 50%, rgba(255,255,255,0) 100%)'
                    }}
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut" 
                    }}
                  />
                )}
                
                {getDragonAgeCategory() === 'baby' && (
                  <motion.div 
                    className="absolute inset-0 z-0 opacity-10"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(100,200,255,0.4) 0%, rgba(0,0,0,0) 70%)'
                    }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut" 
                    }}
                  />
                )}
                
                {/* Age-specific decorative elements - added outside the motion.div */}
                {getDragonAgeCategory() === 'ancient' && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                    {/* Ancient mist/rain particles */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={`rain-${i}`}
                        className="absolute bg-white opacity-50 w-px"
                        style={{
                          left: `${5 + i * 5}%`,
                          height: `${Math.random() * 10 + 5}px`,
                          top: `-20px`,
                        }}
                        animate={{
                          y: ['0%', '130%'],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: 'linear',
                        }}
                      />
                    ))}
                    <motion.div 
                      className="absolute bottom-2 left-2 w-5 h-5"
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'><path d=\'M5,10 Q10,5 15,10 T25,10\' stroke=\'%23654321\' fill=\'none\'/></svg>")',
                        backgroundRepeat: 'no-repeat'
                      }}
                      animate={{ opacity: [0.6, 0.8, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                )}
                
                {getDragonAgeCategory() === 'young' && (
                  <motion.div 
                    className="absolute top-4 right-4 w-8 h-14 opacity-0 z-20 pointer-events-none"
                    style={{ 
                      backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'56\'><path d=\'M15,0 L10,20 L20,24 L12,56 L18,54 L25,30 L16,26 L22,0 Z\' fill=\'%23ffffff\' /></svg>")',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                    }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      rotate: [-5, 5],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 0.3,
                      repeatDelay: 5,
                    }}
                  />
                )}
                
                {getDragonAgeCategory() === 'baby' && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                    {/* Playful bubbles/sparkles for baby */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={`bubble-${i}`}
                        className="absolute rounded-full bg-blue-200 opacity-70"
                        style={{
                          width: `${Math.random() * 8 + 4}px`,
                          height: `${Math.random() * 8 + 4}px`,
                          left: `${20 + Math.random() * 60}%`,
                          bottom: `${20 + Math.random() * 40}%`,
                        }}
                        animate={{
                          y: [0, -30],
                          x: [0, Math.random() * 10 - 5],
                          opacity: [0.7, 0],
                          scale: [1, 0.5],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 5,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Dragon image with age-based effects */}
                <motion.div className="relative z-10 flex items-center justify-center">
                  <motion.img
                    src={getDragonImage()}
                    alt={`${color} Dragon`}
                    className={`dragon-image ${getDragonScale()}`}
                    style={{
                      ...getAgingEffects()
                    }}
                    animate={getAgeAnimation()}
                    transition={{ 
                      repeat: Infinity, 
                      duration: getAgeAnimation().duration,
                      ease: "easeInOut" 
                    }}
                  />
                  
                  {/* Age-specific visual overlays */}
                  {getDragonAgeCategory() === 'ancient' && (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><line x1=\'10\' y1=\'10\' x2=\'20\' y2=\'20\' stroke=\'%23654321\' stroke-width=\'1\'/><line x1=\'80\' y1=\'15\' x2=\'90\' y2=\'25\' stroke=\'%23654321\' stroke-width=\'1\'/><line x1=\'30\' y1=\'40\' x2=\'40\' y2=\'50\' stroke=\'%23654321\' stroke-width=\'1\'/><line x1=\'60\' y1=\'60\' x2=\'70\' y2=\'70\' stroke=\'%23654321\' stroke-width=\'1\'/></svg>")',
                        opacity: 0.4
                      }}
                    />
                  )}
                  
                  {getDragonAgeCategory() === 'young' && (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><path d=\'M30,50 L40,30 L50,50 L60,30\' stroke=\'%23FFFFFF\' stroke-width=\'2\' fill=\'none\'/></svg>")',
                        opacity: 0,
                        mixBlendMode: 'overlay'
                      }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        x: ['-50%', '150%'],
                        y: ['-20%', '120%'],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        repeatDelay: 2,
                      }}
                    />
                  )}
                </motion.div>
                
                {/* Age badges */}
                {name && (
                  <>
                    {getDragonAgeCategory() === 'ancient' && (
                      <div className="absolute top-2 right-2 text-xs font-mono bg-purple-100 px-2 py-1 rounded border border-purple-400 shadow-md">
                        Ancient
                      </div>
                    )}
                    {getDragonAgeCategory() === 'elder' && (
                      <div className="absolute top-2 right-2 text-xs font-mono bg-amber-100 px-2 py-1 rounded border border-amber-400 shadow-md">
                        Elder
                      </div>
                    )}
                    {getDragonAgeCategory() === 'adult' && (
                      <div className="absolute top-2 right-2 text-xs font-mono bg-green-100 px-2 py-1 rounded border border-green-400 shadow-md">
                        Adult
                      </div>
                    )}
                    {getDragonAgeCategory() === 'young' && (
                      <div className="absolute top-2 right-2 text-xs font-mono bg-cyan-100 px-2 py-1 rounded border border-cyan-400 shadow-md">
                        Young
                      </div>
                    )}
                    {getDragonAgeCategory() === 'baby' && (
                      <div className="absolute top-2 right-2 text-xs font-mono bg-blue-100 px-2 py-1 rounded border border-blue-400 shadow-md">
                        Baby
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Only show details if name is filled */}
              {name ? (
                <div className="mt-4 text-center font-mono">
                  <span className="font-medium">{name}</span><br />
                  <span className={getDragonAgeCategory() === 'ancient' ? 'font-bold' : ''}>
                    {age} years old
                  </span>
                  
                  {/* Age category descriptions */}
                  {getDragonAgeCategory() === 'baby' && (
                    <span className="text-blue-600 ml-2">(Baby)</span>
                  )}
                  {getDragonAgeCategory() === 'young' && (
                    <span className="text-cyan-600 ml-2">(Young)</span>
                  )}
                  {getDragonAgeCategory() === 'adult' && (
                    <span className="text-green-600 ml-2">(Adult)</span>
                  )}
                  {getDragonAgeCategory() === 'elder' && (
                    <span className="text-amber-600 ml-2">(Elder)</span>
                  )}
                  {getDragonAgeCategory() === 'ancient' && (
                    <span className="text-purple-600 ml-2">(Ancient)</span>
                  )}
                  
                  {/* Age description */}
                  <div className="mt-2 text-xs max-w-xs text-center">
                    {getDragonAgeCategory() === 'baby' && (
                      <span className="text-blue-600">Playful and innocent. Just beginning to discover their powers.</span>
                    )}
                    {getDragonAgeCategory() === 'young' && (
                      <span className="text-cyan-600">Energetic and in its prime. Full of lightning-quick reflexes.</span>
                    )}
                    {getDragonAgeCategory() === 'adult' && (
                      <span className="text-green-600">Mature and confident. Has mastered their abilities.</span>
                    )}
                    {getDragonAgeCategory() === 'elder' && (
                      <span className="text-amber-600">Wise and powerful. Commands respect from other dragons.</span>
                    )}
                    {getDragonAgeCategory() === 'ancient' && (
                      <span className="text-purple-600">Mysterious and legendary. Possesses ancient, forgotten magic.</span>
                    )}
                  </div>
                  
                  {/* Color description */}
                  <div className="mt-2 text-xs max-w-xs text-center">
                    <div className={`
                      font-semibold mb-1 
                      ${color === 'Red' ? 'text-red-600' : ''} 
                      ${color === 'Blue' ? 'text-blue-600' : ''} 
                      ${color === 'Green' ? 'text-green-600' : ''} 
                      ${color === 'Orange' ? 'text-orange-500' : ''} 
                      ${color === 'Purple' ? 'text-purple-600' : ''} 
                      ${color === 'Black' ? 'text-gray-800' : ''}
                    `}>
                      {color} Dragon Traits
                    </div>
                    <span className={`
                      text-xs 
                      ${color === 'Red' ? 'text-red-700' : ''} 
                      ${color === 'Blue' ? 'text-blue-700' : ''} 
                      ${color === 'Green' ? 'text-green-700' : ''} 
                      ${color === 'Orange' ? 'text-orange-600' : ''} 
                      ${color === 'Purple' ? 'text-purple-700' : ''} 
                      ${color === 'Black' ? 'text-gray-900' : ''}
                    `}>
                      {getDragonColorDescription()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 h-16"></div> // Empty space when no name is entered
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced ground decoration - added below the main content */}
      <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 5 }}>
        {/* Solid ground base with decorative pattern */}
        <div 
          className="w-full h-16" 
          style={{ 
            backgroundImage: `url(${grassImage})`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            imageRendering: 'pixelated',
            backgroundPosition: 'bottom'
          }}
        />
      </div>
    </div>
  );
};

export default DragonInfoScene; 