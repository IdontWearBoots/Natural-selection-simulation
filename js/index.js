const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.screen.width - 60;
canvas.height = window.screen.height - 215;

const thingSize = 10;
// array of all the blobs, number of things, probability of mutation, and number of generations
let allThings, thingCount, mutateProb, genNum;
let geneXAvg = [], geneYAvg = [], geneIAvg = [], dxAvg = 0;

ctx.clearRect(0, 0, canvas.width, canvas.height);

function start() {
   
    thingCount = Number($("#thingCount")[0].value);
    mutateProb = Number($("#mutateProb")[0].value) / 100;
    genNum = 0;

    allThings = new Array(thingCount);
    
    for(let i = 0; i <= thingCount; i++) {
        let t = new Thing();

        t.draw();
        allThings[i] = t;
    }

    update();
}

function update() {
    let i = 0;

    // "Things" are moving every 125ms, makes sorta smooth animation
    let iId = setInterval(() => {
        // clear the terrain
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // just faster than forEach
        for(let e of allThings) {
            e.move();
            e.draw();
        }
        
        // A blue line at the average dx 
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
    let top = [...allThings.sort((a, b) => a.x - b.x)].splice(0, Math.round(thingCount / 2));

    // avg of all genes and distance => g = gene

    // initial val of 0
    let dxMoy = 0;
    let gxMoy = 0;
    let gyMoy = 0;
    let giMoy = 0;
    
    // add al the values
    for(let e of allThings) {
        dxMoy += canvas.width - e.x;
        gxMoy += Math.abs(e.genes.geneX);
        gyMoy += e.genes.geneY;
        giMoy += e.genes.geneIntensity;
    }

    // and calculate average
    dxMoy /= thingCount;
    gxMoy /= thingCount;
    gyMoy /= thingCount;
    giMoy /= thingCount;
    
    // then push data to each of their respective averages
    geneXAvg.push(gxMoy);
    geneYAvg.push(gyMoy);
    geneIAvg.push(giMoy);
    dxAvg = dxMoy;

    // then update the chart with new data
    chart.update();

    let nextG = [];

    for(let e of top) {
        Thing.drawAt(e, "green");

        // choose random indexes of parents
        let i1 = Math.round(Math.random() * (top.length - 1));
        let i2 = Math.round(Math.random() * (top.length - 1));
        
        // what am i supposed to name this ??
        let babies = Thing.birth(top[i1], top[i2], mutateProb);

        nextG.push(...babies);
    }

    labels.push(++genNum);

    return nextG;
}

function updateNextGeneration() {
    // make the transition pretty
    allThings = nextGeneration();
    setTimeout(() => {
        
        for(let e of allThings) {
            e.draw();
        }
        
        update();

    }, 500)
}

function quickGen() {
    for(let i = 0; i < 10; i++) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        allThings = nextGeneration();

        for(let e of allThings) {
            // 50 => number of movements (see "update" func)
            e.x += e.genes.geneX * e.genes.geneIntensity * 50;
            e.y += e.genes.geneY * e.genes.geneIntensity * 50;
            e.y %= canvas.height;
        }
        

        ctx.beginPath();
        ctx.font = "20px monospace";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.fillText(`Génération: ${genNum}`, 20, 20)
        ctx.stroke();
    }
}