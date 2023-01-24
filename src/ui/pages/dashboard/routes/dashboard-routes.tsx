import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/ui/layout";
import { Dashboard } from "../components";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />
    </Routes>
  );
};
