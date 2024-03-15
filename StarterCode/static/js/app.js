// Get json data
d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) =>{
    var select = d3.select('#selDataset');
    data.names.forEach((name) => {
        select.append('option').text(name).property('value', name);
    });

    // Call buildCharts with initially selected sample
    var initialData = data.names[0]; 
    buildCharts(initialData);
    buildMetadata(initialData);
});
function buildMetadata(sample) {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) => {
        var metadata = data.metadata.find(sampleObj => sampleObj.id == sample);
        var demo = d3.select('#sample-metadata');
        // Clear previous metadata
        demo.html("");
        // Add each key-value pair to the panel
        Object.entries(metadata).forEach(([key, value]) => {
            demo.append('h6').text(`${key}: ${value}`);
        });
    });
}

function buildCharts(sample) {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) => {
       
        var result = data.samples.find(sampleObj => sampleObj.id == sample);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [{
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        var barLayout = {
            title: "Top 10 Bacteria",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }

        };

        var data = [trace1];

        var layout = {
            title: 'Belly-Button Bacteria Bubble Bonanza',
            showlegend: true,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', data, layout );


    });


}

function optionChanged(newSample) {
    console.log("New sample selected:", newSample);
    buildCharts(newSample);
    buildMetadata(newSample); 
}