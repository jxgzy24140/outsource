import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import { Col } from "antd";
import { NavLink } from "react-router-dom";

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
              <NavLink
                to="/admin/accounts"
                className={({ isActive }) =>
                  `flex items-center rounded-sm px-4 py-2 font-medium text-gray-200 duration-300 ease-in-out hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex items-center mr-4">Account</span>
              </NavLink>
            </li>
            <li className="mb-1.5">
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center rounded-sm px-4 py-2 font-medium text-gray-200 duration-300 ease-in-out hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex items-center mr-4">Product</span>
              </NavLink>
            </li>
            <li className="mb-1.5">
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center rounded-sm px-4 py-2 font-medium text-gray-200 duration-300 ease-in-out hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex items-center mr-4">Orders</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </Col>
    );
  })
);

export default Sidebar;
