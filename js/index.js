const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.screen.width - 60;
canvas.height = window.screen.height - 215;

// radius of the "Things"
const thingSize = 10;

// array of all the blobs, number of things, probability of mutation, and number of generations
let allThings, thingCount, mutateProb, genNum;
// data for the graph
let geneXAvg = [], geneYAvg = [], geneIAvg = [], dxAvg = 0;
// interval id for later use (update func)
let iId;

ctx.clearRect(0, 0, canvas.width, canvas.height);

function start() {
   
    // set the custom user inputted values
    thingCount = Number($("#thingCount").val());
    // divided by two because each gene has two alleles that can be mutated, effectively doubling
    // the chance a gene mutates compared to previous versions 
    // (where each gene only had 1 way to mutate)
    mutateProb = Number($("#mutateProb").val()) / 2 / 100;
    // generation number is reinitialised
    genNum = 0;

    // initialise the allThings array and fill it with new "Things"
    allThings = new Array(thingCount);
    
    for(let i = 0; i <= thingCount; i++) {
        // create a new random "Thing"
        let t = new Thing();

        // draw it on the terrain
        t.draw();
        // save it in the array containing all the "Things"
        allThings[i] = t;
    }

    // start the simulation
    update();
}

function update() {
    // to keep track of the amount of movements
    let i = 0;

    // to stop from unwanted behaviour when spamming the next generation button
    if(iId) {
        clearInterval(iId);
    }

    // "Things" are moving every 125ms, makes an almost smooth animation
    iId = setInterval(() => {

        // clear the terrain
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // move and draw each "Thing"
        for(let e of allThings) {
            e.move();
            e.draw();
        }
        
        // A blue line at the average distance
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(canvas.width - dxAvg, 0)
        ctx.lineTo(canvas.width - dxAvg, canvas.height);
        ctx.stroke();

        // Write the generation number on the terrain
        ctx.beginPath();
        ctx.font = "20px monospace"
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.fillText(`Génération: ${genNum}`, 20, 20)
        ctx.stroke();

        // they basically move 50 times before stopping
        if(i++ > 50){
            clearInterval(iId);
            i = 0;
        }
    }, 125);

}

function nextGeneration() {
    // select only the top thingCount / 2 "Things" that have made it the farthest
    let top = [...allThings.sort((a, b) => a.x - b.x)].splice(0, Math.round(thingCount / 2));

    // avg of all genes and distance => g = gene, Moy = Avg in french and did not want 
    // conflicting variable names
    // initial val of 0
    let dxMoy = 0;
    let gxMoy = 0;
    let gyMoy = 0;
    let giMoy = 0;
    
    // add all the values to their accumulators
    for(let e of allThings) {
        dxMoy += canvas.width - e.x;
        gxMoy += Math.abs(e.genes.geneX.avg());
        // abs to give a better idea of what the general value is, with negative mixing 
        // with positive values, you get values close to 0 whiwh does not properly illustrate 
        // the values of gene Y
        gyMoy += Math.abs(e.genes.geneY.avg());
        giMoy += e.genes.geneIntensity.avg();
    }

    // and calculate average
    dxMoy /= thingCount;
    gxMoy /= thingCount;
    gyMoy /= thingCount;
    giMoy /= thingCount;
    
    // then push data to each of their respective average data collectors (??)
    geneXAvg.push(gxMoy);
    geneYAvg.push(gyMoy);
    geneIAvg.push(giMoy);
    // except for average distance
    dxAvg = dxMoy;

    // then update the graph with new data
    chart.update();

    // Initialise the next Generation array
    let nextG = [];
    // for every element that is selected and will possibly reproduce
    for(let e of top) {
        // Colour it in green to show user that it has been selected
        Thing.drawAt(e, "green");

        // choose random indexes of parents of two new "Things"
        let i1 = Math.round(Math.random() * (top.length - 1));
        let i2 = Math.round(Math.random() * (top.length - 1));
        
        // what am i supposed to name this ??
        // top[x] => parent a / b, mutProb for mutation
        let babies = Thing.birth(top[i1], top[i2], mutateProb);

        nextG.push(...babies);
    }

    // add the generation number to the graph so it is labeled correctly
    // in doing so increment the generation number
    labels.push(++genNum);

    // return the Array of new "Things" representing next generation
    return nextG;
}

function updateNextGeneration() {
    // make the transition pretty

    // set allThings to contain the next generation
    allThings = nextGeneration();

    // delay starting so user can see the selected "Things" 
    // (marked in green, see "nextGeneration" func)
    setTimeout(() => {
        
        for(let e of allThings) {
            e.draw();
        }
        
        update();

    }, 500)
}

/**
 * 
 * @param {number} n number of generations to generate 
 */
function quickGen(n) {

    // quickGen basically does what all the other functions combined do but with
    // no animations / delay so user does not need to wait for {n} generations to be
    // visually simulated
    for(let _ = 0; _ < n; _++) {

        // set allThings to the new generation
        allThings = nextGeneration();
        
        // 50 => number of movements (see "update" func)
        for(let __ = 0; __ <= 50; __++){
            
            // clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // move the things (no need for drawing)
            for(let e of allThings) {
                e.move();
            }
        }

        // update the generation indicator
        ctx.beginPath();
        ctx.font = "20px monospace";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.fillText(`Génération: ${genNum}`, 20, 20)
        ctx.stroke();
    }
}