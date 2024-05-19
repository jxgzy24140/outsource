import withRouter from "@/components/Layout/Router/withRouter";
import OrderStore from "@/stores/orderStore";
import Stores from "@/stores/storeIdentifier";
import { Col, Divider, Row } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
interface IProps {
  navigate: any;
  orderStore: OrderStore;
}

const Order = inject(Stores.OrderStore)(
  observer((props: IProps) => {
    const { orderStore } = props;

    useEffect(() => {
      const initValues = async () => {
        orderStore.getOrders(1, 100);
      };
      initValues();
    }, []);

    return (
      <Col className="w-3/4 mx-auto">
        <Row className="py-2">
          <Col className="w-full">
            {orderStore.orders?.items.map((order: any) => {
              return (
                <div className="my-3 py-3 px-2 bg-white">
                  <Row className="w-full justify-between items-center">
                    <p>
                      <span className="font-semibold">Mã đơn hàng:</span> #
                      {order.id} -{" "}
                      <span className="font-semibold">Trạng thái:</span>{" "}
                      {order.orderStatusName}
                    </p>
                    <p className="capitalize text-base">
                      <span className="font-semibold">Tổng</span>{" "}
                      {order.orderDetails.reduce((sum, detail) => {
                        return sum + detail.price * detail.quantity;
                      }, 0)}{" "}
                      VND
                    </p>
                  </Row>
                  <Divider />
                  {order.orderDetails.map((item: any) => {
                    return (
                      <>
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
                                {item.price * item.quantity} VND
                              </p>
                            </Row>
                          </Col>
                        </Row>
                        <Divider />
                      </>
                    );
                  })}
                </div>
              );
            })}
          </Col>
        </Row>
      </Col>
    );
  })
);

export default withRouter(Order);
