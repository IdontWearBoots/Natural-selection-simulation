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
    constructor (x = 0, y = 0, i = 0) {
        this.geneX = x;
        this.geneY = y;
        this.geneIntensity = i;
    }

    static random() {
        return new Gene(-Math.random(), Math.random() * 2 - 1, Math.random() * 10);
    }

    /**
     * 
     * @param {Gene} a gene to mutate
     * @param {number} prob probability of mutating
     */
    static mutate(a, prob) {
        a.geneX += Math.random() < prob ?
            randInt(-1, randInt(0, 10)) * Math.random() * 10 : 0;
        a.geneY += Math.random() < prob ?
            randInt(-1, randInt(0, 10)) * Math.random() * 10 : 0;
        a.geneIntensity += Math.random() < prob ?
            randInt(-1, randInt(0, 10)) * Math.random() * 10 : 0;

        return a;
    }

    /**
     * @param {Gene} a genes of parent a
     * @param {Gene} b genes of parent b
     * @param {number} outcomes amount of children
     */
    static mix(a, b, outcomes = 1){
        let out = new Array(outcomes);
        for(let i = 0; i < outcomes; i++){
            out[i] = new Gene(
                (Math.random() >= 0.5 ? a.geneX : b.geneX),
                (Math.random() >= 0.5 ? a.geneY : b.geneY),
                Math.random() >= 0.5 ? a.geneIntensity : b.geneIntensity
            )
        }
        return out;
    }
}
