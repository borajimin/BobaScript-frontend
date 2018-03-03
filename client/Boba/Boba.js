class Boba {
  constructor(ctx, x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.ctx.translate((x - 100) * -1, (y - 100) * -1)
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
}

export default Boba;
