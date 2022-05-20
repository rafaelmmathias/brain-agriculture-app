import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../features";
import { AppLayout, NotFound } from "../layout";

export const AppRouter = () => {
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
