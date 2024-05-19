import "./index.css";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Modal,
  Pagination,
  Rate,
  Row,
} from "antd";
import ProductStore from "@/stores/productStore";
import withRouter from "@/components/Layout/Router/withRouter";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import OrderStore from "@/stores/orderStore";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
const { Panel } = Collapse;

interface IProps {
  navigate: any;
  productStore: ProductStore;
  orderStore: OrderStore;
}
const Home = inject(
  Stores.ProductStore,
  Stores.OrderStore
)(
  observer((props: IProps) => {
    const { productStore, orderStore } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [product, setProduct] = useState<any>(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
      const init = async () => {
        const typeId: any = searchParams.get("type");
        const keyword: any = searchParams.get("keyword");

        await productStore.getAll(currentPage, 10, typeId, keyword);
      };
      init();
    }, [searchParams.get("type"), searchParams.get("keyword")]);

    const onChange = (page) => {
      setCurrentPage(page);
    };

    const handleAddToCart = (product: any) => {
      orderStore.addToCart(product);
      toast("Thêm sản phẩm vào giỏ hàng thành công!");
    };

    const handleGetDetail = (product: any) => {
      setProduct(product);
      setIsOpenModal(true);
    };

    const handleCloseModal = () => {
      setProduct(null);
      setIsOpenModal(false);
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
              {productStore.products?.items?.map((product: any) => {
                return (
                  <Product
                    data={product}
                    addToCart={handleAddToCart}
                    getDetail={handleGetDetail}
                  />
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row className="flex justify-center items-center mb-2">
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={productStore.products?.items?.length}
            pageSize={10}
            showSizeChanger={false}
          />
        </Row>
        <Modal
          footer={false}
          open={isOpenModal}
          onCancel={handleCloseModal}
          style={{ width: "auto" }}
        >
          <Row className="gap-x-2">
            <Col span={14}>
              <img src={product?.image} alt="sản phẩm" />
            </Col>
            <Col span={9}>
              <Row className="gap-y-2 flex justify-between">
                <div>
                  <h2 className="text-lg font-bold">{product?.productName}</h2>
                  <Rate value={5} disabled style={{ color: "black " }} />
                  <p>
                    <span>4.8</span>
                    <span className="pl-2">
                      <i className="text-gray-500 opacity-90 underline">
                        See review
                      </i>
                    </span>
                  </p>
                  <p className="font-medium">{product?.price} VND</p>
                  <p>
                    <span className="font-medium">Kích thước mặt: </span>
                    <span className="p-1 border border-solid border-black">
                      {product?.size} mm
                    </span>
                  </p>
                </div>
                <div>
                  <Button
                    className="bg-[#626262] text-white"
                    type="text"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ hàng!
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
        </Modal>
      </Col>
    );
  })
);

export default withRouter(Home);
