export default class FillRect {
  constructor(_ = {
    x: undefined,
    y: undefined,
    w: 10,
    h: 10,
    fill: "black",
  }) {
    this.pos = {
      x: _.x,
      y: _.y
    };
    this.dim = {
      w: _.w,
      h: _.h
    };
    this.velocity = {
      x: 2,
      y: 2,
      gravity: 0.2,
      friction: 0.8
    };
    this.rotation = 0;
    this.fill = _.fill;
    
    this.isAI = false;
    this.ai = {
      datas: {
        /* Data learned */
      }
    }
  }

  draw(_) {
    _.fillStyle = this.fill;
    _.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
  }

  setDim(_w, _h) {
    this.dim.w = _w;
    this.dim.h = _h;
  }

  setPos(_x, _y) {
    this.pos.x = _x;
    this.pos.y = _y;
  }

  rotateRight() {
    this.rotation += 0.1;
  }
}
