import { GenerateUserToken } from "../../../../src/application/use-cases/user/generate-user-token";

const mockUserRepository: any = {
  findOne: jest.fn(),
};

const mockAuthTokenService: any = {
  generateToken: jest.fn(),
};

const mockCryptographyService: any = {
  encode: jest.fn(),
};

describe("GenerateUserToken", () => {
  let generateUserToken: GenerateUserToken;

  beforeEach(() => {
    generateUserToken = new GenerateUserToken(
      mockUserRepository,
      mockAuthTokenService,
      mockCryptographyService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a token for a valid user", async () => {
    const nickname = "validUser";
    const password = "password123";
    const encodedPassword = "encodedPassword123";
    const token = "generatedToken";

    mockCryptographyService.encode.mockReturnValue(encodedPassword);
    mockUserRepository.findOne.mockResolvedValue({
      nickname,
      password: encodedPassword,
    });
    mockAuthTokenService.generateToken.mockReturnValue(token);

    const result = await generateUserToken.generate(nickname, password);

    expect(result).toBe(token);
    expect(mockCryptographyService.encode).toHaveBeenCalledWith(password);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      nickname,
      password: encodedPassword,
    });
    expect(mockAuthTokenService.generateToken).toHaveBeenCalledWith(
      nickname,
      password
    );
  });

  it("should throw an error for an invalid user", async () => {
    const nickname = "invalidUser";
    const password = "wrongPassword";

    mockCryptographyService.encode.mockReturnValue("encodedPassword123");
    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(
      generateUserToken.generate(nickname, password)
    ).rejects.toThrow("Not Authorized");

    expect(mockCryptographyService.encode).toHaveBeenCalledWith(password);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      nickname,
      password: "encodedPassword123",
    });
    expect(mockAuthTokenService.generateToken).not.toHaveBeenCalled();
  });
});
