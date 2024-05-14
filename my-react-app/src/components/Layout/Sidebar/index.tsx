import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import { Col } from "antd";

interface IProps {}
const Sidebar = inject(Stores.ProductStore)(
  observer((props: IProps) => {
    return (
      <Col className="bg-[#1a1a1a] h-full">
        <div className="py-4 px-6">
          <h3 className="mb-4 ml-4 text-sm font-medium text-gray-500">
            DASHBOARD
          </h3>
          <ul className="mb-6 flex flex-col">
            <li className="mb-1.5">
              <a className="flex items-center rounded-sm px-4 py-2 font-medium text-gray-200 duration-300 ease-in-out hover:bg-gray-700 ">
                <span className="flex items-center">Home Page</span>
              </a>
            </li>

            <li className="mb-1.5">
              <a className="flex items-center rounded-sm px-4 py-2 font-medium text-gray-200 duration-300 ease-in-out hover:bg-gray-700">
                <span className="flex items-center mr-4">Account</span>
              </a>
            </li>
            <li className="mb-1.5">
              <a className="flex items-center rounded-sm px-4 py-2 font-medium text-gray-200 duration-300 ease-in-out hover:bg-gray-700">
                <span className="flex items-center">Product</span>
              </a>
            </li>
            <li className="mb-1.5">
              <a className="flex items-center rounded-sm px-4 py-2 font-medium text-gray-200 duration-300 ease-in-out hover:bg-gray-700">
                <span className="flex items-center">Orders</span>
              </a>
            </li>
          </ul>
        </div>
      </Col>
    );
  })
);

export default Sidebar;
