let g_canvas = document.getElementById("graphs");
let g_ctx = g_canvas.getContext("2d");

const chart_w = 700, chart_h = 500;

function resetGraph() {
    chart.destroy();
    g_canvas = document.getElementById("graphs");
    g_ctx = g_canvas.getContext("2d");
    
    labels = [0];

    data = {
        labels: labels,
        datasets: [
            {
                label: "gèneY moyen",
                borderColor: "blue",
                backgroundColor: "blue",
                data: geneYAvg
            },
            {
                label: "gèneX moyen",
                borderColor: "red",
                backgroundColor: "red",
                data: geneXAvg
            },
            {
                label: "gèneIntensité moyen",
                borderColor: "purple",
                backgroundColor: "purple",
                data: geneIAvg
            },
        ]
    };  

    config = {
        type: "line",
        data: data,
        options: {
            responsive: false
        }
    }
    
    chart = new Chart(g_ctx, config);
    chart.resize(chart_w, chart_h);
}

let labels = [0];

let data = {
    labels: [],
    datasets: [
        {
            label: "gèneY moyen",
            borderColor: "blue",
            backgroundColor: "blue",
            data: geneYAvg
        },
        {
            label: "gèneX moyen",
            borderColor: "red",
            backgroundColor: "red",
            data: geneXAvg
        },
        {
            label: "gèneIntensité moyen",
            borderColor: "purple",
            backgroundColor: "purple",
            data: geneIAvg
        },
    ]
};

let config = {
    type: "line",
    data: data,
    options: {
        responsive: false
    }
}

let chart = new Chart(g_ctx, config);

chart.resize(chart_w, chart_h);