// // objects are collections of properties. Properties are key-value pairs
// let city = {
//     name: "Chicago",
//     state: "Illinois",
//     area: 234.21,
//     nickname: "Second City"
// };

// // to access a property from a JavaScript object, there are two options
// // 1) Bracket notation, similar to python
// console.log(city['name']); // output: "Chicago"

// // 2) Dot notation (the preferred convention in JavaScript)
// console.log(city.state); // output: "Illinois"

// // properties can be overwritten by assigning a new value
// city.nickname = "The Windy City";
// console.log(city);

// // to add a property to an existing object, simply assign a value to a new key
// city.population = 2695598;
// console.log(city);

// create a function for both charts
function init(id = 940){
    d3.json('samples.json').then((data)=>{
        console.log(data);  
        let ids = data.samples.filter(meta => +meta.id === id)[0].otu_ids;
        let sampleValues = data.samples.filter(meta => +meta.id === id)[0].sample_values;
        let labels = data.samples.filter(meta => +meta.id === id)[0].otu_labels;
        
        //get the top ten OTU IDs
        let top_OTU = ids.slice(0,10).reverse();
        //format the id's
        let top_ids = top_OTU.map(key => 'OTU' + key);
        //gete the top ten OTU Labels
        let top_labels = labels.slice(0,10);

        console.log(`OTU_labels: ${top_labels}`)

        //create the bar chart with a layout
        let graph = {
            x: sampleValues,
            y: top_ids,
            text: top_labels,
            marker: {
                color: 'green'},
            type: 'bar',
            orientation: 'h',
        };

        let trace = [graph];

        let layout = {
            title: 'Number of Graphs Made this Week',
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };    
    Plotly.newPlot('bar', trace, layout);


        //create the bubble chart with a layout
        let graph2 = {
            x: ids,
            y: sampleValues,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: ids
            },
            text: labels
        };

        let trace2 = [graph2];

        let layout2 = {
            title: 'OTU IDs',
            height: 600,
            width: 600
        };

    Plotly.newPlot('bubble', trace2, layout2);
    });
}

//Display the sample metadata, i.e., an individual's demographic information.
function demoinfo (id = 940) {
    d3.json('samples.json').then((data2)=>{
        let metadata = data2.metadata;
        console.log(metadata)
        console.log(id)
        
        //filter data info by id
        let results = metadata.filter(meta => meta.id === id)[0];
        console.log(results)
        let demographicInfo = d3.select('#sample-metadata');
        demographicInfo.html('');
        //grab the necessary data for the selected id and display the info in the panel.
        Object.entries(results).forEach(k =>{
            console.log(k)
            demographicInfo.append('panel-body').text(k[0] + ':' + k[1] + '\n');
        });
    });
}

//create a function for the initial data rendering
function test(id = 940) {
    let dropdown = d3.select('#selDataset');
    
    d3.json('samples.json').then((data2)=>{
        console.log(data2)
        
        //add the id data to the dropdown menu
        data2.names.forEach((name)=> {
            dropdown.append('option').text(name).property('value');
        });

        // display the data and plots on the page.
        init(+id);
        demoinfo(+id);
    });
}


//init();
// demoinfo();
test();

function optionChanged(id){
    demoinfo(+id);
    init(+id);
}





