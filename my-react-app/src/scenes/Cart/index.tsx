import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import OrderStore from "@/stores/orderStore";
import {
  Button,
  Col,
  Divider,
  InputNumber,
  Row,
  Form,
  Input,
  Select,
} from "antd";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
const { TextArea } = Input;
interface IProps {
  navigate: any;
  orderStore: OrderStore;
}

const dummy = [
  {
    id: 1,
    productName: "Rise",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-nighthawk-da-11-400x400.png",
    quantity: 1,
    price: 219000,
  },
  {
    id: 2,
    productName: "Rise",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-nighthawk-da-11-400x400.png",
    quantity: 1,
    price: 219000,
  },
];

const Cart = inject(Stores.OrderStore)(
  observer((props: IProps) => {
    const { orderStore } = props;
    const [provinces, setProvinces] = useState<any>([]);
    const [province, setProvince] = useState<any>(null);
    const [districts, setDistricts] = useState<any>([]);
    const [district, setDistrict] = useState<any>(null);
    const [wards, setWards] = useState<any>([]);
    const [form] = Form.useForm();

    const initalValues = {
      paymentType: 1,
      shippingType: 1,
    };

    const fetchDistricts = async (id: any) => {
      const districtsResponse = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${id}`
      );
      if (districtsResponse.status) {
        const data: any = [];
        districtsResponse.data.results.map((district) => {
          data.push({
            value: district.district_id,
            label: district.district_name,
          });
        });
        setDistricts(data);
      }
    };

    const fetchWards = async (id: any) => {
      const wardsResponse = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${id}`
      );
      if (wardsResponse.status) {
        const data: any = [];
        wardsResponse.data.results.map((ward) => {
          data.push({
            value: ward.ward_id,
            label: ward.ward_name,
          });
        });
        setWards(data);
      }
    };

    useEffect(() => {
      const fetchProvinces = async () => {
        const provincesResponse = await axios.get(
          "https://vapi.vnappmob.com/api/province"
        );
        if (provincesResponse.status) {
          const data: any = [];
          provincesResponse.data.results.map((province) => {
            data.push({
              value: province.province_id,
              label: province.province_name,
            });
          });
          setProvinces(data);
        }
      };
      fetchProvinces();
      form.setFieldsValue(initalValues);
    }, []);

    useEffect(() => {
      fetchDistricts(province);
    }, [province]);

    useEffect(() => {
      fetchWards(district);
    }, [district]);

    const handleChangeProvice = (value) => {
      setProvince(value);
      setDistricts([]);
      setDistrict(null);
      setWards([]);
      form.setFieldsValue({
        district: undefined,
        ward: undefined,
      });
    };

    const handleChangeDistrict = (value) => {
      setDistrict(value);
      setWards([]);
    };

    const getProducts = () => {
      const products: any = [];
      orderStore.shoppingCart.map((item: any) => {
        products.push({
          productId: item.productId,
          quantity: item.quantity,
        });
      });
      return products;
    };

    const onFinish = async (values: any) => {
      values.province = provinces.find((x) => x.value == values.province).label;
      values.district = districts.find((x) => x.value == values.district).label;
      values.ward = wards.find((x) => x.value == values.ward).label;
      const products = getProducts();
      const newOrder = {
        ...values,
        paymentMethodId: values.paymentMethodId,
        products,
        shippingFee: 0,
        amount: 0,
        userId: "0",
      };
      await orderStore.createOrder(newOrder);
    };
    return (
      <Row className="p-5 gap-3">
        <Col span={14} className="flex flex-col gap-2">
          <Row>
            <Form
              form={form}
              onFinish={onFinish}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              className="w-full"
            >
              <Row className="py-2 text-2xl font-semibold">
                THÔNG TIN VẬN CHUYỂN
              </Row>
              <Row className="w-full">
                <Col span={10} className="w-full min-w-full">
                  <Form.Item
                    className="w-full min-w-full"
                    name="receiveName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên người nhận",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập họ và tên"
                      className="w-full min-w-full"
                    />
                  </Form.Item>
                </Col>
                <Col span={10} className="min-w-full">
                  <Form.Item
                    className="w-full min-w-full"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại người nhận",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Nhập số điện thoại"
                      className="w-full min-w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row className="flex-wrap">
                <Col span={8} className="flex-1">
                  <Form.Item
                    className="flex-grow"
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn tỉnh/thành phố",
                      },
                    ]}
                  >
                    <Select
                      className="w-full"
                      options={provinces && provinces}
                      onChange={(value) => handleChangeProvice(value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8} className="flex-1">
                  <Form.Item
                    name="district"
                    rules={[
                      { required: true, message: "Vui lòng chọn quận/huyện" },
                    ]}
                  >
                    <Select
                      options={districts && districts}
                      onChange={(value) => handleChangeDistrict(value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8} className="flex-1">
                  <Form.Item
                    name="ward"
                    rules={[
                      { required: true, message: "Vui lòng chọn phường/xã" },
                    ]}
                  >
                    <Select options={wards && wards} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="addressDetail"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ nhận hàng",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item name="paymentMethodId">
                <Select
                  options={[
                    { value: 1, label: "COD" },
                    { value: 2, label: "Momo" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="shippingMethodId">
                <Select
                  options={[
                    { value: 1, label: "GHTK" },
                    { value: 2, label: "GHN" },
                  ]}
                />
              </Form.Item>
              <Form.Item style={{ display: "none" }}>
                <Button htmlType="submit" id="submit-btn">
                  submit
                </Button>
              </Form.Item>
            </Form>
          </Row>
          <Divider />
          <Row className="justify-between items-center">
            <p>Thành tiền: </p>
            <p>{orderStore.getTotalShoppingCart().toLocaleString()} đ</p>
          </Row>
          <Divider />
          <Row className="justify-between items-center">
            <p>Thành tiền: </p>
            <p>{orderStore.getTotalShoppingCart().toLocaleString()} đ</p>
          </Row>
          <Row>
            <Button
              onClick={() => document.getElementById("submit-btn")?.click()}
              className="w-full flex justify-center items-center px-5 py-2 text-white bg-[#FFAC00]"
            >
              Thanh toán
            </Button>
          </Row>
        </Col>
        <Col span={1}>
          <Divider type="vertical" className="h-full" />
        </Col>
        <Col span={8}>
          <Row className="justify-between items-center py-2">
            <p className="font-bold text-xl">
              Giỏ hàng ({orderStore.shoppingCart.length})
            </p>
          </Row>
          <Divider />
          {dummy &&
            dummy.map((item: any) => {
              return (
                <Row className="my-2">
                  <Col className="flex justify-center items-center">
                    <img
                      src={item.image}
                      className="w-[140px] h-[140px] pr-2"
                      alt="item"
                    />
                  </Col>
                  <Col style={{ width: "calc(100% - 200px)" }}>
                    <Row className="justify-start items-center">
                      <p className="text-2xl capitalize">{item.productCode}</p>
                    </Row>
                    <Row className="justify-between items-center py-3">
                      <p>{item.price} VND</p>
                      <CloseOutlined
                        onClick={() =>
                          orderStore.editShoppingCart(
                            item.productId,
                            undefined,
                            "remove"
                          )
                        }
                      />
                    </Row>
                    <Row className="gap-2 justify-start items-center">
                      <p className="font-bold ">Số lượng:</p>
                      <Button
                        className="w-[40px] h-[40px] flex justify-center items-center"
                        onClick={() =>
                          orderStore.editShoppingCart(
                            item.productId,
                            Number(item.quantity) - 1,
                            "update"
                          )
                        }
                      >
                        <MinusOutlined />
                      </Button>
                      <InputNumber
                        // min={1}
                        // max={editProduct.quantity}
                        defaultValue={item.quantity}
                        value={item.quantity}
                        onChange={(value) =>
                          orderStore.editShoppingCart(
                            item.productId,
                            value,
                            "update"
                          )
                        }
                        className="w-[60px] h-[40px] flex justify-center items-center"
                      />
                      <Button
                        className="w-[40px] h-[40px] flex justify-center items-center"
                        onClick={() =>
                          orderStore.editShoppingCart(
                            item.productId,
                            Number(item.quantity) + 1,
                            "update"
                          )
                        }
                      >
                        <PlusOutlined />
                      </Button>
                    </Row>
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    );
  })
);

export default Cart;
