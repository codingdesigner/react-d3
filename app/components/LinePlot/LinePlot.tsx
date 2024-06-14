'use client'; // This directive indicates that the component is a client-side component in a Next.js application.
import React, { useEffect, useRef } from 'react'; // Importing React and necessary hooks from the 'react' library.
import * as d3 from "d3"; // Importing the entire D3.js library for data visualization.

// Define the properties that the LinePlot component will accept.
export interface LinePlotProps {
  data: number[]; // Array of numbers representing the data points for the line plot.
  width?: number; // Optional width of the SVG element.
  height?: number; // Optional height of the SVG element.
  marginTop?: number; // Optional top margin for the plot.
  marginRight?: number; // Optional right margin for the plot.
  marginBottom?: number; // Optional bottom margin for the plot.
  marginLeft?: number; // Optional left margin for the plot.
}

// Define the LinePlot component with default values for optional properties.
export function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}: LinePlotProps) {
  // Create references for the x-axis and y-axis group elements.
  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);

  // Define the x-scale using D3's scaleLinear function.
  // The domain is set from 0 to the length of the data array minus 1.
  // The range is set from the left margin to the width minus the right margin.
  const x = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([marginLeft, width - marginRight]);

  // Define the y-scale using D3's scaleLinear function.
  // The domain is set to the extent of the data array (min and max values).
  // The range is set from the height minus the bottom margin to the top margin.
  const y = d3.scaleLinear()
    .domain(d3.extent(data) as [number, number])
    .range([height - marginBottom, marginTop]);

  // Define the line generator function using D3's line function.
  // The x accessor function maps the index of the data point to the x-scale.
  // The y accessor function maps the data point value to the y-scale.
  const line = d3.line<number>()
    .x((d, i) => x(i))
    .y(d => y(d));

  // useEffect hook to render the x-axis when the component mounts or updates.
  useEffect(() => {
    if (gx.current) {
      d3.select(gx.current).call(d3.axisBottom(x)); // Call D3's axisBottom function with the x-scale.
    }
  }, [gx, x]); // Dependencies: gx and x.

  // useEffect hook to render the y-axis when the component mounts or updates.
  useEffect(() => {
    if (gy.current) {
      d3.select(gy.current).call(d3.axisLeft(y)); // Call D3's axisLeft function with the y-scale.
    }
  }, [gy, y]); // Dependencies: gy and y.

  // Return the SVG element containing the line plot.
  return (
    <svg width={width} height={height}>
      {/* Group element for the x-axis, positioned at the bottom of the plot. */}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      {/* Group element for the y-axis, positioned at the left of the plot. */}
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      {/* Path element for the line, using the line generator function to create the 'd' attribute. */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data) || ''}
      />
      {/* Group element for the data points, represented as circles. */}
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          // Circle element for each data point, positioned using the x and y scales.
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}

// This code defines a `LinePlot` component that uses D3.js to create a line plot with axes. The comments explain the purpose and functionality of each part of the code, making it easier to understand.
