import withRouter from "@/components/Layout/Router/withRouter";
import Stores from "@/stores/storeIdentifier";
import { Col, Table, Row, Modal, Form, Select } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { localeData, weekdays } from "moment";
import dayjs from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import OrderStore from "@/stores/orderStore";
dayjs.extend(weekdays);
dayjs.extend(localeData);
let orderStatusOptions = [
  {
    value: 1,
    label: "Đang Xử Lý",
  },
  {
    value: 2,
    label: "Vận Chuyễn",
  },
  {
    value: 3,
    label: "Hủy Đơn",
  },
];
const columns = ({ getOrderDetail, onOrderStatusChange }) => [
  {
    title: "Mã Đơn Hàng",
    render: (record: any) => <p> {record.id}</p>,
  },
  {
    title: "Trạng Thái",
    key: "orderStatusId",
    render: (record: any) => {
      return (
        <Select
          options={
            (orderStatusOptions = orderStatusOptions.map((item: any) => {
              if (item.value < record.orderStatusId) item.disabled = true;
              return item;
            }))
          }
          defaultValue={record.orderStatusId}
          onChange={(value) => onOrderStatusChange(record.id, value)}
        />
      );
    },
  },
  {
    title: "Tên Người Nhận",
    dataIndex: "receivedName",
    key: "receivedName",
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Địa Chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tổng Đơn Hàng",
    key: "total",
    render: (record: any) => (
      <p>
        {record.orderDetails.reduce((sum, detail) => {
          return sum + detail.price * detail.quantity;
        }, 0)}{" "}
        VND
      </p>
    ),
  },
  {
    title: "Ngày Tạo Đơn Hàng",
    key: "createdDate",
    render: (record: any) => (
      <p>
        {record.createdDate != null
          ? dayjs(record.createdDate).format("YYYY-MM-DD HH:mm:ss")
          : "Invalid Date"}
      </p>
    ),
  },
  {
    title: "Cập Nhật Lần Cuối",
    key: "updatedDate",
    render: (record: any) => (
      <p>
        {record.updatedDate != null
          ? dayjs(record.updatedDate).format("YYYY-MM-DD HH:mm:ss")
          : "Invalid Date"}
      </p>
    ),
  },
  {
    title: "Hành Động",
    key: "action",
    render: (_, record) => {
      return (
        <a className="flex gap-x-2" onClick={() => getOrderDetail(record)}>
          <ExclamationCircleOutlined />
          <p>Chi tiết</p>
        </a>
      );
    },
  },
];

interface IProps {
  orderStore: OrderStore;
  navigate: any;
}

const Order = inject(Stores.OrderStore)(
  observer((props: IProps) => {
    const { orderStore } = props;
    const [pageNumber, _setPageNumber] = useState<number>(1);
    const [pageSize, _setPageSize] = useState<number>(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);

    const [_form] = Form.useForm();
    const [_editForm] = Form.useForm();

    useEffect(() => {
      const initValues = async () => {
        await orderStore.getOrders(pageNumber, pageSize);
      };

      initValues();
    }, []);

    const handleOk = () => {
      document.getElementById("submit-btn")?.click();
    };

    const getOrderDetail = (record) => {
      setOrderDetails(record.orderDetails);
      setIsModalOpen(true);
    };

    const onCloseModal = () => {
      setIsModalOpen(false);
      setOrderDetails([]);
    };

    const onOrderStatusChange = async (id, value) => {
      const result = await orderStore.updateOrder(id, {
        id: id,
        orderStatusId: value,
      });
      if (result) toast("Cập nhật trạng thái đơn hàng thành công!");
      else toast("Cập nhật thất bại!");
    };

    return (
      <Col className="mx-auto h-full">
        <Table
          columns={columns({ getOrderDetail, onOrderStatusChange })}
          dataSource={orderStore?.orders?.items}
          pagination={{ pageSize: pageSize }}
        />
        <Modal
          title={"Chi Tiết Đơn Hàng"}
          open={isModalOpen}
          onCancel={onCloseModal}
          footer={false}
          onOk={handleOk}
        >
          {orderDetails?.map((item: any) => {
            return (
              <Row className="w-full gap-3 py-4">
                <Col>
                  <img className="w-[60px] h-[60px]" src={item.image} alt="" />
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
            );
          })}
        </Modal>
      </Col>
    );
  })
);
export default withRouter(Order);
