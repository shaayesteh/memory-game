# Memory Game 🎮

A fun and interactive card-flipping memory game built with React!
Based on the course [Build a Memory Game in React](https://scrimba.com/memory-game-in-react-c0a3odsk39) from Scrimba.

🎮 Live Demo: memory-game-sand-tau.vercel.app

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)

- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Project Description

This project is a classic memory game where players flip pairs of cards and try to match them. When two cards with the same image are flipped, they stay face up; otherwise they flip back down. The goal is to match all the cards in as few moves as possible.

---

## Features

- Flip cards to reveal images
- Match pairs of cards
- Responsive layout for desktop and mobile
- Smooth animations for card flipping
- Restart game functionality

---

## Tech Stack

- **React** — for building the user interface
- **JavaScript (ES6+)** — core language
- **CSS / SCSS** — styling and animations

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or newer)
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd memory-game
npm install
```

### Running the App

```bash
npm start
```

This will start the development server. Open `http://localhost:3000` in your browser to view the game.

---

## How to Play

1. Click a card to flip it and reveal the image.
2. Click a second card to flip it.

   - If the two flipped cards match, they remain open.
   - If they don’t match, they flip back down after a short delay.

3. Continue until all pairs are matched.
4. Your score is based on the number of moves you take — try to beat your best!

---

## Project Structure

```
/src
  /components     # Reusable components (Card, Board, Scoreboard, etc.)
  /assets         # Image assets for the cards
  /styles         # CSS or SCSS files
  App.tsx         # Main application component
  index.ts        # Entry point
```

---

## Future Enhancements

- Add difficulty levels (e.g., 4×4, 6×6 grid)
- Add timer and best time tracking
- Add themes or card sets (animals, sports, icons)
- Add sound effects on match or mismatch
- Add multiplayer or turn-based mode

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please ensure your code follows consistent style & includes meaningful comments.

---

Let’s have fun and boost your memory 💡🎉
