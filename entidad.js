import { objeto } from './objeto.js';

export class entidad extends objeto {

    constructor(x, y, w, h, v, image, vida) {
        super(x, y, w, h, v, image,);
        this.vida = vida;
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