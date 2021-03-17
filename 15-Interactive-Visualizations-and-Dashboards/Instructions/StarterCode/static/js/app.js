$(document).ready(function() {
    doWork();
});

//doWork() - iniial page setup
function doWork() {
    d3.json("samples.json").then((data) => {
        console.log("tep1: data read complete")
        console.log(data);

        //step 2 : populating the filters
        makeFilters(data);

        console.log("tep2: dropdown complete")

        // step3: grab first name in dropdown - assumed sample
        var sample = parseInt($('#selDataset').val());

        console.log("tep3: initial sample chosen")

        buildPage(sample);

        console.log("last : page is built")




    });

}; // initial page load complete

// reusable function that is called for inital page load and every time user selects a sample
// ore function that calls other subfunctions - makepanel and makePlots()
function buildPage(sampleID) {

    console.log("Page Build Starts FOR ", parseInt(sampleID))

    d3.json("samples.json").then((data) => {

        // filter the metadata
        var metadata = data.metadata.filter(x => x.id == sampleID)[0];

        console.log(metadata)

        // filter the sample data
        var sample_data = data.samples.filter(x => x.id == sampleID)[0];


        //send metadata to make panel
        makePanel(metadata);
        console.log("Demographics built")

        //send to sample to plots
        makePlots(sample_data, metadata, sampleID)
        console.log("Plots built")

    });
}

function makePlots(sample_data, metadata, idSelected) {
    makeBar(sample_data, idSelected);
    makeBubble(sample_data);
    makeGauge(metadata);
}

function makeFilters(data) {
    // populate the dropdown
    data.names.forEach((val) => {
        var newOption = `<option>${val}</option>`;
        $('#selDataset').append(newOption);
    });
}

function makePanel(metadata) {
    $("#sample-metadata").html("");
    // build the div
    Object.entries(metadata).forEach(function(key_value, index) {
        console.log(key_value)
        var entry = `<span><b>${key_value[0]}:</b> ${key_value[1]}</span><br>`;
        $("#sample-metadata").append(entry);
    });

}

function optionChange(evt) {

    // $(evt) => this refers to the object that was used by the user to make selection
    console.log(evt);
    console.log($(evt).val())
        // we pick the changed sample value using $(evt).val(), pass the value to buildPage() - reuse BuildPage ()
    buildPage($(evt).val())
}

// build the charts
function makeBar(sample_data, idSelected) {
    // bar chart
    var y_labels = sample_data.otu_ids.slice(0, 10).reverse().map(x => `OTU ID: ${x}`); // make string
    var trace = {
        x: sample_data.sample_values.slice(0, 10).reverse(),
        y: y_labels,
        text: sample_data.otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h'

    };

    var layout = {
        title: "Top Bacteria Present In Belly Button for Subject - " + idSelected,
        xaxis: { title: "Amount of Bacteria" },
        yaxis: { title: "Bacteria ID" }
    }

    var traces = [trace]

    Plotly.newPlot('bar', traces, layout);
};

// bubble chart
function makeBubble(sample_data) {
    var trace = {
        x: sample_data.otu_ids,
        y: sample_data.sample_values,
        mode: 'markers',
        marker: {
            size: sample_data.sample_values,
            color: "otu_ids",
            colorscale: "Earth"
        },
        text: sample_data.otu_labels
    };

    var traces = [trace];

    var layout = {
        title: "Amount of Bacteria Present in Subject Belly Button",
        xaxis: { title: "Bacteria ID" },
        yaxis: { title: "Amount of Bacteria" }
    };

    Plotly.newPlot('bubble', traces, layout);
};

// gauge chart
function makeGauge(metadata) {
    var max_wfreq = 10;
    var trace = {
        domain: { x: [0, 1], y: [0, 1] },
        value: metadata.wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        gauge: {
            axis: { range: [null, max_wfreq] },
            steps: [
                { range: [0, 7], color: "lightgray" },
                { range: [7, 10], color: "gray" }
            ],
            threshold: {
                line: { color: "black", width: 5 },
                thickness: 0.75,
                value: 2
            }
        },
        mode: "gauge+number"
    };
    var traces = [trace];

    var layout = {}
    Plotly.newPlot('gauge', traces, layout);
};





// function doWork() {
//     d3.json("samples.json").then((data) => {
//         console.log(data);

//         // populate the dropdown
//         data.names.forEach(function(val) {
//             var newOption = `<option>${val}</option>`;
//             $('#selDataset').append(newOption);
//         });

//         // grab the first name in dropdown
//         var sample = parseInt$("selDataset").val();
//         console.log(sample);
//         // filter the metadata
//         var metadata = data.filter(x => x.id === sample)[0];

//         // build the div
//         Object.entries(metadata).forEach(function(key_value, index) {
//             var entry = `<span><b>${key_value}:</b> ${key_value}</span>`;
//             $("#sample-metadata").append(entry);
//         })
//     });

//     // filter the sample data
//     var sample_data = data.samples.filter(x => x.id === sample)[0];

//     // build the charts

//     // bar chart
//     var y_labels = sample_data.otu_ids.slice(0, 10).reverse().map(x => `OTU ID: ${x}`); // make string
//     var trace = {
//         x: sample_data.sample_values.slice(0, 10).reverse(),
//         y: y_labels,
//         tex: sample_data.otu_labels.slice(0, 10).reverse(),
//         type: 'bar',
//         orientation: "h"
//     };

//     var layout = {
//         title: "Top Bacteria Present in Subject Belly Button",
//         xaxis: { title: "Amount of Bacteria" },
//         yaxis: { title: "Bacteria ID" }
//     }

//     var traces = [trace];

//     Plotly.newPlot('myDiv', data);

//     // make bubble plot

//     var trace = {
//         x: sample_data.otu_ids,
//         y: sample_data.sample_values,
//         mode: 'markers',
//         marker: {
//             size: sample_data.sample_values,
//             color: otu_ids,
//             colorscale: "Earth"
//         },
//         text: sample_data.otu_labels
//     };

//     var traces = [trace];

//     var layout = {
//         title: "Amount of Bacteria Present in Subject Belly Button",
//         xaxis: { title: "Bacteria ID" },
//         yaxis: { title: "Amount of Bacteria" }
//     };

//     Plotly.newPlot('bubble', data, layout);

//     // gauge chart

//     var trace = {
//         domain: { x: [0, 1], y: [0, 1] },
//         value: metadata.wfreq,
//         title: { text: "Belly Button Washing Frequency" },
//         type: "indicator",
//         gauge: {
//             axis: { range: [null, max_wfreq] },
//             steps: [
//                 { range: [0, 7], color: "lightgray" },
//                 { range: [7, 10], color: "gray" }
//             ],
//             threshold: {
//                 line: { color: "red", width: 4 },
//                 thickness: 0.75,
//                 value: 2
//             }
//         },
//         mode: "gauge+number"
//     };
//     var traces = [trace];

//     var layout = {}
//     Plotly.newPlot('gauge', traces, layout);
// }