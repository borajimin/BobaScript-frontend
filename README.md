# BobaScript-frontend

# BobaScript Documentations

BobaScript (BS) is a lightweight interpreted or JIT-compiled programming language.
While it is most well-known as the scripting language for Horizons tests, many
non-browser environments might not use it. BobaScript is a prototype-based,
multi-paradigm, dynamic language, supporting object-oriented programming.
It does absolutely nothing other than move a boba around the canvas.

BobaScript has two classes, and Cups. Each class has properties and methods

Properties can be accessed through the keyword 'of'.
Methods can be accessed through the keyword 'will'.

# Boba Class
Properties:
value: value of Boba
xCoordinate: xCoordinate of Boba
yCoordinate: yCoordinate of Boba

Methods:
move: Boba will move one unit.
turnLeft: Boba will turn to the left.
turnRight: Boba will turn to the right.

# Cup Class
Properties:
left: left coordinate of the cup.
right: right coordinate of the cup.
top: top coordinate of the cup.
bottom: bottom coordinate of the cup.

# Example BobaScript
if xCoordinate of boba > yCoordinate of boba do
  boba will turnLeft
end

while xCoordinate of boba > yCoordinate of boba do
  boba will move
end

finish
