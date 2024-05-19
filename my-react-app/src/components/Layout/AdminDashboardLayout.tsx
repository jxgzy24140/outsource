import React, { Suspense } from "react";
import { Layout, Row, Col } from "antd";
import { Route, Routes } from "react-router-dom";
import { adminLayouts } from "./Router/router.config";
import Sidebar from "@/components/Layout/Sidebar";
import AdminProtectedRoute from "@/components/Layout/Router/AdminProtectedRoute";
import { ToastContainer } from "react-toastify";

const { Content } = Layout;
const AdminDashboardLayout = () => {
  return (
    <Layout className="w-full h-screen max-h-screen flex flex-row">
      <Col span={4}>
        <Sidebar />
      </Col>
      <Col span={20}>
        <Row className="flex-col">
          <Col>
            <Content
              className="h-full min-h-full max-h-full"
              style={{ minHeight: "unset", backgroundColor: "#f1f5f9" }}
            >
              <div
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 40px)" }}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {Object.keys(adminLayouts).map((key: any) => {
                      const Component = adminLayouts[key]["component"];
                      return (
                        <Route
                          key={adminLayouts[key]["path"]}
                          path={adminLayouts[key]["path"]}
                          element={
                            <AdminProtectedRoute>
                              <Component />
                            </AdminProtectedRoute>
                          }
                        />
                      );
                    })}
                  </Routes>
                </Suspense>
              </div>
              <ToastContainer />
            </Content>
          </Col>
        </Row>
      </Col>
    </Layout>
  );
};

export default AdminDashboardLayout;
