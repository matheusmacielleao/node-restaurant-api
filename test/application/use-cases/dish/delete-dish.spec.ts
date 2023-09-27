import { DeleteDish } from "../../../../src/application/use-cases/dish/delete-dish";

const mockDishRepository: any = {
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe("DeleteDish", () => {
  let deleteDish: DeleteDish;

  beforeEach(() => {
    deleteDish = new DeleteDish(mockDishRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a dish by ID if it exists", async () => {
    const dishId = 1;

    mockDishRepository.findOne.mockResolvedValue({ id: dishId });

    await deleteDish.byId(dishId);

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ id: dishId });
    expect(mockDishRepository.delete).toHaveBeenCalledWith(dishId);
  });

  it("should throw an error if trying to delete a non-existing dish", async () => {
    const dishId = 2;

    mockDishRepository.findOne.mockResolvedValue(null);

    await expect(deleteDish.byId(dishId)).rejects.toThrow(
      `Dish with id : ${dishId} doesn't exist`
    );

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ id: dishId });
    expect(mockDishRepository.delete).not.toHaveBeenCalled();
  });
});
