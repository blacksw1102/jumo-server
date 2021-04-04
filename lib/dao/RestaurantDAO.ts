import RestaurantModel from "../models/RestaurantModel";

export default interface RestaurantDAO {
  create(
    name: string,
    address: string,
    description: string,
    categoryId: number
  ): Promise<void>;
  getSearchResult(keyword: string): Promise<any[]>;
}