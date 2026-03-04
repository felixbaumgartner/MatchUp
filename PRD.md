# MatchUp - Product Requirements Document

## Overview
MatchUp is a browser-based memory/concentration card game where players flip cards to find matching pairs. The goal is to match all pairs in the fewest moves and shortest time possible.

## Game Concept
A grid of face-down cards is presented to the player. Each card has a matching pair hidden somewhere in the grid. The player flips two cards per turn — if they match, the pair stays revealed. If not, both cards flip back face-down. The game ends when all pairs are found.

## Core Gameplay

### Rules
- All cards start face-down on a grid
- Player clicks a card to flip it face-up
- Player clicks a second card to flip it face-up
- If the two cards match, they stay face-up (matched)
- If the two cards don't match, both flip back face-down after a brief delay (~1 second)
- Game ends when all pairs are matched

### Grid Sizes
- **Easy**: 4x4 grid (8 pairs, 16 cards)
- **Medium**: 6x4 grid (12 pairs, 24 cards)
- **Hard**: 6x6 grid (18 pairs, 36 cards)

### Card Themes
- Emojis (default) — animals, food, objects, etc.
- Colors
- Numbers/Letters (for a simpler look)

## Features

### MVP (v1.0)
- Single-player mode
- 4x4 grid with emoji cards
- Flip animation on card click
- Match detection logic
- Move counter (number of turns taken)
- Timer (elapsed time)
- Win screen with stats (moves, time)
- Restart / New Game button
- Card shuffle on each new game

### Nice-to-Have (v1.1+)
- Difficulty selector (Easy / Medium / Hard grid sizes)
- Best score tracking (localStorage)
- Sound effects (flip, match, win)
- Multiple card themes
- Dark mode toggle
- Two-player mode (turn-based, track each player's pairs)

## Tech Stack
- **HTML** — game layout and structure
- **CSS** — card styling, flip animations, responsive grid
- **JavaScript** — game logic, state management, DOM manipulation
- No frameworks — vanilla HTML/CSS/JS for simplicity

## UI Layout

```
┌──────────────────────────────────┐
│          MatchUp                 │
│     Moves: 0    Time: 00:00     │
├──────────────────────────────────┤
│                                  │
│   ┌──┐  ┌──┐  ┌──┐  ┌──┐       │
│   │??│  │??│  │??│  │??│       │
│   └──┘  └──┘  └──┘  └──┘       │
│   ┌──┐  ┌──┐  ┌──┐  ┌──┐       │
│   │??│  │??│  │??│  │??│       │
│   └──┘  └──┘  └──┘  └──┘       │
│   ┌──┐  ┌──┐  ┌──┐  ┌──┐       │
│   │??│  │??│  │??│  │??│       │
│   └──┘  └──┘  └──┘  └──┘       │
│   ┌──┐  ┌──┐  ┌──┐  ┌──┐       │
│   │??│  │??│  │??│  │??│       │
│   └──┘  └──┘  └──┘  └──┘       │
│                                  │
├──────────────────────────────────┤
│        [ New Game ]              │
└──────────────────────────────────┘
```

## Win Screen
When all pairs are matched, display:
- "You Win!" message
- Total moves taken
- Total time elapsed
- "Play Again" button

## Card Behavior
- **Idle**: Face-down, shows card back design
- **Flipped**: Face-up, shows emoji/symbol with a flip animation
- **Matched**: Face-up permanently, slightly dimmed or highlighted
- **Locked**: During the reveal delay (when two non-matching cards are shown), no other cards can be clicked

## Success Metrics
- Game loads and is playable in under 2 seconds
- Smooth card flip animations (CSS transitions)
- Works on desktop and mobile browsers
- Clean, intuitive UI — no instructions needed
