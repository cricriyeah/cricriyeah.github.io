 export class objeto {
    constructor(x, y, w, h, v, image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.v = v;
        this.image = image;
    }

    tocando(otro) {
        if (this.x < otro.x + otro.w &&
            this.x + this.w > otro.x &&
            this.y < otro.y + otro.h &&
            this.y + this.h > otro.y) {
            return true;
        }
        return false;
    }

   
}