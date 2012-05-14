function createGraph(weightData, moodData) {

    var graph_values = build_x_and_x_value_arrays(weightData, moodData);

    add_xy_axis_ranges(graph_values.x, graph_values.y);

    // counting the number of axis x steps
    var days_range = countAxisXSteps(graph_values.x);

    var r = Raphael("graph", 500, 180);
    var lineChart = r.linechart(
            10, 10,               // top left anchor
            480, 160,           // bottom right anchor
            graph_values.x,
            graph_values.y,
            {
                shade: false,
                axis: "0 0 1 0", // render bottom x axis
                axisxstep: days_range
            });

    // Line styles
    lineChart.lines[0].attr({"stroke": "rgba(231, 183, 63, 0.8)", "stroke-width" : "5"});
    lineChart.lines[1].attr({"stroke": "rgba(132, 78, 128, 0.8)", "stroke-width" : "5"});
    lineChart.lines[2].attr({"stroke": "transparent"});

    // x axis styles
    lineChart.axis[0].attr("stroke", "rgba(255, 255, 255, 0.2)");

    // Formatting x axis labels
    var axisItems = lineChart.axis[0].text.items;
    for( var i = 0, l = axisItems.length; i < l; i++ ) {
       var date = new Date(parseInt(axisItems[i].attr("text")));
       axisItems[i].attr("text", date.getDate() + "." + (date.getMonth()+1) + "."); // Will need better formatter for this
       axisItems[i].attr("fill", "#fff");
    }
}

function build_x_and_x_value_arrays(weightData, moodData) {
    var x_values_array = [[], []],
        y_values_array = [[], []];

    parseData(weightData, x_values_array[0], y_values_array[0]);
    parseData(moodData, x_values_array[1], y_values_array[1]);

    return {x: x_values_array, y: y_values_array}
}

function parseData(data, x_array, y_array) {
    var record;
    for(var i=0; i < data.length; i++) {
        record = data[i];

        x_array.push(record.time);
        y_array.push(record.value);
    }
}

function add_xy_axis_ranges(x_values_array, y_values_array) {
    var x_start = new Date();
    x_start.setDate(x_start.getDate()+1);

    x_values_array.push([new Date(), x_start]);
    y_values_array.push([100, 400]);
}

function countAxisXSteps(x_values_array) {
    return Math.ceil(new Date() - x_values_array[0][0]) / (1000 * 60 * 60 * 24);
}


// Function generating mock graph that is rendered
// when not enough data for real graph is available
function createBlankSlateGraph() {
    var weightData = [];
    var moodData = [];

    // Prepare 8 date objects for each day
    var date = new Date();
    date7 = new Date(date);
    date.setDate(date.getDate()-1);
    date6 = new Date(date);
    date.setDate(date.getDate()-1);
    date5 = new Date(date);
    date.setDate(date.getDate()-1);
    date4 = new Date(date);
    date.setDate(date.getDate()-1);
    date3 = new Date(date);
    date.setDate(date.getDate()-1);
    date2 = new Date(date);
    date.setDate(date.getDate()-1);
    date1 = new Date(date);
    date.setDate(date.getDate()-1);

    // Prepare weight data for slate graph for each day
    weightData.push({"time":date,"value":"249"});
    weightData.push({"time":date1,"value":"233"});
    weightData.push({"time":date2,"value":"220"});
    weightData.push({"time":date3,"value":"220"});
    weightData.push({"time":date4,"value":"208"});
    weightData.push({"time":date5,"value":"194"});
    weightData.push({"time":date6,"value":"215"});
    weightData.push({"time":date7,"value":"185"});

    // Prepare mood data for slate graph for each day
    moodData.push({"time":date,"value":"180"});
    moodData.push({"time":date1,"value":"188"});
    moodData.push({"time":date2,"value":"252"});
    moodData.push({"time":date3,"value":"230"});
    moodData.push({"time":date4,"value":"300"});
    moodData.push({"time":date5,"value":"330"});
    moodData.push({"time":date6,"value":"180"});
    moodData.push({"time":date7,"value":"300"});

    createGraph(weightData, moodData);
}