import { RateDish } from "../../../../src/application/use-cases/dish/rate-dish";

const mockDishRepository: any = {
  findOne: jest.fn(),
};

const mockRatingRepository: any = {
  create: jest.fn(),
};

describe("RateDish", () => {
  let rateDish: RateDish;

  beforeEach(() => {
    rateDish = new RateDish(mockDishRepository, mockRatingRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should rate a dish when conditions are met", async () => {
    const userNickname = "Frodo";
    const dishId = 1;
    const rating = 5;

    mockDishRepository.findOne.mockResolvedValueOnce({
      id: dishId,
      ratings: [],
    });
    mockRatingRepository.create.mockResolvedValueOnce({
      userNickname,
      dishId,
      rating,
    });

    const result = await rateDish.rate(userNickname, dishId, rating);

    expect(result).toEqual({ userNickname, dishId, rating });
    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ id: dishId });
    expect(mockRatingRepository.create).toHaveBeenCalledWith(
      userNickname,
      dishId,
      rating
    );
  });

  it("should throw an error if user is smeagol", async () => {
    const userNickname = process.env.SMEAGOL_NICK as any;
    const dishId = 1;
    const rating = 5;

    await expect(rateDish.rate(userNickname, dishId, rating)).rejects.toThrow(
      "Go find your precious in another place"
    );

    expect(mockDishRepository.findOne).not.toHaveBeenCalled();
    expect(mockRatingRepository.create).not.toHaveBeenCalled();
  });

  it("should throw an error if rating is out of bounds", async () => {
    const userNickname = "Sam";
    const dishId = 1;
    const rating = 15;

    await expect(rateDish.rate(userNickname, dishId, rating)).rejects.toThrow(
      "Rating should be between 1 and 10."
    );

    expect(mockDishRepository.findOne).not.toHaveBeenCalled();
    expect(mockRatingRepository.create).not.toHaveBeenCalled();
  });

  it("should throw an error if dish does not exist", async () => {
    const userNickname = "Aragorn";
    const dishId = 1;
    const rating = 8;

    mockDishRepository.findOne.mockResolvedValueOnce(null);

    await expect(rateDish.rate(userNickname, dishId, rating)).rejects.toThrow(
      "Rating Failed! Dish specified doesn't exist"
    );

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ id: dishId });
    expect(mockRatingRepository.create).not.toHaveBeenCalled();
  });

  it("should throw an error if user already rated the dish", async () => {
    const userNickname = "Legolas";
    const dishId = 1;
    const rating = 7;

    mockDishRepository.findOne.mockResolvedValueOnce({
      id: dishId,
      ratings: [{ user: { nickname: userNickname }, rating: 6 }],
    });

    await expect(rateDish.rate(userNickname, dishId, rating)).rejects.toThrow(
      "User already rated this dish"
    );

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ id: dishId });
    expect(mockRatingRepository.create).not.toHaveBeenCalled();
  });
});
