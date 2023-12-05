import { useEffect } from "react";
import Chart from "chart.js";

export default function ChartPie() {
   useEffect(() => {
      const config = {
         type: "pie",
         data: {
            labels: ["Both", "Customer Portal", "Reward Exchange", "No Access"],
            datasets: [
               {
                  label: "My First Dataset",
                  data: [190, 150, 50, 150],
                  backgroundColor: [
                     "#64a8e8",
                     "#64a8e8",
                     "#c4c4c4",
                     "#2b4863",
                  ],
                  
                  hoverOffset: 4,
               },
            ],
         },
      };
      const ctx = document.getElementById("pie-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
   }, []);

   return (
      <>
         <canvas id="pie-chart" className="chartjs-render-monitor"></canvas>
      </>
   );
}