import React from "react";
import { Layout, Row, Col, Badge } from "antd";
import { Link } from "react-router-dom";
import "@/components/Layout/Header/index.css";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import OrderStore from "@/stores/orderStore";
import withRouter from "../Router/withRouter";
import AuthenticationStore from "@/stores/authenticationStore";

interface IProps {
  navigate: any;
  orderStore: OrderStore;
  authenticationStore: AuthenticationStore;
}

const UserHeaderLayout = inject(
  Stores.OrderStore,
  Stores.AuthenticationStore
)(
  observer((props: IProps) => {
    //const { navigate, orderStore, authenticationStore } = props;

    return (
      <Layout.Header
        className="min-w-full bg-white opacity-85 container h-fit border-b-black"
        style={{ borderBottom: "1px solid black" }}
      >
        <Row className="w-full h-full flex justify-between items-center">
          <Col span={4}>
            <img
              src="https://curnonwatch.com/wp-content/uploads/2023/12/logo.svg"
              alt="logo"
            />
          </Col>
          <Col span={16}>
            <Row className="flex justify-center gap-x-2">
              <Link className="px-3 py-2" to={""}>
                NAM GIỚI
              </Link>
              <Link className="px-3 py-2" to={""}>
                NỮ GIỚI
              </Link>
              <Link className="px-3 py-2" to={""}>
                QUÀ TẶNG
              </Link>
              <Link className="px-3 py-2" to={""}>
                BEST SELLERS
              </Link>
              <Link className="px-3 py-2" to={""}>
                VỀ CHÚNG TÔI
              </Link>
              <Link className="px-3 py-2" to={""}>
                BLOG
              </Link>
            </Row>
          </Col>
          <Col span={4}>
            <Row className="justify-end items-center gap-x-2">
              <SearchOutlined
                className="text-lg"
                onClick={() => props.navigate("")}
              />
              <UserOutlined
                className="text-lg"
                onClick={() => props.navigate("")}
              />
              <Badge count={5} size="small">
                <ShoppingCartOutlined
                  className="text-lg"
                  onClick={() => props.navigate("")}
                />
              </Badge>
            </Row>
          </Col>
        </Row>
      </Layout.Header>
    );
  })
);

export default withRouter(UserHeaderLayout);
