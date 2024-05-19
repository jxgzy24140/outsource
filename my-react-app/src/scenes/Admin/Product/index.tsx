import withRouter from "@/components/Layout/Router/withRouter";
import ProductStore from "@/stores/productStore";
import Stores from "@/stores/storeIdentifier";
import {
  Col,
  Space,
  Table,
  Popconfirm,
  Button,
  Row,
  Select,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { localeData, weekdays } from "moment";
import dayjs from "dayjs";
// import { adminLayouts } from "@/components/Layout/Router/router.config";
import { PlusOutlined } from "@ant-design/icons";
import CategoryStore from "@/stores/categoryStore";
import { toast } from "react-toastify";
dayjs.extend(weekdays);
dayjs.extend(localeData);

const columns = ({ productStore, handleOpenUpdateModal }) => [
  {
    title: "Mã Sản Phẩm",
    render: (record: any) => <p> {record.id}</p>,
  },
  {
    title: "Tên Danh Mục",
    dataIndex: "categoryName",
    key: "CategoryName",
  },
  {
    title: "Tên Sản Phẩm",
    dataIndex: "productName",
    key: "ProductName",
  },
  {
    title: "Hình Ảnh",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img
        className="w-[150px] h-[150px] object-contain"
        src={image}
        alt={image}
      />
    ),
  },
  {
    title: "Giá Bán",
    dataIndex: "price",
    key: "Price",
  },
  {
    title: "Số Lượng",
    key: "Quantity",
    render: (record: any) => {
      if (record.quantity != 0)
        return <p className="px-2 py-1 text-center">{record.quantity}</p>;
      return <p className="px-2 py-1 text-center">Hết hàng!</p>;
    },
  },
  {
    title: "Ngày Tạo",
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
    title: "Cập nhật lần cuối",
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
      const confirm = async () => {
        const result = await productStore.delete(record.id);
        if (result) toast("Xóa sản phẩm thành công!");
        else toast("Xóa sản phẩm thất bại!");
      };
      return (
        <Space size="middle">
          <a onClick={() => handleOpenUpdateModal(record.id)}>Chỉnh sửa</a>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc sẽ xóa sản phẩm này?"
            onConfirm={confirm}
            okText="Có"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
interface IProps {
  productStore: ProductStore;
  categoryStore: CategoryStore;
  navigate: any;
}

const Product = inject(
  Stores.ProductStore,
  Stores.CategoryStore
)(
  observer((props: IProps) => {
    const { productStore, categoryStore } = props;
    const [pageNumber, _setPageNumber] = useState<number>(1);
    const [pageSize, _setPageSize] = useState<number>(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    useEffect(() => {
      initValue();
    }, []);

    const initValue = async () => {
      await productStore.getAll(pageNumber, pageSize);
    };

    const handleOpenCreateModal = async () => {
      await categoryStore.getAll();
      form.setFieldsValue({
        categoryId: 1,
        size: 40,
        typeId: 1,
      });
      productStore.createProduct();
      setIsModalOpen(true);
    };

    const onFinish = async (values: any) => {
      const result = await productStore.create(values);
      form.resetFields();
      if (result) toast("Thêm mới sản phẩm thành công!");
      else toast("Thêm sản phẩm thất bại!");
      setIsModalOpen(false);
    };

    const handleOpenUpdateModal = async (id: any) => {
      await Promise.all([productStore.get(id), categoryStore.getAll()]);
      editForm.setFieldsValue(productStore.editProduct);
      setIsUpdateModalOpen(true);
    };

    const onUpdateFinish = async (values: any) => {
      const result = await productStore.update(values.id, values);
      if (!result) toast("Chỉnh sửa thất bại!");
      else toast("Chỉnh sửa thành công!");
      form.resetFields();
      setIsUpdateModalOpen(false);
    };

    const handleOk = () => {
      document.getElementById("submit-btn")?.click();
    };

    return (
      <Col className="mx-auto h-full">
        <Row className="justify-between items-center py-2">
          <div className="w-full flex justify-end items-center mr-2">
            <Button
              type="text"
              className="flex justify-center items-center bg-[#626262] text-white rounded-none"
              onClick={handleOpenCreateModal}
            >
              Thêm mới <PlusOutlined />
            </Button>
          </div>
        </Row>
        <Table
          columns={columns({ productStore, handleOpenUpdateModal })}
          dataSource={productStore?.products?.items}
          pagination={{ pageSize: pageSize }}
        />
        <Modal
          title="Thêm sản phẩm mới"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button
              key="1"
              type="text"
              onClick={() => document.getElementById("submit-btn")?.click()}
              className="bg-[#626262] text-white rounded-none"
            >
              Thêm
            </Button>,
          ]}
          onOk={handleOk}
        >
          <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            variant="filled"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="productName"
              rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Hãng"
              name="categoryId"
              rules={[{ required: true }]}
            >
              <Select
                options={categoryStore?.categories?.map((item) => ({
                  value: item.id,
                  label: item.categoryName,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Giá bán"
              name="price"
              rules={[{ required: true, message: "Nhập giá bán!" }]}
            >
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: "Nhập số lượng!" }]}
            >
              <Input style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="Kích thước"
              name="size"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: 40, label: "40 mm" },
                  { value: 42, label: "42 mm" },
                  { value: 44, label: "44 mm" },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item label="Loại" name="typeId" rules={[{ required: true }]}>
              <Select
                options={[
                  { value: 1, label: "NAM" },
                  { value: 2, label: "NỮ" },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item style={{ display: "none" }}>
              <Button htmlType="submit" id="submit-btn">
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Chỉnh sửa sản phẩm"
          open={isUpdateModalOpen}
          onCancel={() => setIsUpdateModalOpen(false)}
          footer={[
            <Button
              key="1"
              type="text"
              onClick={() => document.getElementById("update-btn")?.click()}
              className="bg-[#626262] text-white rounded-none"
            >
              Lưu Thay Đổi
            </Button>,
          ]}
          onOk={handleOk}
        >
          <Form
            {...formItemLayout}
            form={editForm}
            onFinish={onUpdateFinish}
            variant="filled"
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên sản phẩm"
              name="productName"
              rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Hãng"
              name="categoryId"
              rules={[{ required: true }]}
            >
              <Select
                options={categoryStore?.categories?.map((item) => ({
                  value: item.id,
                  label: item.categoryName,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Giá bán"
              name="price"
              rules={[{ required: true, message: "Nhập giá bán!" }]}
            >
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: "Nhập số lượng!" }]}
            >
              <Input style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="Kích thước"
              name="size"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: 40, label: "40 mm" },
                  { value: 42, label: "42 mm" },
                  { value: 44, label: "44 mm" },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item label="Loại" name="typeId" rules={[{ required: true }]}>
              <Select
                options={[
                  { value: 1, label: "NAM" },
                  { value: 2, label: "NỮ" },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item style={{ display: "none" }}>
              <Button htmlType="submit" id="update-btn">
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    );
  })
);
export default withRouter(Product);
