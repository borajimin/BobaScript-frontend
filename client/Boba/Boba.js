const directions = ["left", "up", "right", "down"];

class Boba {

  constructor(ctx, x, y, radius, color, cups) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.direction = 2;
    this.count = 0;
    this.directionalMoves = {
      right: () => this.moveRight(),
      left: () => this.moveLeft(),
      up: () => this.moveUp(),
      down: () => this.moveDown()
    };
    this.cups = cups;
  }

  turnRight(){
    this.direction = this.direction + 1 % 4;
  }

  turnLeft(){
    this.direction = this.direction - 1 % 4;
  }

  move() {
    this.count++;
    this.directionalMoves[directions[this.direction]]();
    let x = this.xCoordinate, y = this.yCoordinate;
    setTimeout( () => this.update(x, y), 50 * this.count )
  }

  update(x = this.xCoordinate, y = this.yCoordinate) {
    this.ctx.clear();

    this.cupdate();

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  cupdate() {
    this.cups.map(cup => cup.draw())
  }

  moveRight() {
    if(this.xCoordinate < 3000){
      this.xCoordinate += 3;
    }
  }

  moveLeft() {
    if(this.xCoordinate > 0){
      this.xCoordinate -= 3;
    }
  }

  moveUp() {
    if(this.yCoordinate > 0) {
      this.yCoordinate -= 3;
    }
  }

  moveDown() {
    if(this.yCoordinate < 3000){
      this.yCoordinate += 3;
    }
  }

}

export default Boba;
