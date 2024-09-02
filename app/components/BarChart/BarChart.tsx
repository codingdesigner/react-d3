
import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

import * as data from './data/countries.json'

import styles from './BarChart.module.css';

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
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Append the SVG object to the div referenced by ref
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Ensure data is correctly typed
    data.forEach((d: { Value: number; }) => {
      // @ts-ignore
      d.Value = +d.Value; // Convert Value to number
    });

    // X axis setup
    const x = d3
      .scaleBand()
      .range([0, width])
      // @ts-ignore
      .domain(data.map((d) => d.Country))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis setup
    const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      // @ts-ignore
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.Country)!)
      // @ts-ignore
      .attr("y", (d) => y(d.Value))
      .attr("width", x.bandwidth())
      // @ts-ignore
      .attr("height", (d) => height - y(d.Value))
      .attr("fill", "var(--color-accent-5)")
      .style("stroke", "var(--color-accent-1)")
      .style("stroke-width", "3px")
      ;
  }, []);

  return (
    <svg className={styles.BarChart} width={460} height={400} id="barchart" ref={ref} />
  );
}
