import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDragonStore } from '../store/dragonStore';

const Scene1: React.FC = () => {
  const navigate = useNavigate();
  const dragonInfo = useDragonStore((state) => state.dragonInfo);

  return (
    <div className="title-scene bg-sky-100 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.div
          className="bg-white p-8 rounded-lg border-4 border-gray-800 max-w-lg w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-pixel text-indigo-900 mb-4">Journey Started!</h1>
          
          <div className="font-mono mb-6">
            <p className="mb-2">Your dragon <span className="font-bold">{dragonInfo.name}</span> is ready for adventure!</p>
            <p className="mb-2">Age: <span className="font-bold">{dragonInfo.age} years</span></p>
            <p className="mb-2">Color: <span className="font-bold">{dragonInfo.color}</span></p>
            <p className="mb-2">Origin: <span className="font-bold">{dragonInfo.origin}</span></p>
          </div>
          
          <motion.button
            onClick={() => navigate('/')}
            className="pixel-btn-primary text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Title
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Scene1; 