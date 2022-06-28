class Thing {
    
    /** 
     * @param {number} x initial y position
     * @param {number} y initial x position
     * @param {number} r radius of the "Thing"
     * @param {Genotype} g initial genotype
     */
    constructor(
        x = canvas.width - 55, 
        y = Math.round(Math.random() * canvas.height),
        r = thingSize,
        g = Genotype.random()
    ) {
        // for the line that follows them we save their initial starting pos
        this.start = {
            x: x,
            y: y
        };

        // set attributes to params
        this.x = x;
        this.y = y;
        this.radius = r;
        this.genes = g;

        // for the bouncing on the sides of the board
        // otherwise they continue off into the distance and the client cannot 
        // follow the Thing's movement, used to be negating the actual gene but
        // really isn't actually biologically possible
        this.yMov = 1;
    }

    // move the "Thing" a certain amout depending on their genes
    move() {

        // the "Thing"'s move by n pixels every "movement" corresponding to
        // the value of their gene X or Y multiplied by their intensity gene
        // their movement is an average of their alleles for each gene (hence .avg())
        this.x += this.genes.geneX.avg() * this.genes.geneIntensity.avg();
        this.y += this.genes.geneY.avg() * this.genes.geneIntensity.avg() * this.yMov;

        // they bounce on the horizontal walls
        if(this.y > canvas.height || this.y < 0) {
            // if they hit a wall, inverse their Y gene
            this.yMov = -this.yMov;
        }

        // return the newly modified object (not that useful but hey)
        return this;
    }
    
    draw() {
        // just fill a circle of radius the things radius in its colour
        
        // set the colour
        ctx.fillStyle = this.genes.geneColor;
        
        // draw circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        // then draw a line from their current position to their start position
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.start.x, this.start.y);
        ctx.stroke();
    }

    /**
     * @param {Thing} e a Thing
     * @param {string} col a color
     */
    static drawAt(e, col) {
        // draw a circle of specified colour at a certain "Thing"
        
        // set colour
        ctx.fillStyle = col;
        ctx.strokeStyle = col;

        // draw
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    /**
     * @param {Thing} a parent a
     * @param {Thing} b parent b
     */
    // lol wth am i even supposed to name this function
    static birth(a, b, mutProb){
        // create a new child of parents and set it's genes to be a mix of those
        // of the parents
        let c1 = new Thing();
        c1.genes = Genotype.mix(a.genes, b.genes)[0];
        // then call mutate for possible mutation
        c1.genes.mutate(mutProb);

        // same thing for a second child
        let c2 = new Thing();
        c2.genes = Genotype.mix(a.genes, b.genes)[0];
        c2.genes.mutate(mutProb);
        
        // return both children
        return [c1, c2];
    }
}
