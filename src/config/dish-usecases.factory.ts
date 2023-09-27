import { DishModel } from "../infra/databases/typeorm/models/dish.model";
import { TypeOrmDishRepository } from "../infra/databases/typeorm/repositories/typeorm-dish.repository";
import { TypeOrmDataSource } from "../infra/databases/typeorm/typeorm.config";
import { CreateDish } from "../application/use-cases/dish/create-dish";
import { GetAllDishes } from "../application/use-cases/dish/getAll-dishes";
import { DeleteDish } from "../application/use-cases/dish/delete-dish";
import { RateDish } from "../application/use-cases/dish/rate-dish";
import { RatingModel } from "../infra/databases/typeorm/models/rating.model";
import { TypeOrmRatingRepository } from "../infra/databases/typeorm/repositories/typeorm-rating.repository";
import { UpdateDish } from "../application/use-cases/dish/update-dish";
const modelRepo = TypeOrmDataSource.getRepository(DishModel);
const dishRepo = new TypeOrmDishRepository(modelRepo);

const ratingModelRepo = TypeOrmDataSource.getRepository(RatingModel);

const ratingRepo = new TypeOrmRatingRepository(ratingModelRepo);
export abstract class DishUseCasesFactory {
  static buildCreateDishUseCase(): CreateDish {
    const createDish = new CreateDish(dishRepo);
    return createDish;
  }

  static buildGetAllDishesUseCase(): GetAllDishes {
    const getAllDishes = new GetAllDishes(dishRepo);
    return getAllDishes;
  }

  static buildDeleteDish(): DeleteDish {
    const deleteDish = new DeleteDish(dishRepo);
    return deleteDish;
  }

  static buildRateDish(): RateDish {
    const rateDish = new RateDish(dishRepo, ratingRepo);
    return rateDish;
  }

  static buildUpdateDish(): UpdateDish {
    const updateDish = new UpdateDish(dishRepo);
    return updateDish;
  }
}
