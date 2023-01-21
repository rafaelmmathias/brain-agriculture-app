import { Routes, Route } from "react-router-dom";
import { AppLayout } from "layout";
import { ProducerList, ProducerCreate, ProducerEdit } from "../components";

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
      <Route
        path="/create"
        element={
          <AppLayout>
            <ProducerCreate />
          </AppLayout>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <AppLayout>
            <ProducerEdit />
          </AppLayout>
        }
      />
    </Routes>
  );
};
