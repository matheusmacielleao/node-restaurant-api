import { Rating } from "../../../domain/entities/rating";
import { DishRepository } from "../../../domain/repositories/dish-repository";
import { RatingRepository } from "../../../domain/repositories/rating-repository";

export class RateDish {
  constructor(
    private readonly dishRepo: DishRepository,
    private readonly ratingRepo: RatingRepository
  ) {}

  async rate(
    userNickname: string,
    dishId: number,
    rating: number
  ): Promise<Rating> {
    this.smeagolCantRate(userNickname);

    if (rating > 10 || rating < 0) {
      throw new Error("Rating should be between 1 and 10.");
    }

    const dishExists = await this.dishRepo.findOne({ id: dishId });

    if (!dishExists) {
      throw new Error("Rating Failed! Dish specified doesn't exist");
    }

    const userAlredyRated = dishExists.ratings.find((rate) => {
      return rate.user.nickname == userNickname;
    });

    if (userAlredyRated) {
      throw new Error("User already rated this dish");
    }

    return this.ratingRepo.create(userNickname, dishId, rating);
  }

  private smeagolCantRate(userNickname: string): void {
    if (userNickname == process.env.SMEAGOL_NICK) {
      throw new Error("Go find your precious in another place");
    }
  }
}
