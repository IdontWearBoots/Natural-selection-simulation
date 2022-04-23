class Thing {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} r 
     * @param {Gene} g 
     */
    constructor(
        x = canvas.width - 55, 
        y = Math.round(Math.random() * canvas.height),
        r = thingSize,
        g = Gene.random()
    ) {
        // for the line that follows them
        this.start = {
            x: x,
            y: y
        };

        this.x = x;
        this.y = y;
        this.radius = r;

        this.genes = g;
    }
    move() {

        this.x += this.genes.geneX * this.genes.geneIntensity;
        this.y += this.genes.geneY * this.genes.geneIntensity;

        // they bounce on the horizontal walls
        if(this.y > canvas.height || this.y < 0) {
            this.genes.geneY = -this.genes.geneY;
        }

        ctx.beginPath();
        ctx.strokeStyle = "gray";

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.start.x, this.start.y);
        
        ctx.stroke();

        return this;
    }
    draw() {
        ctx.fillStyle = this.genes.geneColor;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        
        ctx.fill();
    }

    /**
     * @param {Thing} e a Thing
     * @param {string} col a color
     */
    static drawAt(e, col) {
        ctx.fillStyle = col;
        ctx.strokeStyle = col;
        
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);

        ctx.fill();
        ctx.stroke();
    }

    /**
     * @param {Thing} a parent a
     * @param {Thing} b parent b
     */
    // lol wth am i even supposed to name this
    static birth(a, b, mutProb){
        let c1 = new Thing();
        c1.genes = Gene.mutate(Gene.mix(a.genes, b.genes)[0], mutProb);

        let c2 = new Thing();
        c2.genes = Gene.mutate(Gene.mix(a.genes, b.genes)[0], mutProb);
        
        return [c1, c2];
    }
}
