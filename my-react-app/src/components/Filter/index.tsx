import { getQuery } from "@/utils/helpers";
import { Col, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";

interface IProps {
  onPriceChange: (value: any) => void;
  onSortedChange: (value: any) => void;
}

const Filter = (props: IProps) => {
  const [price, setPrice] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const getDefaultSelected = () => {
      const sorted = getQuery("sort") ?? "";
      const min = getQuery("min");
      const max = getQuery("max");
      setSortType(sorted);
      if (!min && max) setPrice(`0 ${max}`);
      if (min && !max) setPrice(`${min} 0`);
      if (!min && !max) setPrice("");
      if (min && max) setPrice(`${min} ${max}`);
    };
    getDefaultSelected();
  }, []);

  return (
    <Col className="p-2">
      <Row className="py-2">
        <h2 className="text-xl font-bold">BỘ LỌC</h2>
      </Row>
      <Row>
        <div>
          <Row className="items-center py-2">
            <p className="text-sm font-bold w-[150px]">Khoảng giá</p>
            <Radio.Group
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                props.onPriceChange(e);
              }}
              className="flex gap-x-2"
            >
              <Radio.Button
                value="1000000 0"
                className="flex justify-center items-center p-3 border border-grey-300 rounded-none"
              >
                Dưới 1 triệu
              </Radio.Button>
              <Radio.Button
                value="1000000 2000000"
                className="flex justify-center items-center p-3 border border-grey-300 rounded-none"
              >
                1 triệu - 2 triệu
              </Radio.Button>
              <Radio.Button
                value="2000000 3000000"
                className="flex justify-center items-center p-3 border border-grey-300 rounded-none"
              >
                2 triệu - 3 triệu
              </Radio.Button>
              <Radio.Button
                value="3000000 0"
                className="flex justify-center items-center p-3 border border-grey-300 rounded-none"
              >
                Trên 3 triệu
              </Radio.Button>
            </Radio.Group>
          </Row>
          <Row className="items-center py-2">
            <p className="text-sm font-bold w-[150px]">Sắp xếp theo</p>
            <Radio.Group
              value={sortType}
              onChange={props.onSortedChange}
              className="flex gap-x-2"
            >
              <Radio.Button
                value="desc"
                className="flex justify-center items-center p-3 border border-grey-300 rounded-none"
              >
                Giá tăng dần
              </Radio.Button>
              <Radio.Button
                value="asc"
                className="flex justify-center items-center p-3 border border-grey-300 rounded-none"
              >
                Giá giảm dần
              </Radio.Button>
              <Radio.Button
                value="name"
                className="flex justify-center items-center p-3 border border-grey-300 rounded-none"
              >
                Tên A-Z
              </Radio.Button>
            </Radio.Group>
          </Row>
        </div>
      </Row>
    </Col>
  );
};

export default Filter;
