import { Repository } from "typeorm";
import { Rating } from "../../../../domain/entities/rating";
import { RatingRepository } from "../../../../domain/repositories/rating-repository";
import { RatingModel } from "../models/rating.model";

export class TypeOrmRatingRepository implements RatingRepository {
  constructor(private readonly RatingModelRepo: Repository<RatingModel>) {}

  async create(
    userNickname: string,
    dishId: number,
    rating: number
  ): Promise<Rating> {
    const newRating = {
      user: { nickname: userNickname },
      dish: { id: dishId },
      rating,
    };
    return this.RatingModelRepo.save(newRating);
  }

  async findOne(payload: Partial<Rating>): Promise<Rating | undefined> {
    const Rating = await this.RatingModelRepo.findOneBy({
      ...payload,
    });

    if (Rating === null) {
      return undefined;
    }

    return Rating;
  }
}
