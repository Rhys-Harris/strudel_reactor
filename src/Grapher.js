import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"


function filterRawStrudelData(data) {
    const newData = [];

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

        console.log("graphData:", data);
        console.log("svg", svg);
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

        console.log(xScale(5));
        console.log(yScale(5));

        // How wide each bar is
        // (plus gaps)
        const barMargin = 10;
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
