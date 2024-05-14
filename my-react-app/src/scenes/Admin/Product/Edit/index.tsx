import withRouter from "@/components/Layout/Router/withRouter";
import { Button, Col, Form, Input, InputNumber, Select, Upload } from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import ProductStore from "@/stores/productStore";
import CategoryStore from "@/stores/categoryStore";
import { toast } from "react-toastify";

// Layout cho Form
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
  navigate: any;
  params: any;
  location: any;
  productStore: ProductStore;
  categoryStore: CategoryStore;
}

const Edit = inject(
  Stores.ProductStore,
  Stores.CategoryStore
)(
  observer((props: IProps) => {
    const { navigate, productStore, categoryStore, params } = props;
    const { id } = params;
    const [form] = Form.useForm();
    useEffect(() => {
      getProduct(id);
    }, []);

    const getProduct = async (id: any) => {
      await productStore.get(id);
      await categoryStore.getAll(1, 10);
      form.setFieldsValue(props.productStore.editProduct);
      form.setFieldValue(
        "inStock",
        productStore.editProduct?.inStock == true ? "true" : "false"
      );
      if (productStore.editProduct && productStore.editProduct?.image) {
        fileList[0].url = productStore.editProduct?.image as string;
        fileList[0].name = productStore.editProduct?.image as string;
      }
    };

    const [fileList, setFileList] = useState<any[]>([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "",
      },
    ]);

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
      const result: any = await productStore.update(values.productId, values);
      if (result?.success) {
        toast.success("Cập nhật sản phẩm thành công!", {
          autoClose: 2000,
        });
        setTimeout(() => navigate(-1), 2500);
      } else {
        toast.error(`Cập nhật thất bại!, ${result.message}`, {
          delay: 2000,
        });
      }
    };

    return (
      <Col className="mx-auto min-h-full h-full md:p-6 2xl:p-10">
        <div className="py-3">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <LeftOutlined /> Trở lại
          </span>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          variant="filled"
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="productId" style={{ display: " none" }}>
            <Input />
          </Form.Item>

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
            <Select>
              {categoryStore?.categories?.items &&
                categoryStore?.categories?.items.map((category: any) => {
                  return (
                    <Option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryName}
                    </Option>
                  );
                })}
            </Select>
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
                <button style={{ border: 0, background: "none" }} type="button">
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
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} max={100} />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item
            name="inStock"
            label="In Stock"
            rules={[{ required: true, message: "Please select InStock!" }]}
          >
            <Select placeholder="Select your InStock">
              <Option value={"true"}>Yes</Option>
              <Option value={"false"}>No</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Col>
    );
  })
);
export default withRouter(Edit);
