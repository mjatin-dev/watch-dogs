import ReactApexChart from "react-apexcharts";
interface InterFaceCharts {
  data: {
    options: object | any;
    series: Array<any>;
    type:
      | "line"
      | "area"
      | "bar"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble";
  };
}
function Charts({ data }: InterFaceCharts) {
  const { options, series, type } = data;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactApexChart
        options={options}
        series={series}
        width='100%'
        height='100%'
        type={type}
      />
    </div>
  );
}

export default Charts;
