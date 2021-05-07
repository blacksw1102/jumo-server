export class OrderDTO {
  orderId: string;
  companyNo: string;
  date: string;
  restaurantName: string;
  totalPrice: number;
  paymentType: string;
  request_msg: string;
  menuList: MenuList[];

  constructor(
    orderId: string,
    companyNo: string,
    date: string,
    restaurantName: string,
    totalPrice: number,
    paymentType: string,
    request_msg: string,
    menuList: MenuList[]
  ) {
    this.orderId = orderId;
    this.companyNo = companyNo;
    this.date = date;
    this.restaurantName = restaurantName;
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
    this.request_msg = request_msg;
    this.menuList = menuList;
  }
}

class MenuList {
  name: string;
  price: number;
  optionList: OptionList[];

  constructor(name: string, price: number, optionList: OptionList[]) {
    this.name = name;
    this.price = price;
    this.optionList = optionList;
  }
}

class OptionList {
    name: string;
    price: number;

  constructor(name: string, price: number) {
    this.name = name
    this.price = price
  }
}