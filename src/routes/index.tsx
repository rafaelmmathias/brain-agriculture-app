import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardRoutes } from "@/ui/features/dashboard/routes";
import { ProducerRoutes } from "@/ui/features/producers/routes";
import { NotFound } from "@/ui/layout";

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
