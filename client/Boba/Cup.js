// const SHAPES = ["ninjaStar", "triangle", "parallelogram", "trapezoid", "star", "octagon", "hexagon", "pentagon", "diamond", "ellipse"];
const COLORS = ["red", "blue", "green", "pink", "lightpink", "yellow", "lightblue", "dodgerblue", "purple"];
const randomColor = () => {
  let rand = Math.floor(Math.random() * Math.floor(COLORS.length));
  return COLORS[rand];
}
class Cup {
  constructor(ctx, top, bottom, left, right, value, color) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.value = (!value) ? 0 : value;
    this.color = (!color) ? randomColor() : color;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.left, this.top, this.right - this.left, this.bottom - this.top);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

}

export default Cup;
