import { CreateDish } from "../../../../src/application/use-cases/dish/create-dish";
const mockDishRepository: any = {
  create: jest.fn(),
  findOne: jest.fn(),
};

describe("CreateDish", () => {
  let createDish: CreateDish;

  beforeEach(() => {
    createDish = new CreateDish(mockDishRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new dish", async () => {
    const name = "Test Dish";
    const description = "Test description";
    const image_url = "test.jpg";
    const price = 10.99;

    const mockCreateDishDto = {
      name,
      description,
      image_url,
      price,
    };

    mockDishRepository.findOne.mockResolvedValueOnce(null);

    mockDishRepository.create.mockResolvedValueOnce({
      ...mockCreateDishDto,
      id: 1,
    });

    const result = await createDish.create(name, description, image_url, price);

    expect(result).toEqual({ ...mockCreateDishDto, id: 1 });

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ name });
    expect(mockDishRepository.create).toHaveBeenCalledWith(mockCreateDishDto);
  });

  it("should throw an error if the dish name is not unique", async () => {
    const name = "Test Dish";
    const description = "Test description";
    const image_url = "test.jpg";
    const price = 10.99;

    mockDishRepository.findOne.mockResolvedValueOnce({
      name,
      description: "description",
      image_url,
      price,
    });

    await expect(
      createDish.create(name, description, image_url, price)
    ).rejects.toThrow();

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ name });
  });

  it("should throw an error if the dish description is not unique", async () => {
    const name = "Test Dish";
    const description = "Test description";
    const image_url = "test.jpg";
    const price = 10.99;

    mockDishRepository.findOne.mockResolvedValueOnce({
      name,
      description,
      image_url,
      price,
    });

    await expect(
      createDish.create(name, description, image_url, price)
    ).rejects.toThrow();

    expect(mockDishRepository.findOne).toHaveBeenCalledWith({ description });
  });
});
