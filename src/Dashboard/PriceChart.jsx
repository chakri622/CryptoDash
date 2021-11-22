import ChartConfig from "./HighChartConfig";
import React, { useContext } from "react";
import { Tile } from "../Shared/Tile";
import { AppContext, AppPropContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import Theme from "./HighChartsTheme";
import ChartSelect from "./ChartSelect";

const PriceChart = () => {
  const { historical, changeChartSelect } = useContext(AppContext);

  const setCurrentProp = useContext(AppPropContext);

  ReactHighcharts.Highcharts.setOptions(Theme);
  return (
    <Tile>
      <ChartSelect
        defaultValue={"months"}
        onChange={(e) => setCurrentProp({ timeInterval: e.target.value })}
      >
        <option value="days">Days</option>
        <option value="weeks">Weeks</option>
        <option value="months">Months</option>
      </ChartSelect>
      {historical ? (
        <ReactHighcharts config={ChartConfig(historical)} />
      ) : (
        <div>Loading Historical Charts....</div>
      )}
    </Tile>
  );
};

export default PriceChart;
