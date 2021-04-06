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