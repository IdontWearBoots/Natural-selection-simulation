/*
 *   Honestly thanks so much for the people who made chart.js,
 *   really easy to use and very very useful
 *   [LINKS]
 *   https://www.chartjs.org/, https://github.com/chartjs/Chart.js
 */

// graph canvas / ctx
let g_canvas = document.getElementById("graphs");
let g_ctx = g_canvas.getContext("2d");

// the width and height of the graphing canvas
const chart_w = 700, chart_h = 500;

// to reset the graph you must delete the actual <canvas> element then recreate the graph
function resetGraph() {
    // destroy the chart (e.g <canvas> element)
    chart.destroy();

    // reset graph canvas / ctx vars
    g_canvas = document.getElementById("graphs");
    g_ctx = g_canvas.getContext("2d");

    // reset labels, all the data and the config obj
    labels = [0];
    data = {
        labels: labels,
        datasets: [{
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

    // reinitialise the chart on the graph canvas 
    chart = new Chart(g_ctx, config);
    // resize properly
    chart.resize(chart_w, chart_h);
}

// x axis labels (generation number)
let labels = [0];

// data that goes on to the chart
let data = {
    labels: labels,
    datasets: [{
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

// config obj for the chart (line chart)
let config = {
    type: "line",
    data: data,
    options: {
        responsive: false
    }
}

// initialise chart obj
let chart = new Chart(g_ctx, config);

// resize to desired size
chart.resize(chart_w, chart_h);