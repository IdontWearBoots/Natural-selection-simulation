const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.screen.availWidth - 60;
canvas.height = window.screen.availHeight - 180;

const thingSize = 10;
let allThings, thingCount, mutateProb;

// previous stats (previous generation)
let pStats = [0, 0, 0, 0, 0];

ctx.clearRect(0, 0, canvas.width, canvas.height);

function start() {
    
    thingCount = Number($("#thingCount")[0].value);
    mutateProb = Number($("#mutateProb")[0].value) / 100;
    
    allThings = new Array(thingCount);
    
    for(let i = 0; i <= thingCount; i++) {
        let t = new Thing(
            canvas.width - 55,
            Math.round(Math.random() * canvas.height),
            thingSize,
            Gene.random(),
            "black"
        );
    
        t.draw();
        allThings[i] = t;
    }

    update();
}

function update() {
    let i = 0;

    let iId = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        allThings.forEach(e => {
            e.move();
            e.draw();
        });
        if(i++ > 50){
            clearInterval(iId);
            i = 0;
        }
    }, 125);
}

function nextGeneration() {
    let top = [...allThings.sort((a, b) => a.x - b.x)].splice(0, Math.round(thingCount / 2));

    let dxMoy = 0;
    allThings.forEach(
        e => dxMoy += canvas.width - e.x
    );
    dxMoy /= thingCount;
    let dxF = canvas.width - top[0].x;
    
    console.warn(allThings);
    console.warn(top)
    console.log(canvas.height, top[0], allThings.at(-1))
    
    let dxL = canvas.width - allThings.at(-1).x;
    let gxF = -allThings[0].genes.geneX;
    let gxL = -allThings.at(-1).genes.geneX;

    $("#stats-tbl").html(
        $("#stats-tbl").html() + 
        `<tr>
            <td class="${pStats[0] > dxMoy ? "red" : "green"}"> ${dxMoy} </td>
            <td class="${pStats[1] > dxF ? "red" : "green"}"> ${dxF} </td>
            <td class="${pStats[2] > dxL ? "red" : "green"}"> ${dxL} </td>
            <td class="${pStats[3] > gxF ? "red" : "green"}"> ${gxF} </td>
            <td class="${pStats[4] > gxL ? "red" : "green"}"> ${gxL} </td>
        </tr>`
    )

    pStats = [dxMoy, dxF, dxL, gxF, gxL];

    let nextG = [];

    for(let e of top) {
        Thing.drawAt(e, "green");
        let i1 = Math.round(Math.random() * (top.length - 1));
        let i2 = Math.round(Math.random() * (top.length - 1));

        let babies = Thing.birth(top[i1], top[i2], mutateProb);

        nextG.push(...babies);
    }

    return nextG;
}

function updateNextGeneration() {
    allThings = nextGeneration();
    setTimeout(() => {
        allThings.forEach(e => {
            e.draw();
        });
        update();

    }, 500)
}