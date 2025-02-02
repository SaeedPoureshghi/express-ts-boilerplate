class PublicService {
  public getHelloWorld = () => {
    const result = {
      success: true,
      message: "Hello World",
    };

    return result;
  };
}

export default new PublicService();
