/**
 * @param {number} start lower bound for the final generated values
 * @param {number} stop upper bound for the final generated values
 */
function randInt(start, stop) {
    return Math.floor(Math.random() * (stop - start)) + start;
}

class Gene {
    /**
     * @param {number} p1 parent 1's allele
     * @param {number} p2 parent 2's allele
     */

    constructor(p1 = 0, p2 = 0) {
        // p1 corresponding to the first parent's passed down allele
        // and p2 to the second parent's one
        this.p1 = p1;
        this.p2 = p2;
        // by default set as false
        this.mutated = false;
    }

    /**
     * Get the average of both alleles of the gene
     * @returns {number} average of both alleles
     */
    avg() {
        return (this.p1 + this.p2) / 2;
    }

    /**
     * Negate values of the gene
     * @returns {Gene} the gene with now negated values
     */
    neg() {
        this.p1 = -this.p1;
        this.p2 = -this.p2;
        return this;
    }

    /**
     * selects an allele to pass down
     * @returns {number} allele passe down
     */
    meiosis() {
        return Math.random() >= 0.5 ? this.p1 : this.p2;
    }

    /**
     * Mutate the gene
     * @param {number} prob probability of mutation
     * @returns {boolean} if the gene has mutated or not
     */
    mutate(prob) {
        // the initial values of the gene
        let init = Object.values(this);

        // mutate if the stars align honestly idk why i wrote this as it is
        this.p1 += Math.random() < prob ? randInt(-1, randInt(0, 5)) * Math.random() * 10 : 0;
        this.p2 += Math.random() < prob ? randInt(-1, randInt(0, 5)) * Math.random() * 10 : 0;

        // if values are not the same as the initial values then they have mutated
        // and so mutated status becomes true
        if(this.p1 !== init[0] || this.p2 !== init[1]) {
            this.mutated = true;
        }

        // return if it mutated or not
        return this.mutated;
    }

    /**
     * Create a gene with new random values
     * @param {number} max upper bound for the values of the gene
     * @param {number} min lower bound for the values of the gene
     * @returns {Gene} the new Gene
     */
    static random(max = 1, min = 0) {
        return new Gene(Math.random() * (max - min) + min, Math.random() * (max - min) + min);
    }

    /**
     * Mix two parent genes to produce a child gene
     * @param {Gene} p1 parent 1's gene
     * @param {Gene} p2 parent 2's gene
     */
    static mix(p1, p2) {
        // temporary gene to store output
        let temp = new Gene();
        
        // select an allele from each parent into values p1 and p2
        temp.p1 = Math.random() >= 0.5 ? p1.meiosis() : p2.meiosis();
        temp.p2 = Math.random() >= 0.5 ? p1.meiosis() : p2.meiosis();
 
        return temp;
    }
}

class Genotype {
    /**
     * @param {Gene} x 
     * @param {Gene} y
     * @param {Gene} i
    */  
    constructor (x = new Gene(), y = new Gene(), i = new Gene(), col = "black") {
        this.geneX = x;
        this.geneY = y;
        this.geneIntensity = i;
        this.geneColor = col;
    }

    /**
     * Create a Genotype with random genes
     * @returns {Genotype} new Genotype with random Genes
     */    
    static random() {
        // these are custom values that ive had to tweak by hand but basically with 0 mutation
        // probability, the "Things" will never be able to fully traverse the terrain and if they
        // start with too little initial values, movement is unexiting and hard too observe
        // so if there is no mutation, bump up those init values to make movement more 
        if(mutateProb === 0) {
            return new Genotype(Gene.random(5).neg(), Gene.random(5, -5), Gene.random(2));
        }
        return new Genotype(Gene.random().neg(), Gene.random(5, -5), Gene.random(2));
    }

    /**
     * Mutate the genes of a
     * @param {number} prob probability of mutating
     * @returns {boolean} if the genotype has mutated or not
     */
    mutate(prob) {
        // mutation count
        let mut = 0;

        // add to mut the boolean of mutated or not (returned by function "mutate")
        // true => 1 && false => 0
        mut += this.geneX.mutate(prob);
        mut += this.geneY.mutate(prob);
        mut += this.geneIntensity.mutate(prob);
        
        // so if "Thing" has mutated (mut is not 0), colour it red
        if(mut) {
            this.geneColor = "red";
        }

        return mut !== 0;
    }

    /**
     * @param {Genotype} a genes of parent a
     * @param {Genotype} b genes of parent b
     * @param {number} outcomes amount of mixed genes
     */
    static mix(p1, p2, outcomes = 1){
        // combine genes into ${outcomes} outcomes
        let out = new Array(outcomes);

        // for every new outcome
        for(let i = 0; i < outcomes; i++){

            // create a new Genotype with genes from p1 and p2
            out[i] = new Genotype(
                Gene.mix(p1.geneX, p2.geneX),
                Gene.mix(p1.geneY, p2.geneY),
                Gene.mix(p1.geneIntensity, p2.geneIntensity)
            )

            // if one of the parents genes mutated
            if(p1.geneColor === "red" || p2.geneColor === "red") {
                // set the child's color to blue
                out[i].geneColor = "blue";
            }

        }

        // return the outcomes
        return out;
    }
}
