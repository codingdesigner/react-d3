'use client';

import { useState } from "react";
import * as d3 from "d3";

import { BarChart } from "@/app/components/BarChart";

export default function Home() {
  return (
    <main>
      <h1>Bar Chart</h1>
      <div>
        <BarChart/>
      </div>
    </main>
  );
}
