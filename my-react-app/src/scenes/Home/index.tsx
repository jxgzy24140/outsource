import "./index.css";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import { Col, Collapse, Divider, Row, Typography } from "antd";
import ProductStore from "@/stores/productStore";
import withRouter from "@/components/Layout/Router/withRouter";
import { useEffect } from "react";
import Product from "./components/Product";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { appLayouts } from "@/components/Layout/Router/router.config";
const { Title } = Typography;
const { Panel } = Collapse;

const dummy = [
  {
    id: 1,
    productName: "Lakota",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-apache-da-111.jpg",
    price: 1499000,
    quantity: 10,
  },
  {
    id: 2,
    productName: "Lakota",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-nighthawk-da-11-400x400.png",
    price: 1499000,
    quantity: 10,
  },
  {
    id: 1,
    productName: "Lakota",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-apache-da-111.jpg",
    price: 1499000,
    quantity: 10,
  },
  {
    id: 2,
    productName: "Lakota",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-nighthawk-da-11-400x400.png",
    price: 1499000,
    quantity: 10,
  },
  {
    id: 1,
    productName: "Lakota",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-apache-da-111.jpg",
    price: 1499000,
    quantity: 10,
  },
  {
    id: 2,
    productName: "Lakota",
    image:
      "https://curnonwatch.com/wp-content/uploads/2024/05/web-nighthawk-da-11-400x400.png",
    price: 1499000,
    quantity: 10,
  },
];

interface IProps {
  navigate: any;
  productStore: ProductStore;
}
const Home = inject(Stores.ProductStore)(
  observer((props: IProps) => {
    const { navigate, productStore } = props;
    useEffect(() => {
      const init = async () => {};
      init();
    }, []);

    // const handleShowProducts = async (categoryId: number) => {
    //   console.log(categoryId);
    // };

    const handleProductClick = (productId: number) => {
      navigate(`/${appLayouts.detail.path.replace(":id", productId)}`);
    };

    return (
      <Col>
        <Row>
          <Col span={5}>
            <Row>
              <Collapse
                className="w-full bg-transparent border-none"
                expandIconPosition="right"
                expandIcon={({ isActive }) =>
                  isActive ? <MinusOutlined /> : <PlusOutlined />
                }
              >
                <Panel
                  style={{ border: "none" }}
                  header={
                    <div className="w-full flex justify-between items-center py-2">
                      <span className="text-lg font-semibold">NAM</span>
                    </div>
                  }
                  key="1"
                >
                  <ul className="w-full px-3">
                    <li className="ml-3">
                      <span className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                        Đồng hồ nam
                      </span>
                      <ul className="ml-3">
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Kashmir
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Weimar
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Colosserum
                        </li>
                      </ul>
                    </li>
                    <li className="ml-3">
                      <span className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                        Dây đồng hồ nam
                      </span>
                      <ul className="ml-3">
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Dây vải
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Dây cao su
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Dây da
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Panel>
                <Panel
                  style={{ border: "none" }}
                  header={
                    <div className="w-full flex justify-between items-center py-2">
                      <span className="text-lg font-semibold">NỮ</span>
                    </div>
                  }
                  key="2"
                >
                  <ul className="w-full px-3">
                    <li className="ml-3">
                      <span className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                        Đồng hồ nữ
                      </span>
                      <ul className="ml-3">
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Sicily
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Aurora
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Melissani
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Moraine
                        </li>
                      </ul>
                    </li>
                    <li className="ml-3">
                      <span className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                        Dây đồng hồ nữ
                      </span>
                      <ul className="ml-3">
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Dây kim loại
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Dây da
                        </li>
                      </ul>
                    </li>
                    <li className="ml-3">
                      <span className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                        Trang sức nữ
                      </span>
                      <ul className="ml-3">
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Charm
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Vòng tay
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Dây chuyền
                        </li>
                        <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                          Nhẫn
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Panel>
                <Panel
                  style={{ border: "none" }}
                  header={
                    <div className="w-full flex justify-between items-center py-2">
                      <span className="text-lg font-semibold">
                        BEST SELLERS
                      </span>
                    </div>
                  }
                  key="3"
                ></Panel>
                <Panel
                  style={{ border: "none" }}
                  header={
                    <div className="w-full flex justify-between items-center py-2">
                      <span className="text-lg font-semibold">QUÀ TẶNG</span>
                    </div>
                  }
                  key="4"
                >
                  <ul className="w-full px-3">
                    <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                      Cho anh ấy
                    </li>
                    <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                      Cho người yêu
                    </li>
                    <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                      Cho cô ấy
                    </li>
                    <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                      Cho bạn
                    </li>
                    <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                      Cho bố
                    </li>
                    <li className="cursor-pointer secondary text-base py-2 font-semibold text-[#807D7C]">
                      Cho mẹ
                    </li>
                  </ul>
                </Panel>
              </Collapse>
            </Row>
          </Col>
          <Col span={1}>
            <Divider type="vertical" className="h-screen" />
          </Col>
          <Col span={18}>
            <Row className="flex flex-wrap">
              {dummy.map((product: any) => {
                return <Product data={product} />;
              })}
            </Row>
          </Col>
        </Row>
      </Col>
    );
  })
);

export default withRouter(Home);
