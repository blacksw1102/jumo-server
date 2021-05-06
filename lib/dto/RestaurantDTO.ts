export class RestaurantSearchResultDTO {
    name: string;
    score: number;
    image: string;
    description: string;
    average_cooking_time: string;
    review_count: number;

    constructor(
        name: string,
        score: number,
        image: string,
        description: string,
        average_cooking_time: string,
        review_count: number
    ) {
        this.name = name
        this.score = score
        this.image = image
        this.description = description
        this.average_cooking_time = average_cooking_time
        this.review_count = review_count
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