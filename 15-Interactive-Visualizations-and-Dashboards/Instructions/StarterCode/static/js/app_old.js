$(document).ready(function() {
    doWork();
});

function doWork() {
    d3.json("samples.json").then((data) => {
        console.log(data);

        // populate the dropdown
        data.names.forEach((val) => {
            var newOption = `<option>${val}</option>`;
            $('#selDataset').append(newOption);
        });

        // grab first name in dropdown
        var sample = parseInt($('#selDataset').val());

        // filter the metadata
        var metadata = data.metadata.filter(x => x.id === sample)[0];
        // "id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0
        // build that div
        Object.entries(metadata).forEach(function(key_value, index) {
            var entry = `</span><b>${key_value[0]}:</b> ${key_value}</span><br>`;

            $("#sample-metadata").append(entry);
        });

        // samples: [
        //     {sample1}, {sample2}, {sample3}...
        // ]

        // {sample1} => {id:940, out_ids : [1121, 1132], otu_labels: [bacteria, somebacteria], sample_values : [20, 45]}

        // filter the sample data
        var sample_data = data.samples.filter(x => x.id == sample)[0];

        // build the charts

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
            title: "Top Bacteria Present In Subject Belly Button",
            xaxis: { title: "Amount of Bacteria" },
            yaxis: { title: "Bacteria ID" }
        }

        var traces = [trace]

        Plotly.newPlot('bar', traces, layout);
    });

    function doWork() {
        d3.json("samples.json").then((data) => {
            console.log(data);

            // populate the dropdown
            data.names.forEach(function(val) {
                var newOption = `<option>${val}</option>`;
                $('#selDataset').append(newOption);
            });

            // grab the first name in dropdown
            var sample = parseInt$("selDataset").val();
            console.log(sample);
            // filter the metadata
            var metadata = data.filter(x => x.id === sample)[0];

            // build the div
            Object.entries(metadata).forEach(function(key_value, index) {
                var entry = `<span><b>${key_value}:</b> ${key_value}</span>`;
                $("#sample-metadata").append(entry);
            })
        });

        // filter the sample data
        var sample_data = data.samples.filter(x => x.id === sample)[0];

        // build the charts

        // bar chart
        var y_labels = sample_data.otu_ids.slice(0, 10).reverse().map(x => `OTU ID: ${x}`); // make string
        var trace = {
            x: sample_data.sample_values.slice(0, 10).reverse(),
            y: y_labels,
            tex: sample_data.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: "h"
        };

        var layout = {
            title: "Top Bacteria Present in Subject Belly Button",
            xaxis: { title: "Amount of Bacteria" },
            yaxis: { title: "Bacteria ID" }
        }

        var traces = [trace];

        Plotly.newPlot('myDiv', data);

        // make bubble plot

        var trace = {
            x: sample_data.otu_ids,
            y: sample_data.sample_values,
            mode: 'markers',
            marker: {
                size: sample_data.sample_values,
                color: otu_ids,
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

        Plotly.newPlot('bubble', data, layout);

    }
}