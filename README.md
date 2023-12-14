# Bouncing Ballz - Micro Physics Simulator

## Overview

Bouncing Ballz is a simple web application developed using HTML5 canvas and TypeScript. The objective of the application is to provide users with a realistic physics simulation of bouncing circles. Users can spawn circles by clicking on the screen, and each circle will obey Earth-like gravity, bouncing upon hitting the bottom of the screen with a dampening effect on each bounce until it comes to a stop. Multiple circle instances can coexist on the screen at the same time.

## Technologies Used

- HTML5 Canvas
- TypeScript

## Getting Started

To run the application, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Arno2001/Bouncing-Ball
    ```

2. Open the direction `src` and open `index.html` file in your web browser.

## Usage

- Click anywhere on the screen to spawn a circle.
- Watch as the circle falls under by default Earth-like gravity, bouncing upon hitting the bottom with a dampening effect.
- You can change the gravity by clicking on the planets.
- You can change the color by clicking on the circle under "Ball Color" and selecting the color for the circle.
- You can change the size by clicking on the plus and minus buttons under "Ball Size" and changing the size.

## Code Structure

The code is organized into the following main files:

- `index.html`: The main HTML file containing the canvas element and linking to the necessary scripts.
- `style.css`: CSS file for basic styling.
- `app.ts`: TypeScript file containing the main application logic and defining the physics simulation   for the bouncing circles.
- `app.js`: A JavaScript file compiled from TypeScript.

## Realistic Physics Simulation

The realistic physics simulation is achieved through a simple game loop concept. The `app.ts` file contains a `tick` method that updates the position and velocity of each circle on each frame, ensuring smooth motion regardless of the frame rate. Gravity is applied to simulate by default Earth-like conditions, and a dampening effect is added to the bouncing motion.

## Code Quality

The code is written with a focus on cleanliness, readability, and maintainability. TypeScript is used to enhance code organization and provide type safety. Comments are included where necessary to explain key logic and concepts.


## Contributions

Contributions are welcome! Feel free to open issues or pull requests to enhance the application.
