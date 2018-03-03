const directions = ["left", "up", "right", "down"];

class Boba {

  constructor(ctx, x, y, radius, color) {
    this.x = x;
    this.y = y;
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
    this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  moveRight() {
    if(this.x < 3000){
      this.x += 7;
    }
  }

  moveLeft() {
    if(this.x > 0){
      this.x -= 7;
    }
  }

  moveUp() {
    if(this.y > 0) {
      this.y -= 7;
    }
  }

  moveDown() {
    if(this.y < 3000){
      this.y += 7;
    }
  }
}

export default Boba;
