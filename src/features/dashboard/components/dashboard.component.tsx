import { useGetDashboardQuery } from "../../../services/brain-agriculture";

export const Dashboard = () => {
  const { data } = useGetDashboardQuery();
  return <div>produtores: {data?.farms}</div>;
};
