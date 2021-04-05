import { RestaurantSearchResult } from "../dto/RestaurantDTO";

export default interface RestaurantDAO {
  create(
    name: string,
    address: string,
    description: string,
    categoryId: number
  ): Promise<void>;
  getSearchResult(keyword: string): Promise<RestaurantSearchResult[]>;
}