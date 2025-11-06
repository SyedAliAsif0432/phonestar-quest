import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TitleScene, IntroScene, DragonInfoScene, Scene1, MapScene, StopScene_GigglingGrove, StopScene_SparklingStream, StopScene_MysticFalls, StopScene_GlowbugGlade, StopScene_ShadyCanopy, GameOverScene, StopScene_StormyShoals, StopScene_SkybridgeArchipelago } from './scenes';
import { useDragonStore } from './store/dragonStore';
import './App.css';

function App() {
  const { gameOver } = useDragonStore();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TitleScene />} />
          <Route path="/intro" element={<IntroScene />} />
          <Route path="/dragon-info" element={<DragonInfoScene />} />
          <Route path="/scene1" element={<Scene1 />} />
          <Route path="/map" element={<MapScene />} />
          <Route path="/giggling-grove" element={<StopScene_GigglingGrove />} />
          <Route path="/sparkling-stream" element={<StopScene_SparklingStream />} />
          <Route path="/mystic-falls" element={<StopScene_MysticFalls />} />
          <Route path="/glowbug-glade" element={<StopScene_GlowbugGlade />} />
          <Route path="/shady-canopy" element={<StopScene_ShadyCanopy />} />
          <Route path="/stormy-shoals" element={<StopScene_StormyShoals />} />
          <Route path="/skybridge-archipelago" element={<StopScene_SkybridgeArchipelago />} />
          <Route path="/game-over" element={<GameOverScene />} />
          {/* Redirect to game over if gameOver is true */}
          {gameOver && <Route path="*" element={<Navigate to="/game-over" replace />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
