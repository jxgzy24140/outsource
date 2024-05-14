import withRouter from "@/components/Layout/Router/withRouter";
import OrderStore from "@/stores/orderStore";
import RatingStore from "@/stores/ratingStore";
import Stores from "@/stores/storeIdentifier";
import { Button, Col, Divider, Form, Modal, Rate, Row, Input } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const { TextArea } = Input;
interface IProps {
  navigate: any;
  orderStore: OrderStore;
  ratingStore: RatingStore;
}

const Order = inject(
  Stores.OrderStore,
  Stores.RatingStore
)(
  observer((props: IProps) => {
    const { orderStore, navigate, ratingStore } = props;
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState<any>();
    const [orders, setOrders] = useState<any>();
    const [pageSize, setPageSize] = useState<any>(10);
    const [modalTitle, setModalTitle] = useState("");
    const [values, setValues] = useState<any>({});
    const [actionType, setActionType] = useState("");
    const desc = ["Tệ", "Không hài lòng", "Bình thường", "Tốt", "Tuyệt vời"];

    useEffect(() => {
      const init = async () => {
        await orderStore.getOrders(1, pageSize);
        setOrders(orderStore.orders.items);
      };
      init();
    }, []);

    useEffect(() => {
      if (filter == 0) {
        setOrders(orderStore?.orders.items);
        return;
      }
      const newOrderFiltered = orderStore?.orders?.items.filter(
        (item: any) => item.orderStatusId == filter
      );
      setOrders(newOrderFiltered);
    }, [filter]);

    const handleConfirmOrder = async (id: any) => {
      await orderStore.updateOrder(id, { id: id, orderStatusId: 4 });
    };

    const handleBackOrder = async (id: any) => {
      await orderStore.updateOrder(id, { id: id, orderStatusId: 1 });
    };

    const handleEvaluateProduct = async (id: any) => {
      setActionType("create");
      setModalTitle("Đánh Giá Sản Phẩm");
      await orderStore.getOrder(id);
      const initialValues: any = [];
      let defaultStarsRate: any = {};
      orderStore.order.products.map((item, index) => {
        initialValues.push({
          productId: item.productId,
          stars: 5,
          productName: item.productName,
          ratingText: "",
          image: item.image,
          orderDetailId: item.orderDetailId,
        });
        defaultStarsRate[index.toString()] = 5;
      });
      form.setFieldsValue({
        ratings: initialValues,
      });

      setValues(defaultStarsRate);
      setIsModalOpen(true);
    };

    const handleReEvaluateProduct = async (id: any) => {
      await ratingStore.getRatingsForOrder(id);
      const initialValues: any = [];
      ratingStore.rating?.map((item: any) => {
        initialValues.push({
          ratingId: item.ratingId,
          productId: item.productId,
          stars: item.stars,
          productName: item.productName,
          ratingText: item.ratingText,
          image: item.image,
          orderDetailId: item.orderDetailId,
        });
      });
      setActionType("update");
      setModalTitle("Chỉnh Sửa Đánh Giá");
      form.setFieldsValue({
        ratings: initialValues,
      });
      setIsModalOpen(true);
    };

    const handleCancelOrder = async (id: any) => {
      await orderStore.updateOrder(id, {
        id: id,
        orderStatusId: 1,
      });
      setOrders(orderStore.orders.items);
    };

    const handleRebuyOrder = async (id: any) => {
      console.log(id);
    };

    const onFinish = async (values: any) => {
      const input: any = [];
      if (actionType == "create") {
        values.ratings.map((item) =>
          input.push({
            stars: item.stars,
            ratingText: item.ratingText,
            userId: orderStore.order.userId,
            productId: item.productId,
            orderDetailId: item.orderDetailId,
          })
        );
        await ratingStore.createRating(input);
      } else {
        values.ratings.map((item: any) =>
          input.push({
            stars: item.stars,
            ratingText: item.ratingText,
            ratingId: item.ratingId,
          })
        );
        await ratingStore.updateRating(input);
      }
      console.log("rating: ", values, " actionType: ", actionType);
    };

    const handleCloseModal = () => {
      setValues({});
      setActionType("");
      setIsModalOpen(false);
    };

    return (
      <Col className="w-3/4 mx-auto">
        <Row className="bg-white py-3">
          <NavLink
            to={""}
            onClick={() => setFilter(0)}
            className="text-center px-3 py-2 active w-1/5 active"
          >
            Tất cả
          </NavLink>
          <NavLink
            to={""}
            onClick={() => setFilter(2)}
            className="text-center px-3 py-2 w-1/5"
          >
            Chờ thanh toán
          </NavLink>
          <NavLink
            to={""}
            onClick={() => setFilter(3)}
            className="text-center px-3 py-2 w-1/5"
          >
            Vận chuyễn
          </NavLink>
          <NavLink
            to={""}
            onClick={() => setFilter(4)}
            className="text-center px-3 py-2 w-1/5"
          >
            Hoàn thành
          </NavLink>
          <NavLink
            to={""}
            onClick={() => setFilter(1)}
            className="text-center px-3 py-2 w-1/5"
          >
            Đã hủy
          </NavLink>
        </Row>
        <Row className="py-2">
          <Col className="w-full">
            {orders &&
              orders.map((order: any) => {
                return (
                  <div className="my-3 py-3 px-2 bg-white cursor-pointer">
                    <Row className="w-full justify-between items-center">
                      <p>Mã đơn hàng: #{order.orderId}</p>
                      <p className="capitalize text-base text-red-600">
                        {order.orderStatus}
                      </p>
                    </Row>
                    <Divider />
                    {order.products.map((item: any) => {
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
                                  {item.price * item.quantity}
                                </p>
                              </Row>
                            </Col>
                          </Row>
                          <Divider />
                        </>
                      );
                    })}
                    <Row className="justify-end gap-3">
                      {order.orderStatusId == 1 && (
                        <Col>
                          <Button
                            onClick={() => {
                              if (order.orderStatusId == 1)
                                handleRebuyOrder(order.id);
                            }}
                            disabled={order.orderStatusId != 1}
                            className="flex justify-center items-center text-center px-3 py-2 text-white bg-[#e57905]"
                          >
                            Mua lại
                          </Button>
                        </Col>
                      )}
                      {order.orderStatusId == 2 && (
                        <Col>
                          <Button
                            onClick={() => {
                              if (order.orderStatusId == 2)
                                handleCancelOrder(order.id);
                            }}
                            disabled={order.orderStatusId != 2}
                            className="flex justify-center items-center text-center px-3 py-2 text-white bg-[#e57905]"
                          >
                            Hủy đơn hàng
                          </Button>
                        </Col>
                      )}
                      {order.orderStatusId == 3 && (
                        <Col>
                          <Button
                            onClick={() => {
                              if (order.orderStatusId == 3)
                                handleConfirmOrder(order.id);
                            }}
                            disabled={order.orderStatusId == 3}
                            className="flex justify-center items-center text-center px-3 py-2 text-white bg-[#e57905]"
                          >
                            Đã nhận được hàng
                          </Button>
                        </Col>
                      )}
                      {order.orderStatusId == 4 && (
                        <>
                          <Col>
                            <Button
                              onClick={() => {
                                if (order.orderStatusId == 4)
                                  handleBackOrder(order.id);
                              }}
                              disabled={order.orderStatusId != 4}
                              className="flex justify-center items-center px-3 py-2 text-black bg-white"
                            >
                              Trả hàng
                            </Button>
                          </Col>
                          {order.products.every((item) => !item.isRated) ? (
                            <Col>
                              <Button
                                onClick={() => {
                                  if (order.orderStatusId == 4)
                                    handleEvaluateProduct(order.id);
                                }}
                                className="flex justify-center items-center px-3 py-2 text-white bg-[#e57905]"
                              >
                                Đánh giá
                              </Button>
                            </Col>
                          ) : (
                            <Col>
                              <Button
                                onClick={() => {
                                  if (order.orderStatusId == 4)
                                    handleReEvaluateProduct(order.id);
                                }}
                                className="flex justify-center items-center px-3 py-2 text-white bg-[#e57905]"
                              >
                                Chỉnh sửa đánh giá
                              </Button>
                            </Col>
                          )}
                        </>
                      )}
                    </Row>
                  </div>
                );
              })}
          </Col>
        </Row>
        <Modal
          title={modalTitle}
          open={isModalOpen}
          onOk={() => {
            document.getElementById("submit-btn")?.click();
          }}
          onCancel={handleCloseModal}
          okText="Hoàn thành"
        >
          <Form form={form} onFinish={onFinish}>
            <Form.List name="ratings">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <>
                        <Form.Item
                          name={[name, "ratingId"]}
                          style={{ display: "none" }}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={[name, "productId"]}
                          style={{ display: "none" }}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={[name, "orderDetailId"]}
                          style={{ display: "none" }}
                        >
                          <Input />
                        </Form.Item>
                        <Row>
                          <Col span={2}>
                            <Form.Item
                              name={[name, "image"]}
                              className="inline-block"
                            >
                              <img
                                className="w-[40px]"
                                src={
                                  form.getFieldValue("ratings")[key]["image"]
                                }
                                alt=""
                              />
                            </Form.Item>
                          </Col>
                          <Col span={22} className="flex-grow">
                            <Form.Item
                              name={[name, "productName"]}
                              className="inline-block"
                            >
                              <p>
                                {
                                  form.getFieldValue("ratings")[key][
                                    "productName"
                                  ]
                                }
                              </p>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row className="items-center">
                          <span>Đánh giá chất lượng </span>
                          <Form.Item
                            name={[name, "stars"]}
                            className="mx-2 inline-block mb-0"
                          >
                            <Rate
                              tooltips={desc}
                              onChange={(number) => {
                                const newValues = { ...values };
                                newValues[key] = number;
                                console.log(newValues);

                                setValues(newValues); // Cập nhật state với bản sao mới của values
                              }}
                              value={values[key]}
                              className="pr-3 inline-block"
                            />
                          </Form.Item>
                          {values[key] ? (
                            <span className="flex-grow">
                              {desc[values[key] - 1]}
                            </span>
                          ) : null}
                        </Row>

                        <Form.Item name={[name, "ratingText"]}>
                          <TextArea rows={4} minLength={20} maxLength={50} />
                        </Form.Item>
                      </>
                    );
                  })}
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button
                id="submit-btn"
                htmlType="submit"
                style={{ display: "none" }}
              ></Button>
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    );
  })
);

export default withRouter(Order);
