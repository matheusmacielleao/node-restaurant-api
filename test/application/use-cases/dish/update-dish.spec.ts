import { UpdateDish } from "../../../../src/application/use-cases/dish/update-dish";

const mockDishRepository: any = {
  findOne: jest.fn(),
  update: jest.fn(),
};

describe("UpdateDish", () => {
  let updateDish: UpdateDish;

  beforeEach(() => {
    updateDish = new UpdateDish(mockDishRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a dish when it exists", async () => {
    const dishId = 1;
    const payload = {
      name: "Updated Dish",
      description: "Updated description",
      image_url: "updated.jpg",
      price: 12.99,
    };

    mockDishRepository.findOne.mockResolvedValue({ id: dishId });

    await updateDish.update(dishId, payload);

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ id: dishId });
    expect(mockDishRepository.update).toHaveBeenCalledWith(dishId, payload);
  });

  it("should throw an error if the dish does not exist", async () => {
    const dishId = 2;
    const payload = {
      name: "Updated Dish",
      description: "Updated description",
      image_url: "updated.jpg",
      price: 12.99,
    };

    mockDishRepository.findOne.mockResolvedValue(null);

    await expect(updateDish.update(dishId, payload)).rejects.toThrow(
      "Dish Specified doesnt exists"
    );

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ id: dishId });
    expect(mockDishRepository.update).not.toHaveBeenCalled();
  });
});
