import React, { Suspense } from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import { authLayouts } from "./Router/router.config";
import { UserHeaderLayout } from "@/components/Layout/Header";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  return (
    <Layout className="w-full h-full min-h-screen overflow-y-scroll">
      <UserHeaderLayout />
      <Content className="h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {Object.keys(authLayouts).map((key: any) => {
              const Component = authLayouts[key].component;
              return (
                <Route
                  key={authLayouts[key].path}
                  path={authLayouts[key].path}
                  element={<Component />}
                />
              );
            })}
          </Routes>
        </Suspense>
        <ToastContainer autoClose={2000} />
      </Content>
    </Layout>
  );
};

export default UserLayout;
