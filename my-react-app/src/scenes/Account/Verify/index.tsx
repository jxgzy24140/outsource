import withRouter from "@/components/Layout/Router/withRouter";
import accountService from "@/services/account/accountService";
import { getParameterByName } from "@/utils/helpers";
import { Button, Result, Row } from "antd";
import React, { useEffect, useState } from "react";

interface IProps {
  navigate: any;
}

const Verify = (props: IProps) => {
  const [verifyResult, setVerifyResult] = useState<any>(false);

  useEffect(() => {
    const getParams = async () => {
      const userId = getParameterByName("userId", window.location.href);
      const secretKey = getParameterByName("secretKey", window.location.href);
      console.log(window.location.href);

      console.log(userId, secretKey);

      if (userId && secretKey) {
        const result = await accountService.verifyAccount(userId, secretKey);
        console.log(result);

        if (result) setVerifyResult(result);
        else setVerifyResult(false);
      }
    };
    getParams();
  }, []);
  return (
    <Row className="justify-center items-center">
      {verifyResult && (
        <Result
          status={verifyResult ? "success" : "error"}
          title={"Xác thực tài khoản"}
          subTitle={
            verifyResult
              ? "Xác thực tài khoản thành công!"
              : "Xác thực tài khoản thất bại"
          }
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => props.navigate("/auth/login")}
            >
              Đăng nhập ngay
            </Button>,
            <Button key="buy">Trang chủ</Button>,
          ]}
        />
      )}
    </Row>
  );
};

export default withRouter(Verify);
