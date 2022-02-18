#Pseudocode for Bouncing Balls

## Baseline Functionality
    25 balls are generated with random properties (coordinates on page, size, velocities, color). 
    The balls turn around if they encounter the edge of the canvas.
    An animation loop draws the balls.
        The background is cleared every frame with some transparency, giving the balls a trail.
    The balls change color if they collide.

## Stretch Goals
Convert from a function prototype to a Class-based prototype (this is one of the best stretch goals to complete)

Multi-key press, which allows players to move each evil circle at the same time pressing different keys and in a diagonal path (for example, pressing up + left at the same time)

2 players mode (red and green evil circle), WASD, and Arrow Keys for 2 players at once. Keep track of both scores.

Remove the borders so when a ball passes the top of the screen going up, it shows up at the bottom of the screen going the same direction, like asteroids

Instead of changing the color, try showing a counter of how many times a specific ball has touched another ball when 2 balls touch each other

Change the colors for each item type so it's easier to look and see what everything is instead of just random colors

Instead of changing the color, try changing the size when 2 balls touch each other

Instead of circles, try using a different shape or image/icon/emoji you like