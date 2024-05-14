import withRouter from "@/components/Layout/Router/withRouter";
import AccountStore from "@/stores/accountStore";
import Stores from "@/stores/storeIdentifier";
import {
  Button,
  Col,
  Form,
  Input,
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
dayjs.extend(weekdays);
dayjs.extend(localeData);

interface IProps {
  navigate: any;
  accountStore: AccountStore;
}

const options = [
  { value: true, label: "Active" },
  { value: false, label: "InActive" },
];

const roleOptions = [
  { value: 1, label: "Customer" },
  { value: 2, label: "Admin" },
];

const columns: any = ({ navigate, accountStore, showModal }) => [
  {
    title: "#",
    render: (_, record, index) => <p className="text-center"> {index}</p>,
  },
  {
    title: "Full Name",
    key: "fullName",
    render: (record: any) => (
      <p className="text-center">
        {record.firstName} {record.lastName}
      </p>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Gender",
    key: "gender",
    render: (record: any) => (record.gender == true ? "Male" : "Female"),
  },
  {
    title: "Active",
    key: "active",
    render: (record: any) => {
      const bgColorClass = record.active ? "bg-blue-500" : "bg-red-500";
      const classNames = `px-2 py-1 text-white text-center ${bgColorClass}`;
      return (
        <p className={classNames}>{record.active ? "Active" : "InActive"}</p>
      );
    },
  },
  {
    title: "Role",
    key: "role",
    render: (record: any) => {
      const bgColorClass = record.roleId == 1 ? "bg-blue-500" : "bg-orange-500";
      const classNames = `px-2 py-1 text-white text-center ${bgColorClass}`;
      return (
        <p className={classNames}>
          {record.roleId == 1 ? "Customer" : "Admin"}
        </p>
      );
    },
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (image) => (
      <img className="w-[50px] h-[50px]" src={image ?? image} alt={"avatar"} />
    ),
  },
  {
    title: "Created Date",
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
    title: "Last Updated",
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
    title: "Action",
    key: "action",
    render: (record: any) => {
      const confirm = async () => {
        const result = await accountStore.deleteUser(record.userId);
        if (result) toast("Deleted success");
        else toast("Deleted failed");
      };

      return (
        <Space size="middle">
          <Button onClick={() => showModal(record.userId)}>Edit</Button>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc sẽ xóa người dùng này?"
            onConfirm={confirm}
            okText="Có"
            cancelText="Hủy"
            okButtonProps={{ className: "bg-blue-500 text-white" }}
          >
            <Button danger>Delete</Button>
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
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const showModal = async (id: any) => {
      await accountStore.getUser(id);
      const result: any = accountStore.editUser;
      form.setFieldValue("userId", result.userId);
      form.setFieldValue("email", result.email);
      form.setFieldValue("roleId", result.roleId);
      form.setFieldValue("active", result.active);
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
      accountStore.cleanUp();
    };
    useEffect(() => {
      init();
    }, []);

    const init = async () => {
      await accountStore.getUsers(pageNumber, pageSize);
    };

    const onFinish = async (values: any) => {
      Modal.confirm({
        onOk: async () => {
          const updatedResult = await accountStore.updateUserRoleAndActive(
            values.userId,
            {
              userId: values.userId,
              roleId: values.roleId,
              active: values.active,
            }
          );
          if (updatedResult) toast("Updated success!");
          else toast("Updated failed");
        },
        okText: "Xác nhận yêu cầu!",
      });

      handleCancel();
    };

    return (
      <Col className="mx-auto min-h-full h-full">
        <Table
          columns={columns({ navigate, accountStore, showModal })}
          dataSource={accountStore.users?.items && accountStore.users?.items}
          pagination={{ pageSize }}
        />
        <Modal
          title="Edit"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="userId" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item name="active">
              <Select options={options} />
            </Form.Item>
            <Form.Item name="roleId">
              <Select options={roleOptions} />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-blue-500 text-white ml-2"
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    );
  })
);
export default withRouter(Account);
