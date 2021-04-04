export default class RestaurantModel {
  public company_no: number;
  public name: string;
  public address: string;
  public profile_image: string;
  public bookmark_count: number;
  public score: number;
  public average_cooking_time: string;
  public business_hours: string;
  public closed_day: string;
  public description: string;
  public review_event_description: string;
  public location_x: number;
  public location_y: number;
  public is_open: boolean;
  public restaurant_category_id: number;

  constructor(
    company_no: number,
    name: string,
    address: string,
    profile_image: string,
    bookmark_count: number,
    score: number,
    average_cooking_time: string,
    business_hours: string,
    closed_day: string,
    description: string,
    review_event_description: string,
    location_x: number,
    location_y: number,
    is_open: boolean,
    restaurant_category_id: number
  ) {
    this.company_no = company_no;
    this.name = name;
    this.address = address;
    this.profile_image = profile_image;
    this.bookmark_count = bookmark_count;
    this.score = score;
    this.average_cooking_time = average_cooking_time;
    this.business_hours = business_hours;
    this.closed_day = closed_day;
    this.description = description;
    this.review_event_description = review_event_description;
    this.location_x = location_x;
    this.location_y = location_y;
    this.is_open = is_open;
    this.restaurant_category_id = restaurant_category_id;
  }
}
