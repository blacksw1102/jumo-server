export class FavoriteList {
    companyNo: string;
    profileImage: string;
    restaurantName: string;
    reviewAvg: number;
    reviewCnt: number;
    orderCnt: number;

    constructor(
        companyNo: string,
        profileImage: string,
        restaurantName: string,
        reviewAvg: number,
        reviewCnt: number,
        orderCnt: number
    ) {
        this.companyNo = companyNo
        this.profileImage = profileImage
        this.restaurantName = restaurantName
        this.reviewAvg = reviewAvg
        this.reviewCnt = reviewCnt
        this.orderCnt = orderCnt
    }

}