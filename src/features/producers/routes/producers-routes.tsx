import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../../../layout";
import { ProducerList } from "../components";

export const ProducerRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <AppLayout>
            <ProducerList />
          </AppLayout>
        }
      />
    </Routes>
  );
};
