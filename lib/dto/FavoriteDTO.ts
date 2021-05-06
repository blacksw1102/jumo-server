export class FavoriteList {

    constructor(
        companyNo: string,
        restaurantName: string,
        review_avg: number,
        review_cnt: number,
        order_cnt: number
    ) {
        this.companyNo = companyNo
        this.restaurantName = restaurantName
        this.review_avg = review_avg
        this.review_cnt = review_cnt
        this.order_cnt = order_cnt
    }
    companyNo: string;
    restaurantName: string;
    review_avg: number;
    review_cnt: number;
    order_cnt: number;
}