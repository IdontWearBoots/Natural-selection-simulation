const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.screen.availWidth - 60;
canvas.height = window.screen.availHeight - 180;

const thingSize = 10;
// array of all the blobs, number of things, probability of mutation, and number of generations
let allThings, thingCount, mutateProb, genNum;

// previous stats (previous generation)
let pStats = [0, 0, 0, 0, 0];

ctx.clearRect(0, 0, canvas.width, canvas.height);

function start() {
    
    thingCount = Number($("#thingCount")[0].value);
    mutateProb = Number($("#mutateProb")[0].value) / 100;
    genNum = 1;
    
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

    let iId = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // just faster
        for(let e of allThings) {
            e.move();
            e.draw();
        }
        
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(canvas.width - pStats[0], 0);
        ctx.lineTo(canvas.width - pStats[0], canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.font = "20px monospace"
        ctx.strokeStyle = "black";
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

    // av distance
    let dxMoy = 0;
    for(let e of allThings) {
        dxMoy += canvas.width - e.x;
    }
    dxMoy /= thingCount;

    // distance first and last thing => fastest/slowest
    let dxF = canvas.width - top[0].x;
    let dxL = canvas.width - allThings.at(-1).x;
    // geneX first and last thing => fastest/slowest
    let gxF = -allThings[0].genes.geneX;
    let gxL = -allThings.at(-1).genes.geneX;

    $("#stats-tbl").html(
        // red color if decreased else green
        $("#stats-tbl").html() + 
        `<tr>
            <td class="${pStats[0] > dxMoy ? "red" : "green"}"> ${dxMoy} </td>
            <td class="${pStats[1] > dxF ? "red" : "green"}"> ${dxF} </td>
            <td class="${pStats[2] > dxL ? "red" : "green"}"> ${dxL} </td>
            <td class="${pStats[3] > gxF ? "red" : "green"}"> ${gxF} </td>
            <td class="${pStats[4] > gxL ? "red" : "green"}"> ${gxL} </td>
        </tr>`
    )
    
    // update previous stats
    pStats = [dxMoy, dxF, dxL, gxF, gxL];

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
    genNum++;

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