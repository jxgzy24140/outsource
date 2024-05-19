import withRouter from "@/components/Layout/Router/withRouter";
import AccountStore from "@/stores/accountStore";
import Stores from "@/stores/storeIdentifier";
import {
  Button,
  Col,
  Form,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { localeData, weekdays } from "moment";
import dayjs from "dayjs";
import { EditOutlined } from "@ant-design/icons";
dayjs.extend(weekdays);
dayjs.extend(localeData);

interface IProps {
  navigate: any;
  accountStore: AccountStore;
}

const roles = [
  {
    value: 1,
    label: <p>Customer</p>,
  },
  {
    value: 2,
    label: <p>Admin</p>,
  },
];

const columns: any = ({
  navigate,
  accountStore,
  onOpenEditModal,
  onConfirmUpdate,
}) => [
  {
    title: "ID",
    render: (_, record, index) => <p className="text-center"> {record.id}</p>,
  },
  {
    title: "Quyền",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Tên",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Ngày Tạo",
    key: "createdDate",
    render: (record) => (
      <p>
        {record.createdDate != null
          ? dayjs(record.createdDate).format("YYYY-MM-DD HH:mm:ss")
          : ""}
      </p>
    ),
  },
  {
    title: "Ngày Cập Nhật",
    key: "updatedDate",
    render: (record) => (
      <p>
        {record.createdDate != null
          ? dayjs(record.updatedDate).format("YYYY-MM-DD HH:mm:ss")
          : " "}
      </p>
    ),
  },
  {
    title: "Hành Động",
    key: "action",
    render: (record: any) => {
      const confirm = async () => {
        const result = await accountStore.deleteUser(record.id);
        if (result) toast("Xóa thành công!");
        else toast("Xóa thất bại");
      };

      return (
        <Space size="middle">
          <a
            className="flex items-center gap-x-1"
            onClick={() => onOpenEditModal(record)}
          >
            <EditOutlined />
            Chỉnh sửa
          </a>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc sẽ xóa người dùng này?"
            onConfirm={confirm}
            okText="Có"
            cancelText="Hủy"
            okButtonProps={{ className: "bg-blue-500 text-white" }}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];

const Account = inject(Stores.AccountStore)(
  observer((props: IProps) => {
    const { navigate, accountStore } = props;
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, _setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editRow, setEditRow] = useState<any>(null);
    const [form] = Form.useForm();
    const showModal = async (record: any) => {
      console.log("record: ", record);
    };

    const initValues = async () => {
      await accountStore.getUsers(pageNumber, pageSize);
    };
    useEffect(() => {
      initValues();
    }, [pageNumber]);

    const onOpenEditModal = async (record: any) => {
      setEditRow(record);
      form.setFieldsValue(record);
      setIsModalOpen(true);
    };

    const onChangeCurrentPage = (page) => {
      setPageNumber(page);
    };

    const onCloseModal = () => {
      setIsModalOpen(false);
      setEditRow(null);
    };

    const onFinish = async ({ roleId }) => {
      if (roleId != editRow.roleId) {
        const input = { ...editRow, roleId };
        const result = await accountStore.updateUser(editRow.id, input);
        if (result) toast("Cập nhật thành công!");
        else toast("Cập nhật thất bại!");
      }
    };

    return (
      <Col className="mx-auto min-h-screen h-full">
        <Table
          rowKey={Math.random().toString()}
          columns={columns({
            navigate,
            accountStore,
            showModal,
            onOpenEditModal,
          })}
          dataSource={accountStore.users?.items}
          pagination={{
            pageSize,
            total: accountStore.users?.total,
            onChange: onChangeCurrentPage,
          }}
        />
        <Modal
          title="Cập nhật"
          open={isModalOpen}
          onCancel={onCloseModal}
          footer={[
            <Button
              key="1"
              onClick={() => {
                setIsModalOpen(false);
                document.getElementById("submit-btn")?.click();
              }}
              className="bg-blue-500 text-white"
            >
              Lưu Thay Đổi
            </Button>,
          ]}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="roleId">
              <Select options={roles} />
            </Form.Item>
            <Form.Item style={{ display: "none" }}>
              <Button htmlType="submit" id="submit-btn"></Button>
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    );
  })
);
export default withRouter(Account);
