import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChartProps>();
  //이 훅을 사용하여 outlet을 통해 props 전달
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: "price",
        //       data: data?.map((price) => parseFloat(price.close)) as number[],
        //       //만약 price.close가 존재하지 않으면, []를 사용하라는 의미 1.?? [], 2.as Number[]
        //     },
        //   ]}
        //   options={{
        //     chart: {
        //       height: 500,
        //       width: 500,
        //       toolbar: { show: false },
        //       background: "transparent",
        //     },
        //     grid: { show: false },
        //     theme: { mode: "dark" },
        //     yaxis: { show: false },
        //     xaxis: {
        //       labels: { show: false },
        //       axisBorder: { show: false },
        //       type: "datetime",
        //       categories: data?.map((price) =>
        //         new Date(price.time_open * 1000).toUTCString()
        //       ),
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#0fbcf9"], stops: [0, 100] },
        //     },
        //     colors: ["#0be881"],
        //     tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
        //   }}
        //  />

        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_close * 1000),
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                };
              }) as [],
            },
          ]}
          options={{
            chart: {
              height: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            theme: { mode: isDark ? "dark" : "light" },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_open * 1000).toUTCString()
              ),
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#0fbcf9",
                  downward: "#0be881",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
