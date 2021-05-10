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