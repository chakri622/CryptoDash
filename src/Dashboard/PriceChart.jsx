import ChartConfig from "./HighChartConfig";
import React, { useContext } from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import Theme from "./HighChartsTheme";

const PriceChart = () => {
  const { currentFavorite, fetchCoins } = useContext(AppContext);
  ReactHighcharts.Highcharts.setOptions(Theme);
  return (
    <Tile>
      <ReactHighcharts config={ChartConfig()} />
    </Tile>
  );
};

export default PriceChart;
