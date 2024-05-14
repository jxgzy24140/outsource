import withRouter from "@/components/Layout/Router/withRouter";
import OrderStore from "@/stores/orderStore";
import Stores from "@/stores/storeIdentifier";
import { LeftOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";

interface IProps {
  navigate: any;
  orderStore: OrderStore;
  params: any;
}

const OrderDetail = inject(Stores.OrderStore)(
  observer((props: IProps) => {
    const { orderStore, params, navigate } = props;
    const { id } = params;

    useEffect(() => {
      const init = async () => {
        await orderStore.getOrder(id);
      };
      init();
    }, []);

    return (
      orderStore.order && (
        <Col className="w-3/4 mx-auto">
          <Row className="px-3 py-4 justify-between items-center mb-2 bg-white">
            <Col
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <LeftOutlined /> TRỞ LẠI
            </Col>
            <Col>
              MÃ ĐƠN HÀNG: {orderStore.order.orderId} |{" "}
              <span className="capitalize text-base text-red-600">
                {orderStore.order.orderStatus}
              </span>
            </Col>
          </Row>
          <Row className="p-3 bg-white">
            <Col span={6}>
              <h2 className="py-3">Địa Chỉ Nhận Hàng</h2>
              <Row>
                <p>{orderStore.order.receiveName}</p>
              </Row>
              <Row>
                <p>{orderStore.order.phoneNumber}</p>
              </Row>
              <Row>
                <p>
                  {orderStore.order.addressDetail}, {orderStore.order.ward},{" "}
                  {orderStore.order.district}, {orderStore.order.province}
                </p>
              </Row>
            </Col>
            <Col span={18}></Col>
          </Row>
          <Row className="p-3 bg-white">
            {orderStore.order.products.map((item: any) => {
              return (
                <Row className="w-full gap-3 py-4">
                  <Col>
                    <img
                      className="w-[60px] h-[60px]"
                      src={item.image}
                      alt=""
                    />
                  </Col>
                  <Col className="flex-grow">
                    <p>{item.productName}</p>
                    <Row className=" justify-between items-center">
                      <p>x{item.quantity}</p>
                      <p className="text-base text-red-600">
                        {item.price * item.quantity}
                      </p>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </Row>
          <Row className="bg-white mt-2">
            <Divider />
            <Row className="justify-between flex-grow">
              <Col span={20} className="text-right">
                Tổng tiền hàng
              </Col>
              <Col span={4} className="text-right">
                {orderStore.order.amount}
              </Col>
            </Row>
            <Divider />
            <Row className="justify-between flex-grow">
              <Col span={20} className="text-right">
                Phí vận chuyển
              </Col>
              <Col span={4} className="text-right">
                {orderStore.order.shippingFee}
              </Col>
            </Row>
            <Divider />
            <Row className="justify-between flex-grow">
              <Col span={20} className="text-right">
                Thành tiền
              </Col>
              <Col span={4} className="text-right">
                {orderStore.order.shippingFee + orderStore.order.amount}
              </Col>
            </Row>
            <Divider />
            <Row className="justify-between flex-grow">
              <Col span={20} className="text-right">
                Phương thức thanh toán
              </Col>
              <Col span={4} className="text-right">
                {orderStore.order.paymentMethod}
              </Col>
            </Row>
            <Divider />
          </Row>
        </Col>
      )
    );
  })
);

export default withRouter(OrderDetail);
