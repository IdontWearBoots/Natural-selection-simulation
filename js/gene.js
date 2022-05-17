/**
 * @param {number} start
 * @param {number} stop
 */
function randInt(start, stop) {
    return Math.floor(Math.random() * (stop - start)) + start;
}

class Gene {
    /**
     * @param {number} x 
     * @param {number} y
     * @param {number} i
    */  
    constructor (x = 0, y = 0, i = 0, col = "black") {
        this.geneX = x;
        this.geneY = y;
        this.geneIntensity = i;
        this.geneColor = col;
    }

    static random() {
        return new Gene(-Math.random(), Math.random() * 50 - 1, Math.random() * 10);
    }

    /**
     * 
     * @param {Gene} a gene to mutate
     * @param {number} prob probability of mutating
     */
    static mutate(a, prob) {

        // genes before possible mutation
        let bM = Object.values(a);

        // add some random value if mutate
        a.geneX += Math.random() < prob ?
            randInt(-1, randInt(0, 5)) * Math.random() * 10 : 0;
        a.geneY += Math.random() < prob ?
            randInt(-1, randInt(0, 5)) * Math.random() * 10 : 0;
        a.geneIntensity += Math.random() < prob ?
            randInt(-1, randInt(0, 5)) * Math.random() * 5 : 0;

        // if the genes have mutated in any way, color is red
        if(a.geneX != bM[0] || a.geneY != bM[1] || a.geneIntensity != bM[2]){
            a.geneColor = "red";
        }

        return a;
    }

    /**
     * @param {Gene} a genes of parent a
     * @param {Gene} b genes of parent b
     * @param {number} outcomes amount of mixed genes
     */
    static mix(a, b, outcomes = 1){
        // combine genes into ${outcomes} outcomes
        let out = new Array(outcomes);
        for(let i = 0; i < outcomes; i++){
            out[i] = new Gene(
                (a.geneX + b.geneX) / 2,
                (a.geneY + b.geneY) / 2,
                (a.geneIntensity + b.geneIntensity) / 2,
                a.geneColor === "red" || b.geneColor === "red" ? "blue" : "black"
            )
        }
        return out;
    }
}
