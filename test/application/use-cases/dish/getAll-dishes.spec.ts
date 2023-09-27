import { GetAllDishes } from "../../../../src/application/use-cases/dish/getAll-dishes";
import { Dish } from "../../../../src/domain/entities/dish";

const mockDishRepository: any = {
  getAll: jest.fn(),
};

describe("GetAllDishes", () => {
  let getAllDishes: GetAllDishes;

  beforeEach(() => {
    getAllDishes = new GetAllDishes(mockDishRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of dishes when called with valid parameters", async () => {
    const mockDishes: Dish[] = [
      {
        id: 1,
        name: "Dish 1",
        description: "Description 1",
        image_url: "dish1.jpg",
        price: 15.0,
        ratings: [],
      },
      {
        id: 2,
        name: "Dish 2",
        description: "Description 2",
        image_url: "dish2.jpg",
        price: 18.0,
        ratings: [],
      },
    ];

    mockDishRepository.getAll.mockResolvedValue(mockDishes);

    const result = await getAllDishes.get({});

    expect(result).toEqual(mockDishes);
    expect(mockDishRepository.getAll).toHaveBeenCalledWith({});
  });

  it("should return an empty list when no dishes match the criteria", async () => {
    mockDishRepository.getAll.mockResolvedValue([]);

    const result = await getAllDishes.get({});

    expect(result).toEqual([]);
    expect(mockDishRepository.getAll).toHaveBeenCalledWith({});
  });
});
