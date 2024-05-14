// PieChart.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ success, failed, processing }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Huỷ", "Thành Công", "Đang sử lý"],
        datasets: [
          {
            data: [success, failed, processing],
            backgroundColor: ["#DF2E38", "#609966", "#FFA500"],
          },
        ],
        title: {
          display: true,
          text: "Thống kê đơn hàng",
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  useEffect(() => {});

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default PieChart;
