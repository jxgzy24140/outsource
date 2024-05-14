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
  Upload,
  Switch,
} from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { localeData, weekdays } from "moment";
import dayjs from "dayjs";
import { adminLayouts } from "@/components/Layout/Router/router.config";
import { PlusOutlined } from "@ant-design/icons";
import CategoryStore from "@/stores/categoryStore";
import { toast } from "react-toastify";
dayjs.extend(weekdays);
dayjs.extend(localeData);

const columns = ({ productStore, navigate }) => [
  {
    title: "#",
    render: (record: any) => <p> {record.productId}</p>,
  },
  {
    title: "Category Name",
    dataIndex: "categoryName",
    key: "CategoryName",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "ProductName",
  },
  {
    title: "Product Code",
    dataIndex: "productCode",
    key: "ProductCode",
  },
  {
    title: "Image",
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
    title: "Price",
    dataIndex: "price",
    key: "Price",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "Discount",
  },
  {
    title: "Quantity",
    key: "Quantity",
    render: (record: any) => {
      if (record.quantity != 0)
        return (
          <p className="px-2 py-1 bg-blue-500 text-white  text-center">
            {record.quantity}
          </p>
        );
      return (
        <p className="px-2 py-1 bg-red-500 text-white text-center">Hết hàng!</p>
      );
    },
  },
  {
    title: "In Stock",
    key: "InStock",
    render: (record: any) => {
      const bgColorClass = record.inStock ? "bg-blue-500" : "bg-red-500";
      const classNames = `px-2 py-1 text-white text-center ${bgColorClass}`;
      return <p className={classNames}>{record.inStock ? "Yes" : "No"}</p>;
    },
  },
  {
    title: "Creator",
    dataIndex: "creatorName",
    key: "CreatorName",
  },
  {
    title: "Created Date",
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
    title: "Last Updated",
    key: "LastUpdated",
    render: (record: any) => (
      <p>
        {record.updatedDate != null
          ? dayjs(record.updatedDate).format("YYYY-MM-DD HH:mm:ss")
          : "Invalid Date"}
      </p>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      const confirm = async () => {
        await productStore.delete(record.productId);
      };
      return (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(
                adminLayouts.product.path.replace(
                  "products/:id",
                  record.productId
                )
              )
            }
          >
            Edit
          </a>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc sẽ xóa sản phẩm này?"
            onConfirm={confirm}
            okText="Có"
            cancelText="Hủy"
          >
            <Button danger>Delete</Button>
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
const options = [
  { label: "1", value: 1 },
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
];
const Product = inject(
  Stores.ProductStore,
  Stores.CategoryStore
)(
  observer((props: IProps) => {
    const { productStore, categoryStore, navigate } = props;
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [form] = Form.useForm();
    useEffect(() => {
      initValue();
    }, []);

    const initValue = async () => {
      await productStore.getAll(pageNumber, pageSize);
    };

    const handleOpenCreateModal = async () => {
      await Promise.all([categoryStore.getAll(1, 10)]);
      form.setFieldsValue({
        id: categoryStore?.categories?.items[0]?.id,
        inStock: true,
      });
      productStore.createProduct();
      setIsModalOpen(true);
    };

    const onChange = (values: any) => {
      if (values.file.status == "removed") setFileList([]);
      if (values.file.status == "uploading")
        setFileList([
          {
            uid: "-1",
            name: values.file.name,
            status: "done",
            url: URL.createObjectURL(values.file.originFileObj),
            originFileObj: values.file.originFileObj,
          },
        ]);
    };

    const onPreview = async (file: any) => {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as any);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    };

    const onRemove = (values: any) => {
      setFileList([]);
    };

    const onFinish = async (values: any) => {
      if (fileList[0]?.originFileObj) {
        values.imageFile = fileList[0]?.originFileObj;
      }
      const payload = {
        ...values,
        creationId: 0,
        imageFile: fileList[0]?.originFileObj,
      };
      const result: any = await productStore.create(payload);
      if (result) {
        toast.success("Thêm sản phẩm thành công!", {
          autoClose: 2000,
        });
        setTimeout(() => setIsModalOpen(false), 2500);
      } else
        toast.error(`Thêm sản phẩm thất bại!, ${result.message}`, {
          delay: 2000,
        });
    };

    const handleOk = () => {
      document.getElementById("submit-btn")?.click();
    };

    return (
      <Col className="mx-auto h-full">
        <Row className="justify-between items-center py-2">
          <Select
            options={options}
            defaultValue="10"
            onChange={(value: any) => setPageSize(value)}
          />
          <Button
            type="primary"
            className="flex justify-center items-center"
            onClick={handleOpenCreateModal}
          >
            Thêm mới <PlusOutlined />
          </Button>
        </Row>
        <Table
          columns={columns({ productStore, navigate })}
          dataSource={
            productStore?.products?.items ?? productStore?.products?.items
          }
          pagination={{ pageSize: pageSize }}
        />
        <Modal
          title="Thêm sản phẩm mới"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
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
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Product Code"
              name="productCode"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true }]}
            >
              <Select
                options={categoryStore?.categories?.items.map((item) => ({
                  value: item.id,
                  label: item.categoryName,
                }))}
                defaultValue={1}
              />
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brandId"
              rules={[{ required: true }]}
            >
              <Select
                options={categoryStore?.categories?.items.map((item) => ({
                  value: item.id,
                  label: item.categoryName,
                }))}
                defaultValue={1}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Upload" valuePropName="fileList">
              <Upload
                action="/upload.do"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                onRemove={onRemove}
              >
                {fileList.length === 0 ? (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                ) : null}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>

            <Form.Item
              label="Discount (%)"
              name="discount"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                type="number"
                style={{ width: "100%" }}
                min={0}
                max={100}
              />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item name="inStock" label="In Stock">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item style={{ display: "none" }}>
              <Button htmlType="submit" id="submit-btn">
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
