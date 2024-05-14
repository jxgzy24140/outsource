import "./index.css";
import withRouter from "@/components/Layout/Router/withRouter";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Col } from "antd";
import React from "react";

interface IProps {
  navigate: any;
  data: any;
  onClick: any;
}

const Product = (props: IProps) => {
  return (
    <Col
      className="flex flex-col w-1/4 cursor-pointer "
      onClick={() => props.onClick(props.data.productId)}
    >
      <div className="mx-1 my-2">
        <div className="w-full relative bg-[#f9f7f5] shadow-slate-900 container">
          <img loading="lazy" src={props.data.image} />
          <div className="add-to-cart w-[70%] absolute left-1/2 transform -translate-x-1/2 bottom-3 flex gap-x-2 justify-center items-center bg-white px-2 py-1 rounded-lg">
            <span className="font-semibold">Thêm vào giỏ hàng</span>
            <span>
              <ShoppingCartOutlined />
            </span>
          </div>
        </div>
        <div className="flex flex-col py-2 justify-start items-start">
          <h4 className="text-[#1f232c] text-left font-semibold">
            {props.data.productName}
          </h4>
          <p className="text-[#474040] text-left">{props.data.price} VND</p>
        </div>
      </div>
    </Col>
  );
};

export default withRouter(Product);
