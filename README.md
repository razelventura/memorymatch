# Memory Match


Mobile App Devt (CIT2269)  
Assignment 4  
Author: Razel Ventura, s0541328  
Date: March 29, 2024  
//.readme  
Brief: An explanation of the thinking process / considerations for the Memory Match game.  

## DIFFICULTY LEVELS


Easy - 4 pairs of cards


Intermediate - 6 pairs of cards


Difficult - 10 pairs of cards

## CELL ACTIONS

Tap to reveal a card


## WIN CONDITIONS
Win - all matches are revealed

## SCORE CALCULATION
The scores are based on time and # of matches made. 


**Time Score**

There is a base score of 500. 1point is deducted from this for every second elapsed.


**Match Score** 

For every correctly matched pair, the player gets 50 points. Therefore, increasing the difficulty also increases the possible points to earn.


## LOGIC
The cards are randomly shuffled every new game. The first press will reveal a card, if the second press matches the card, they will both remain revealed; else, they will both be returned to their unflipped state.

## OTHERS
The phone will vibrate for 200ms when a match is made.  

A sound effect plays when a user wins.  

The game state (difficulty level and high score) is saved.   

## NOTE TO STEPHEN
This was only tested on iOS.   
I was granted extension on the deadline due to medical reasons.
