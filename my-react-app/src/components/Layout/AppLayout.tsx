import React, { Suspense } from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { appLayouts } from "@/components/Layout/Router/router.config";
import ProtectedRoute from "@/components/Layout/Router/ProtectedRoute";
import Footer from "@/components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import { UserHeaderLayout } from "./Header";

const { Content } = Layout;
const AppLayout = () => {
  return (
    <Layout className="w-full h-full min-h-screen overflow-y-scroll">
      <UserHeaderLayout />
      <Content className="bg-white" style={{ minHeight: "unset" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {Object.keys(appLayouts).map((key: any) => {
              const Component = appLayouts[key].component;
              return (
                <Route
                  key={appLayouts[key]["path"]}
                  path={appLayouts[key].path}
                  element={
                    <ProtectedRoute>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
        <ToastContainer autoClose={2000} />
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
