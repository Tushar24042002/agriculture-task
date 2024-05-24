import React, { useEffect, useState } from "react";
import data from "../../data/jsonData.json";
import TableComponent from "../../components/Table/TableComponent";

//  getting required data from the Indian Agriculture dataset
interface DataItem {
  Year: string;
  "Crop Production (UOM:t(Tonnes))"?: number;
}

// for yearly data keys
interface YearlyData {
  year: string;
  minCropProduction: number;
  maxCropProduction: number;
}

const YearAnalytics: React.FC = () => {
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);

  useEffect(() => {
    let output = processData();
    setYearlyData(output);
  }, []);

  // function for filter and process data
  const processData = (): YearlyData[] => {
    return Object.values(
      (data as DataItem[]).reduce((acc, item) => {
        const year = item["Year"];
        const cropProduction = item["Crop Production (UOM:t(Tonnes))"] || 0;
        if (!acc[year]) {
          acc[year] = {
            year,
            minCropProduction: cropProduction,
            maxCropProduction: cropProduction,
          };
        } else {
          acc[year].minCropProduction = Math.min(
            acc[year].minCropProduction,
            cropProduction
          );
          acc[year].maxCropProduction = Math.max(
            acc[year].maxCropProduction,
            cropProduction
          );
        }
        return acc;
      }, {} as Record<string, YearlyData>)
    );
  };

  //  defining headers for table iteration (for Table Component)
  const header = [
    {
      name: "Year",
      key: "year",
    },
    {
      name: "Crop with Maximum Production in that Year",
      key: "maxCropProduction",
    },
    {
      name: "Crop with Minimum Production in that Year",
      key: "minCropProduction",
    },
  ];

  return <TableComponent caption={"Analytics Table 1"} header={header} data={yearlyData} />;
};

export default YearAnalytics;
