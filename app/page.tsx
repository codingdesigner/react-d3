'use client';

import { useState } from "react";
import * as d3 from "d3";

import { LinePlot } from "./components/LinePlot";

export default function Home() {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  function onMouseMove(event: any) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <div onMouseMove={onMouseMove}>
        <LinePlot data={data} />
      </div>
    </main>
  );
}
