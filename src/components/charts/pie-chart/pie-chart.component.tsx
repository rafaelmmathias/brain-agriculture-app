import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { stringToColor } from "utils/string-prototypes";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: any[];
  fieldValueName?: string;
  fieldLabelName?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  fieldValueName = "count",
  fieldLabelName = "name",
}) => {
  const values = useMemo(
    () => data.map((value) => value[fieldValueName]),
    [data, fieldValueName]
  );

  const colors = useMemo(
    () =>
      data.map((value) => value.color || stringToColor(value[fieldLabelName])),
    [data, fieldLabelName]
  );

  const labels = useMemo(
    () => data.map((value) => value[fieldLabelName]),
    [data, fieldLabelName]
  );

  const dataConfig = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverOffset: 10,
        },
      ],
    }),
    [values, colors, labels]
  );

  return <Pie data={dataConfig} />;
};
