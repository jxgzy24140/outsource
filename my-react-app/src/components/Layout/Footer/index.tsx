import { Button, Col, Input, Layout, Row } from "antd";
import React from "react";

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        width: "100%",
        borderTop: "1px solid black",
        backgroundColor: "#ffffff",
      }}
    >
      <Row className="justify-between">
        <Col>
          <Row className="gap-x-4">
            <Col>
              <p className="text-sm pb-1 font-medium text-slate-950">NAM</p>
              <p className="py-1 text-sm font-light text-gray-600">
                Đồng hồ nam
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Dây đồng hồ nam
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Trang sức nam
              </p>
              <p className="py-1 text-sm font-light text-gray-600">Quà tặng</p>
              <p className="py-1 text-sm font-light text-gray-600">
                New Arrivals
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Best Sellers
              </p>
            </Col>
            <Col>
              <p className="text-sm pb-1 font-medium text-slate-950">NỮ</p>
              <p className="py-1 text-sm font-light text-gray-600">
                Đồng hồ nữ
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Dây đồng hồ nữ
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Trang sức nữ
              </p>
              <p className="py-1 text-sm font-light text-gray-600">Quà tặng</p>
              <p className="py-1 text-sm font-light text-gray-600">
                New Arrivals
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Best Sellers
              </p>
            </Col>
            <Col>
              <p className="text-sm pb-1 font-medium text-slate-950">
                QUÀ TẶNG
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Cho anh ấy
              </p>
              <p className="py-1 text-sm font-light text-gray-600">Cho bạn</p>
              <p className="py-1 text-sm font-light text-gray-600">Cho bố</p>
              <p className="py-1 text-sm font-light text-gray-600">Cho cô ấy</p>
              <p className="py-1 text-sm font-light text-gray-600">Cho mẹ</p>
              <p className="py-1 text-sm font-light text-gray-600">
                Cho người yêu
              </p>
            </Col>
            <Col>
              <p className="text-sm pb-1 font-medium text-slate-950">
                VỀ CHÚNG TÔI
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Về chúng tôi
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Cho doanh nghiệp
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Chính sách đổi trả
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                Chính sách vận chuyển
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                cskh@curnonwatch.com
              </p>
              <p className="py-1 text-sm font-light text-gray-600">
                0868889103
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="text-sm font-medium text-slate-950">
              Nhận thông tin mới nhất từ CURNON
            </p>
          </Row>
          <Row className="py-2 gap-x-2">
            <Col span={10}>
              <Input placeholder="Nhập số điện thoại" />
            </Col>
            <Col span={12}>
              <Input placeholder="Nhập họ và tên" />
            </Col>
          </Row>
          <Row>
            <Input placeholder="Nhập Email" />
          </Row>
          <Row>
            <Button className="w-full flex justify-center items-center text-white bg-[#1a1a1a] text-lg font-semibold mt-2 rounded-none">
              Đăng ký ngay
            </Button>
          </Row>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
