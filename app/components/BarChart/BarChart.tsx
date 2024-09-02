
import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import data from './data/countries.json' // Fix import to match default export of JSON file
import styles from './BarChart.module.css'; // Import CSS module

export interface BarChartProps {
  prop?: string;
}

/**
 * BarChart component renders a bar chart using D3.js in a React component.
 *
 * @param {BarChartProps} props - Props object for the component.
 * @param {string} [props.prop='default value'] - An optional string property with a default value.
 *
 * @returns {JSX.Element} A React component rendering an SVG bar chart.
 */
export function BarChart({ prop = 'default value' }: BarChartProps): JSX.Element {
  const ref = useRef<SVGSVGElement | null>(null); // Create a ref to attach to the SVG element

  useEffect(() => {
    // Clear the SVG before drawing
    d3.select(ref.current).selectChildren().remove();

    // Set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
          width = 460 - margin.left - margin.right, // Actual width of the graph
          height = 400 - margin.top - margin.bottom; // Actual height of the graph

    // Append the SVG object to the div referenced by ref
    const svg = d3
      .select(ref.current) // Select the SVG element via ref
      .append("svg") // Create an SVG element
      .attr("width", width + margin.left + margin.right) // Set SVG width including margins
      .attr("height", height + margin.top + margin.bottom) // Set SVG height including margins
      .append("g") // Append a group element to the SVG
      .attr("transform", `translate(${margin.left},${margin.top})`); // Move the group element to respect the margins

    // Ensure data is correctly typed
    (data as Array<{ Country: string, Value: number }>).forEach((d) => {
      d.Value = +d.Value; // Convert the `Value` property to a number
    });

    // X axis setup with scaling
    const x = d3
      .scaleBand() // Create a band scale for the x-axis
      .range([0, width]) // Set the range of the x-axis
      // @ts-ignore
      .domain(data.map((d) => d.Country)) // Set the domain to the country names in the data
      .padding(0.2); // Add padding between the bars

    // Append X axis to the SVG and set its orientation
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`) // Move the X-axis to the bottom of the graph
      .call(d3.axisBottom(x)) // Create the X-axis with the defined scale
      .selectAll("text") // Target all text elements of the axis
      .attr("transform", "translate(-10,0)rotate(-45)") // Rotate the text for better readability
      .style("text-anchor", "end"); // Align the end of the text with the ticks

    // Y axis setup with scaling
    const y = d3.scaleLinear().domain([0, Math.max(...data.map(d => d.Value))]).range([height, 0]); // Create a linear scale for the y-axis with a dynamic domain

    // Append Y axis to the SVG and set its orientation
    svg.append("g").call(d3.axisLeft(y)); // Create the Y-axis with the defined scale

    // Create and append the bars
    svg
      .selectAll("rect") // Create a selection for the bars
      // @ts-ignore
      .data(data) // Bind data to the selection
      .join("rect") // Join the data to the rect elements
      .attr("x", (d) => x(d.Country)!) // Set the x position of each bar
      // @ts-ignore
      .attr("y", (d) => y(d.Value)) // Set the y position of each bar based on the data value
      .attr("width", x.bandwidth()) // Set the width of each bar
      // @ts-ignore
      .attr("height", (d) => height - y(d.Value)) // Calculate the height of each bar
      .attr("fill", "var(--color-accent-5)") // Fill color for the bars
      .style("stroke", "var(--color-accent-1)") // Stroke color for the bars
      .style("stroke-width", "3px"); // Stroke width for the bars
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <svg className={styles.BarChart} width={460} height={400} id="barchart" ref={ref} /> // Render the SVG with applied styles and dimensions
  );
}
