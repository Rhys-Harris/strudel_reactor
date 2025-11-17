import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"


function filterRawStrudelData(data) {
    const newData = [];

    // Converts text into the correct index
    // in final data
    const noteBucket = {
        "c": 0,
        "cs": 1, "c#": 1, "db": 1, "df": 1,
        "d": 2,
        "ds": 3, "d#": 3, "eb": 3, "ef": 3,
        "e": 4,
        "f": 5,
        "fs": 6, "f#": 6, "gb": 6, "gf": 6,
        "g": 7,
        "gs": 8, "g#": 8, "ab": 8, "af": 8,
        "a": 9,
        "as": 10, "a#": 10, "bb": 10, "bf": 10,
        "b": 11,
    };

    for (let i = 0; i < 12; ++i) {
        // Start with 0 count for each note
        newData.push(0);
    }

    for (let i = 0; i < data.length; ++i) {
        // Find the word "note", and get the
        // correct note
        const match = data[i].match(/note:([^ ]+)/);

        const components = match[1].match(/^([a-g][fsb#]*)(\d+)$/);

        const note = components[1];
        const octave = components[2];

        const bucket = noteBucket[note];

        // Count this note
        newData[bucket] = newData[bucket]+1;
    }

    console.log("newData:", newData);

    return newData;
}

export function buildGraph(data) {
    // Empty dummy function to get replaced
}

export function initGraph() {
    const svg = d3.select("svg");

    let w = svg.node().getBoundingClientRect().width;
    let h = svg.node().getBoundingClientRect().height;

    // Replace the dummy function
    buildGraph = (rawData) => {
        // Ensure we have a d3 readable dataset
        const data = filterRawStrudelData(rawData);

        // console.log("graphData:", data);
        svg.select("*").remove();

        // Get the range of the data we have
        const dataRange = d3.extent(data, (d, i) => d);
        const dataMax = dataRange[1];

        // Set up phys -> visual scaling
        // for both axis
        const yScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([h, 0]);

        const xScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, w])

        // How wide each bar is
        const barWidth = w / data.length;

        // Add a new chart
        const chartGroup = svg.append('g')
            .classed("chartGroup", true)

        // Add all the bars
        let barGroups = chartGroup
            .selectAll('g')
            .data(data);

        // Move the bars to correct location
        let newBarGroups = barGroups.enter()
            .append('g')

        // Actual visual rectangle
        newBarGroups
            .append("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", 0)
            .attr("height", (d, i) => yScale(d)) // Start at 0 height (will grow)
            .attr("width", barWidth) // Max possible width
            // .style("fill", (d, i) => {
            //     return `hsl(240, 100%, ${(100-(d.totalItems / dataMax * 80))}%`;
            // })
            .style("fill", (d, i) => {
                return `rgba(255, 0, 255, 0.5)`;
            })
    }
}
