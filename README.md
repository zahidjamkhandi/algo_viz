# algo_viz

> High-Performance Algorithm Visualization Platform

An interactive algorithm visualization platform demonstrating algorithm execution, complexity, and internal state transitions through synchronized animations. Built with React, TypeScript, Vite, and featuring a premium NVIDIA-inspired design system.

## Features

- **Real-Time Execution Tracking**: Every algorithm step synchronized to a unified clock, making complexity differences visually apparent
- **Multiple Sorting Algorithms**: Bubble Sort, Insertion Sort, Quick Sort, and Merge Sort
- **Custom Dataset Input**: Test algorithms with your own data or generate random arrays
- **Variable Speed Controls**: Adjust animation speed from 0.5x to 4x
- **State Visualization**: Color-coded bar chart showing comparisons, swaps, overwrites, and pivot selections
- **Emergency Reset**: Instantly stop animations and restore original state
- **Premium Dark Theme**: NVIDIA-inspired design with neon green accents and glowing effects

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **SCSS Modules** - Component-scoped styling
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── algos/
│   └── sorting/
│       ├── bubbleSort.ts      # Bubble sort implementation
│       ├── insertionSort.ts   # Insertion sort implementation
│       ├── quickSort.ts       # Quick sort implementation
│       ├── mergeSort.ts       # Merge sort implementation
│       └── types.ts           # Shared types and algorithm info
├── components/
│   ├── AlgorithmSelector.*    # Algorithm selection UI
│   ├── ArrayInput.*           # Custom dataset input
│   ├── BarChart.*             # Visualization canvas
│   └── SpeedControl.*         # Animation speed controls
├── hooks/
│   └── useSortingVisualizer.ts # State management hook
├── pages/
│   ├── LandingPage.*          # Home page
│   └── SortingVisualizer.*    # Main visualizer workspace
├── App.tsx                     # Root component with routing
├── main.tsx                    # Application entry point
└── index.css                   # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd algo_viz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Architecture

### Algorithm Design

Algorithms are completely independent from rendering:

1. **Algorithm Layer**: Pure functions that accept `ReadonlyArray<number>` and return `AnimationStep[]`
2. **Animation Engine**: Processes animation steps with unified timing
3. **Playback Engine**: Manages state transitions and timeout scheduling
4. **React State**: Reactive state management with custom hooks
5. **UI Layer**: Presentation components that render current state

### Animation Model

Each algorithm generates a sequence of animation steps:

- **Compare**: Highlights elements being compared (amber)
- **Swap**: Swaps two elements with visual transition (neon green)
- **Overwrite**: Overwrites element value (used in merge sort, neon green)
- **Pivot**: Marks pivot element in quick sort (crimson red)

### Timing System

All algorithms use a unified 40ms base delay per step. Speed multipliers (0.5x to 4x) adjust this delay proportionally, ensuring that complexity differences emerge naturally from operation count rather than varied timing.

## Design System

### Color Palette

- **NVIDIA Green**: `#76B900` - Primary accent color
- **Deep Black**: `#000000` - Background
- **Charcoal**: `#0A0A0A` - Card backgrounds
- **Border Gray**: `#2A2A2A` - Borders and dividers
- **Text Gray**: `#9CA3AF` - Secondary text
- **Text Light**: `#E5E7EB` - Primary text

### Visual Effects

- Neon glow shadows on active elements
- Hardware-accelerated transitions
- Gradient backgrounds on cards
- Crisp borders with subtle highlights

## Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader compatible

## Performance Optimizations

- Memoized calculations for max values
- Efficient timeout management with cleanup
- Hardware-accelerated CSS transitions
- Minimal re-renders through proper state design

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

- Path Finding Visualizer
- Searching Visualizer
- Additional sorting algorithms
- Algorithm comparison mode
- Export animations as video

## License

MIT

## Acknowledgments

Design inspired by NVIDIA's developer tools and premium workstation interfaces.
