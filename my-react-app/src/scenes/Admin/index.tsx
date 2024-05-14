import withRouter from "@/components/Layout/Router/withRouter";
import { Col, Input } from "antd";
import React from "react";

const Dashboard = () => {
  return (
    <Col className="min-h-full h-full bg-slate-950">
      <Input className="h-52" />
      <Input className="h-52" />
    </Col>
  );
};
export default withRouter(Dashboard);
