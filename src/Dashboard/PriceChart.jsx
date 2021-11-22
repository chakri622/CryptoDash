import ChartConfig from "./HighChartConfig";
import React, { useContext } from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import Theme from "./HighChartsTheme";

const PriceChart = () => {
  const { historical } = useContext(AppContext);
  console.log("Historical=" + JSON.stringify(historical));
  ReactHighcharts.Highcharts.setOptions(Theme);
  return (
    <Tile>
      {historical ? (
        <ReactHighcharts config={ChartConfig(historical)} />
      ) : (
        <div>Loading Historical Charts....</div>
      )}
    </Tile>
  );
};

export default PriceChart;
