import withRouter from "@/components/Layout/Router/withRouter";
import {
  faArrowDown,
  faArrowUp,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import React from "react";

const Dashboard = () => {
  return (
    <Col className="mx-auto min-h-full h-full md:p-6 2xl:p-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-[1.875rem]">
        {/* Card Item Total Profit */}
        <div className="rounded-sm border bg-white px-[30px] py-6 shadow-md">
          <div className="flex h-[2.875rem] w-[2.875rem] items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon className="text-[#3d51e0]" icon={faShoppingCart} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black text-2xl leading-9">3 VND</h4>
              <span className="text-sm font-medium text-gray-500">
                Total Profit
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta text-green-500">
              0.43%
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </div>
        </div>

        {/* Có nên thêm tổng đơn hàng ? hoặc thêm một cái gì khác hoặc chỉ để 3 thẻ */}
        {/* Card Item Total Orders */}
        <div className="rounded-sm border bg-white px-[30px] py-6 shadow-md">
          <div className="flex h-[2.875rem] w-[2.875rem] items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon className="text-[#3d51e0]" icon={faShoppingCart} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black text-2xl leading-9">12</h4>
              <span className="text-sm font-medium text-gray-500">
                Total Orders
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta text-green-500">
              0.43%
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </div>
        </div>

        {/* Card Item Total Products */}
        <div className="rounded-sm border bg-white px-[30px] py-6 shadow-md">
          <div className="flex h-[2.875rem] w-[2.875rem] items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon className="text-[#3d51e0]" icon={faShoppingCart} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black text-2xl leading-9">0</h4>
              <span className="text-sm font-medium text-gray-500">
                Total Products
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta text-green-500">
              0.43%
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </div>
        </div>

        {/* Card Item Total Users */}
        <div className="rounded-sm border bg-white px-[30px] py-6 shadow-md">
          <div className="flex h-[2.875rem] w-[2.875rem] items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon className="text-[#3d51e0]" icon={faShoppingCart} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black text-2xl leading-9">1</h4>
              <span className="text-sm font-medium text-gray-500">
                Total Users
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta text-red-500">
              0.43%
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </div>
        </div>
      </div>
    </Col>
  );
};
export default withRouter(Dashboard);
