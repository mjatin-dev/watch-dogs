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
    <ReactApexChart
      options={options}
      series={series}
      width='100%'
      height={400}
      type={type}
    />
  );
}

export default Charts;
