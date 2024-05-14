import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  img: string;
  color?: string;
  backgroundColor?: string;
  outerStyles?: any;
  contentStyles?: any;
}

const Icon = (props: IProps) => {
  return (
    <Col
      style={{ ...props.outerStyles }}
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-300"
    >
      <Link to={""}>
        <img
          src={props.img}
          alt="icon"
          className="w-6 h-6"
          style={{ ...props.contentStyles }}
        />
      </Link>
    </Col>
  );
};

export default Icon;
