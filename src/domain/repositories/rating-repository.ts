import { Rating } from "../entities/rating";

export interface RatingRepository {
  create(userNickname: string, dishId: number, rating: number): Promise<Rating>;
  findOne(payload: Partial<Rating>): Promise<Rating | undefined>;
}
