import { CreateUser } from "../../../../src/application/use-cases/user/create-user";

const mockUserRepository: any = {
  create: jest.fn(),
  findOne: jest.fn(),
};

const mockCryptographyService: any = {
  encode: jest.fn(),
};

describe("CreateUser", () => {
  let createUser: CreateUser;

  beforeEach(() => {
    createUser = new CreateUser(mockUserRepository, mockCryptographyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user with a unique nickname", async () => {
    const nickname = "newUser";
    const password = "password123";
    const encodedPassword = "encodedPassword123";

    mockUserRepository.findOne.mockResolvedValue(null);
    mockCryptographyService.encode.mockReturnValue(encodedPassword);

    await createUser.create(nickname, password);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ nickname });
    expect(mockCryptographyService.encode).toHaveBeenCalledWith(password);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      nickname,
      password: encodedPassword,
    });
  });

  it("should throw an error if the nickname is not unique", async () => {
    const nickname = "existingUser";
    const password = "password123";

    mockUserRepository.findOne.mockResolvedValue({ nickname });

    await expect(createUser.create(nickname, password)).rejects.toThrow(
      `User with nickname ${nickname} already exists`
    );

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ nickname });
    expect(mockCryptographyService.encode).not.toHaveBeenCalled();
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});
