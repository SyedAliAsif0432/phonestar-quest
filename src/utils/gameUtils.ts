import { useDragonStore } from '../store/dragonStore';
import { useNavigate } from 'react-router-dom';

export const handlePhishingChoice = (field: 'name' | 'age' | 'origin', nextStop: string) => {
  const { 
    setLeaks, 
    setLastLeakedField, 
    setCurrentStop, 
    setGameOver,
    leaks,
    dragonInfo 
  } = useDragonStore.getState();

  // Update leaks and last leaked field
  const updatedLeaks = { ...leaks, [field]: true };
  setLeaks(updatedLeaks);
  setLastLeakedField(field);

  // Count total leaks
  const totalLeaks = Object.values(updatedLeaks).filter(Boolean).length;

  // If all info is leaked, trigger game over immediately
  if (totalLeaks >= 3) {
    setGameOver(true);
    setCurrentStop('GameOverScene');
    return;
  }

  // Otherwise proceed to next stop
  setCurrentStop(nextStop);
};

export const getPhishingPrompt = () => {
  const { lastLeakedField, dragonInfo } = useDragonStore.getState();
  
  switch (lastLeakedField) {
    case "name":
      return `I overheard echoes whispering the dragon's name... ${dragonInfo.name}. `;
    case "age":
      return `Someone said the echoes speak of a ${dragonInfo.age}-year-old dragon. `;
    case "origin":
      return `Legends echo in here about a dragon from ${dragonInfo.origin}. `;
    default:
      return "";
  }
}; 