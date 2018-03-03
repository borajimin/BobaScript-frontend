class Boba {

  constructor(ctx, x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.direction = 2;
  }

  moveRight() {
    if(this.x < 3000){
      this.x += 5;
      return this;
    }
  }

  moveLeft() {
    if(this.x > 0){
      this.x -= 5;
      return this;
    }
  }

  moveUp() {
    if(this.y > 0) {
      this.y -= 5;
      return this;
    }
  }

  moveDown() {
    if(this.y < 3000){
      this.y += 5;
      return this;
    }
  }

  turnRight(){
    this.direction = this.direction + 1 % 4;
  }

  turnLeft(){
    this.direction = this.direction - 1 % 4;
  }

  move() {
    let directionalMoves = {
      right: this.moveRight,
      left: this.moveLeft,
      up: this.moveUp,
      down: this.moveDown
    };

    let directions = ["left", "up", "right", "down"];

    this.x = directionalMoves[directions[this.direction]]();
    this.update();

    let date = Date.now();
    while(Date.now() - date < 10){};
  }

  update() {
    // console.log("updating canvas");
    // console.log(this.ctx);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

}

export default Boba;
