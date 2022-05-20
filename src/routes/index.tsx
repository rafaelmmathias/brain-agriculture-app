import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardRoutes } from "../features/dashboard/routes";
import { ProducerRoutes } from "../features/producers/routes";
import { NotFound } from "../layout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"/dashboard"} />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/producers/*" element={<ProducerRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
