const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.screen.availWidth - 60;
canvas.height = window.screen.availHeight - 180;

const thingSize = 50;
let allThings, thingCount, mutateProb;

ctx.clearRect(0, 0, canvas.width, canvas.height);

function start() {
    
    thingCount = Number($("#thingCount")[0].value);
    mutateProb = Number($("#mutateProb")[0].value) / 100;
    
    allThings = new Array(thingCount);
    
    for(let i = 0; i <= thingCount; i++) {
        let t = new Thing(
            canvas.width - 55,
            Math.round(Math.random() * canvas.height),
            10,
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
    let top = allThings.sort((a, b) => a.x - b.x).splice(0, Math.round(thingCount / 2));
    let nextG = [];

    for(let e of top) {
        Thing.drawAt(e, "green");
        let i1 = Math.round(Math.random() * (top.length - 1));
        let i2 = Math.round(Math.random() * (top.length - 1));

        let babies = Thing.birth(top[i1], top[i2]);

        nextG.push(...babies);
    }

    return nextG;
}

function updateNextGeneration() {
    allThings = nextGeneration();
    allThings.forEach(e => {
        e.draw();
    });
    update();
}
