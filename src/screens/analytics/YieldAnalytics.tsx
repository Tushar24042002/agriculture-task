import React, { useEffect, useState } from "react";
import data from "../../data/jsonData.json";
import TableComponent from "../../components/Table/TableComponent";

//  getting required data from the Indian Agriculture dataset
interface DataItem {
  "Crop Name": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: number;
}

// table data row interface
interface ProcessedData {
  cropName: string;
  totalYears: number;
  avgCropYields: string;
  avgYieldArea: string;
}

// for  table header
interface TableHeader {
  name: string;
  key: keyof ProcessedData;
}

const YieldAnalytics: React.FC = () => {
  const [yearlyData, setYearlyData] = useState<ProcessedData[]>([]);

  useEffect(() => {
    const output = processData();
    setYearlyData(output);
  }, []);

  // function for filter and process data
  const processData = (): ProcessedData[] => {
    const rawResult = (data as DataItem[]).reduce(
      (acc: Record<string, any>, item: DataItem) => {
        const cropName = item["Crop Name"];
        const cropYields =
          item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0;
        const yieldArea =
          item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0;

        if (!acc[cropName]) {
          acc[cropName] = {
            cropName,
            totalYears: 1,
            avgCropYields: cropYields,
            avgYieldArea: yieldArea,
          };
        } else {
          acc[cropName].totalYears += 1;
          acc[cropName].avgCropYields += cropYields;
          acc[cropName].avgYieldArea += yieldArea;
        }

        return acc;
      },
      {}
    );

    // Calculate the average values
    return Object.values(rawResult).map((item: any) => ({
      cropName: item.cropName,
      totalYears: item.totalYears,
      avgCropYields: (item.avgCropYields / item.totalYears).toFixed(3),
      avgYieldArea: (item.avgYieldArea / item.totalYears).toFixed(3),
    }));
  };

  //  defining headers for table iteration (for Table Component)
  const header: TableHeader[] = [
    {
      name: "Crop",
      key: "cropName",
    },
    {
      name: "Average Yield of the Crop between 1950-2020",
      key: "avgCropYields",
    },
    {
      name: "Average Cultivation Area of the Crop between 1950-2020",
      key: "avgYieldArea",
    },
  ];

  return <TableComponent caption={"Analytics Table 2"} header={header} data={yearlyData} />;
};

export default YieldAnalytics;
