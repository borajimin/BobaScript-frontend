const directions = ["left", "up", "right", "down"];

class Boba {

  constructor(ctx, x, y, radius, color) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.direction = 2;
    this.directionalMoves = {
      right: () => this.moveRight(),
      left: () => this.moveLeft(),
      up: () => this.moveUp(),
      down: () => this.moveDown()
    };
  }

  turnRight(){
    this.direction = this.direction + 1 % 4;
  }

  turnLeft(){
    this.direction = this.direction - 1 % 4;
  }

  move() {
    this.directionalMoves[directions[this.direction]]();
    this.update();
  }

  update() {
    this.ctx.beginPath();
    this.ctx.arc(this.xCoordinate, this.yCoordinate, this.radius, 0, 2*Math.PI);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  moveRight() {
    if(this.xCoordinate < 3000){
      this.xCoordinate += 7;
    }
  }

  moveLeft() {
    if(this.xCoordinate > 0){
      this.xCoordinate -= 7;
    }
  }

  moveUp() {
    if(this.yCoordinate > 0) {
      this.yCoordinate -= 7;
    }
  }

  moveDown() {
    if(this.yCoordinate < 3000){
      this.yCoordinate += 7;
    }
  }
}

export default Boba;
