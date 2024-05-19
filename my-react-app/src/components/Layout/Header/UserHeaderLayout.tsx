import React, { useEffect } from "react";
import { Layout, Row, Col, Badge, Dropdown, Menu, Input } from "antd";
import { Link, useLocation } from "react-router-dom";
import "@/components/Layout/Header/index.css";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import OrderStore from "@/stores/orderStore";
import withRouter from "../Router/withRouter";
import AuthenticationStore from "@/stores/authenticationStore";
import { appLayouts, authLayouts } from "../Router/router.config";

interface IProps {
  navigate: any;
  orderStore: OrderStore;
  authenticationStore: AuthenticationStore;
}
const { Search } = Input;
const UserHeaderLayout = inject(
  Stores.OrderStore,
  Stores.AuthenticationStore
)(
  observer((props: IProps) => {
    const { orderStore, authenticationStore, navigate } = props;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const initValues = () => {
      orderStore.getCart();
      authenticationStore.getAuthentication();
    };

    useEffect(() => {
      initValues();
    }, []);

    const onSearch = (values) => {
      const typeId = searchParams.get("type");
      const keyword = values || "";
      const newUrl = typeId
        ? `?typeId=${typeId}&keyword=${encodeURIComponent(keyword)}`
        : `?keyword=${encodeURIComponent(keyword)}`;
      navigate(newUrl);
    };

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
              onClick={() => navigate(`/${appLayouts.home.path}`)}
              className="cursor-pointer"
            />
          </Col>
          <Col span={14}>
            <Row className="flex justify-center gap-x-2">
              <Link className="px-3 py-2" to={"?type=1"}>
                NAM GIỚI
              </Link>
              <Link className="px-3 py-2" to={"?type=2"}>
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
          <Col span={6}>
            <Row className="justify-end items-center gap-x-2">
              <Search
                placeholder="Nhập tên sản phẩm tìm kiếm..."
                allowClear
                size="small"
                style={{ width: "200px" }}
                onSearch={onSearch}
              />
              <Dropdown
                trigger={["hover"]}
                overlay={
                  <>
                    {authenticationStore.isAuthenticated ? (
                      <Menu>
                        <Menu.Item
                          onClick={() =>
                            navigate(`/${appLayouts.purchase.path}`)
                          }
                        >
                          Đơn Hàng
                        </Menu.Item>

                        <Menu.Item onClick={authenticationStore.logout}>
                          Đăng Xuất
                        </Menu.Item>
                      </Menu>
                    ) : (
                      <Menu>
                        <Menu.Item
                          onClick={() =>
                            navigate(`auth/${authLayouts.login.path}`)
                          }
                        >
                          Đăng Nhập
                        </Menu.Item>
                      </Menu>
                    )}
                  </>
                }
              >
                <UserOutlined
                  className="text-lg"
                  onClick={() => navigate(appLayouts.purchase.path)}
                />
              </Dropdown>
              <Badge count={orderStore.shoppingCart.length} size="small">
                <ShoppingCartOutlined
                  className="text-lg"
                  onClick={() => navigate(appLayouts.cart.path)}
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
