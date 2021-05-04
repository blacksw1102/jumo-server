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
    company_no: string;
    name: string;
    address: string;
    profile_image: string;
    description: string;
    review_cnt: number;
    review_avg: number;


    constructor(
        company_no: string,
        name: string,
        address: string,
        profile_image: string,
        description: string,
        review_cnt: number,
        review_avg: number
    ) {
        this.company_no = company_no
        this.name = name
        this.address = address
        this.profile_image = profile_image
        this.description = description
        this.review_cnt = review_cnt
        this.review_avg = review_avg
    }
}