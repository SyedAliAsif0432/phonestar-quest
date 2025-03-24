# Phonster Quest: A Dragon's Journey

A pixel art adventure game featuring a red dragon protagonist, built with React and styled with Tailwind CSS.

## Features

- Retro-style pixel art visuals
- Full-screen responsive design
- Interactive UI elements
- Scene-based architecture for game progression

## Project Structure

The project follows a modular architecture:

- `src/scenes/`: Contains all game scenes (TitleScene, GameScene, etc.)
- `src/assets/`: Contains images, sounds, and other static assets
- `src/components/`: Reusable UI components

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/phonster-quest.git

# Navigate to the project directory
cd phonster-quest

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Game Controls

- Arrow keys for movement
- Spacebar for actions
- ESC to pause

## Scene Architecture

1. **Title Scene**: Welcome screen with game title and options
2. **Game Scene**: Main gameplay area
3. **Game Over Scene**: Displayed when the player loses
4. **Victory Scene**: Displayed when the player wins

## Planned Features

- [ ] Isometric tilemap
- [ ] Interactive decision tree for story progression
- [ ] Multiple levels with increasing difficulty
- [ ] In-game collectibles
- [ ] Inventory system

## License

MIT
