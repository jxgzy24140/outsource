import { Button, Col, Input, Form, Row } from "antd";
import withRouter from "@/components/Layout/Router/withRouter";
import accountService from "@/services/account/accountService";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import { authLayouts } from "@/components/Layout/Router/router.config";

interface IProps {
  navigate: any;
}

const Register = (props: IProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: any) => {
    console.log("values: ", values);

    // setIsLoading(true);
    // const result = await accountService.createUser(values);
    // if (result && result.success) {
    //   toast("Đăng ký thành công!");
    //   return props.navigate("/auth/login");
    // }
    // setIsLoading(false);
  };
  return (
    <Row className="w-full h-full px-20 flex justify-center items-center gap-x-10">
      <Col span={8}>
        <img
          src="https://curnonwatch.com/wp-content/uploads/2023/12/Thiet_ke_chua_co_ten_11_3734c41ee7-1536x598.webp"
          alt="register"
          className="h-[50vh]"
        />
      </Col>
      <Col span={12}>
        <Form onFinish={onFinish}>
          <div className="py-2">
            <h1 className="text-2xl text-[#1a1a1a] font-semibold pb-2">
              GET MORE AS A MEMBER
            </h1>
            <p className="text-[#1a1a1a]">
              Tham gia Curnon miễn phí và khám phá quyền truy cập độc quyền vào
              các chương trình giảm giá, khuyến mãi, sản phẩm chỉ dành cho thành
              viên, v.v.
            </p>
          </div>
          <Form.Item
            name="fullName"
            className=""
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input placeholder="Họ và Tên" />
          </Form.Item>
          <Form.Item
            name="email"
            className=""
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input placeholder="Địa chỉ Email" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item>
            <p className="text-xs text-[#1a1a1a]">
              Bằng cách tạo một tài khoản, bạn đồng ý với chúng tôi về{" "}
              <u>Điều khoản và điều kiện</u> và <u>Chính sách bảo mật</u> của
              chúng tôi
            </p>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full flex justify-center items-center bg-[#1A1A1A] text-white font-bold"
              id="submit-btn"
            >
              Đăng ký thành viên
            </Button>
          </Form.Item>
          <span className="text-[#1a1a1a] py-4">
            Bạn đã có tài khoản?{" "}
            <Link to={"login"}>
              <u>Đăng nhập</u>
            </Link>
          </span>
        </Form>
      </Col>
    </Row>
  );
};
export default withRouter(Register);
