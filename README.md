# Math Flash Cards

## This is a simple web-based, mobile-first flash card game for kids learning math. 

### The 4 basic operations (+, -, ×, ÷) are now supported.

The purpose was to provide parents with a flash card game to play with elementary-aged children during COVID-19 quarantine/isolation. This repository can be cloned and run using `npm start`, or may be accessed at http://math-flash-cards.com.

When the page loads for the first time, you will be presented with the first problem, an answer area and 10 numeric buttons. To answer, click the numbered buttons corresponding to the answer, then click the green ➧. If you make a mistake, click the ❌. 

All problems are presented in order, starting with `0 times 0-10`. Once the zeroes are complete, the player is presented with `1 times 0-10`, and so on. Each card is saved to localStorage, which means **that** browser on **that** device will remember your place.

By clicking/tapping the menu button at the top right, the cards can be restarted by clicking/tapping `START OVER`. The cards can be randomized by clicking/tapping `RANDOMIZE`. You may also change the current operation by clicking/tapping its button. This will start the cards over again, and the new operation's deck will not be randomized.

  - ~~Currently only supports Multiplication. More operations to come.~~
  - Addition, Subtraction, Multiplication and Division are currently supported. Change the operation in the menu.
  - What you see was built in an afternoon. I'll keep working on it through the quarantine.