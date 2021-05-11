export class RestaurantSearchResultDTO {
    companyNo: string;
    name: string;
    score: number;
    image: string;
    description: string;
    averageCooking_time: string;
    reviewCount: number;
    reviewAvgScore: number;
    orderCount: number;

    constructor(
        companyNo: string,
        name: string, 
        score: number, 
        image: string, 
        description: string, 
        averageCooking_time: string, 
        reviewCount: number, 
        reviewAvgScore: number, 
        orderCount: number
    ) {
        this.companyNo = companyNo;;
        this.name = name
        this.score = score
        this.image = image
        this.description = description
        this.averageCooking_time = averageCooking_time
        this.reviewCount = reviewCount
        this.reviewAvgScore = reviewAvgScore
        this.orderCount = orderCount
    }
}

export class RestaurantInfoDTO {
    companyNo: string;
    name: string;
    addressBase: string;
    addressDetail: string;
    profileImage: string;
    description: string;
    userId: string;
    categoryName: string;
    reviewCnt: number;
    reviewAvg: number;
    isFav: number;


    constructor(
        companyNo: string,
        name: string,
        addressBase: string,
        addressDetail: string,
        profileImage: string,
        description: string,
        userId: string,
        categoryName: string,
        reviewCnt: number,
        reviewAvg: number,
        isFav: number
    ) {
        this.companyNo = companyNo
        this.name = name
        this.addressBase = addressBase
        this.addressDetail = addressDetail
        this.profileImage = profileImage
        this.description = description
        this.userId = userId
        this.categoryName = categoryName
        this.reviewCnt = reviewCnt
        this.reviewAvg = reviewAvg
        this.isFav = isFav
    }
}

export class RestaurantTopAreaDTO {
    companyId: string;
    restaurantName: string;
    profileImage: string;
    favCnt: number;
    reviewAvg: number;
    reivewCnt: number;

    constructor(
        companyId: string, 
        restaurantName: string, 
        profileImage: string, 
        favCnt: number, 
        reviewAvg: number, 
        reivewCnt: number
    ) {
        this.companyId = companyId
        this.restaurantName = restaurantName
        this.profileImage = profileImage
        this.favCnt = favCnt
        this.reviewAvg = reviewAvg
        this.reivewCnt = reivewCnt
    }
}

export class RestaurantMenuTabDTO {

}

export class RestaurantMenu {
    menuId: number;
    menuName: string;
    menuPrice: number;
    menuImage: string;
    avgCookTime: string;


    constructor(
        menuId: number, 
        menuName: string, 
        menuPrice: number, 
        menuImage: string, 
        avgCookTime: string
    ) {
        this.menuId = menuId
        this.menuName = menuName
        this.menuPrice = menuPrice
        this.menuImage = menuImage
        this.avgCookTime = avgCookTime
    }
}

export class RestaurantReviewTabDTO {
    reviewImage: string;
    score: number;
    userName: string;
    reviewDate: string;
    reviewBody: string;
    menuList: string[];


    constructor(
        reviewImage: string, 
        score: number, 
        userName: string, 
        reviewDate: string, 
        reviewBody: string, 
        menuList: string[]
    ) {
        this.reviewImage = reviewImage
        this.score = score
        this.userName = userName
        this.reviewDate = reviewDate
        this.reviewBody = reviewBody
        this.menuList = menuList
    }
}

export class RestaurantInfoTabDTO {
    restaurantDescription: string;
    restaurantName: string;
    restaurantOpTime: string;
    restaurantClosedDay: string;
    restaurantPhoneNum: string;
    ownerName: string;
    companyNo: string;
    address1: string;
    address2: string;

    constructor(
        restaurantDescription: string, 
        restaurantName: string, 
        restaurantOpTime: string, 
        restaurantClosedDay: string, 
        restaurantPhoneNum: string, 
        ownerName: string, 
        companyNo: string, 
        address1: string, 
        address2: string
    ) {
        this.restaurantDescription = restaurantDescription
        this.restaurantName = restaurantName
        this.restaurantOpTime = restaurantOpTime
        this.restaurantClosedDay = restaurantClosedDay
        this.restaurantPhoneNum = restaurantPhoneNum
        this.ownerName = ownerName
        this.companyNo = companyNo
        this.address1 = address1
        this.address2 = address2
    }
}