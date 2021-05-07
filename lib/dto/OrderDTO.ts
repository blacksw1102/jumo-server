export class OrderDTO {
  orderId: string;
  companyNo: string;
  date: string;
  restaurantName: string;
  totalPrice: number;
  paymentType: string;
  requestMsg: string;
  menuList: MenuList[];

  constructor(
    orderId: string,
    companyNo: string,
    date: string,
    restaurantName: string,
    totalPrice: number,
    paymentType: string,
    requestMsg: string,
    menuList: MenuList[]
  ) {
    this.orderId = orderId;
    this.companyNo = companyNo;
    this.date = date;
    this.restaurantName = restaurantName;
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
    this.requestMsg = requestMsg;
    this.menuList = menuList;
  }
}

export class MenuList {
  id: number;
  name: string;
  price: number;
  optionList: OptionList[];

  constructor(id:number, name: string, price: number, optionList: OptionList[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.optionList = optionList;
  }
}

export class OptionList {
    id: number;
    name: string;
    price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}