export const REQUEST_BASE_URL = "https://localhost:7063/api/v1/";

export const footerIntroduce = [
  {
    type: "heading",
    content: "Giới thiệu",
  },
  {
    type: "p",
    content: "Về chúng tôi",
  },
  {
    type: "p",
    content: "Sản phẩm",
  },
  {
    type: "p",
    content: "Khuyến mãi",
  },
  {
    type: "p",
    content: "Chuyện cà phê",
  },
  {
    type: "p",
    content: "Cửa hàng",
  },
  {
    type: "p",
    content: "Tuyển dụng",
  },
];

export const footerRules = [
  {
    type: "heading",
    content: "Điều khoản",
  },
  {
    type: "p",
    content: "Điều khoản sử dụng",
  },
  {
    type: "p",
    content: "Chính sách bảo mật",
  },
  {
    type: "p",
    content: "Hướng dẩn xuất hóa đơn GTGT",
  },
];

export const footerContact = {
  type: "heading",
  content: "Đặt hàng: 0909090909",
};

export const headerMenuDropdown = [
  {
    id: 0,
    heading: "Tất cả",
    children: [],
  },

  {
    id: 1,
    heading: "Milwaukee",
    children: ["Drill", "Impact Driver", "Hammer Drill"],
  },
  {
    id: 2,
    heading: "Makita",
    children: ["Drill", "Impact Driver", "Hammer Drill"],
  },
  {
    id: 3,
    heading: "Dewalt",
    children: ["Drill", "Impact Driver", "Hammer Drill"],
  },
  {
    id: 4,
    heading: "Accessories",
    children: ["Drill", "Tắc kê"],
  },
];

export const options = {
  size: [
    { id: 1, title: "Nhỏ", price: "0" },
    { id: 2, title: "Vừa", price: "6.000" },
    { id: 3, title: "Lớn", price: "10.000" },
  ],
  topping: [
    { id: 1, title: "Kem Phô Mai Macchiato", price: "10.000" },
    { id: 2, title: "Shot Espresso", price: "10.000" },
    { id: 3, title: "Thạch Cà Phê", price: "10.000" },
    { id: 4, title: "Trân Châu Trắng", price: "10.000" },
    { id: 5, title: "Sốt Caramel", price: "10.000" },
  ],
};
