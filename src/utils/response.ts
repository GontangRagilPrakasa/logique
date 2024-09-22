class Responses {
    constructor(
      public status: boolean,
      public message: string,
      public method: string,
      public statusCode: number,
      public data: any,
    ) {}
  }
  
  export { Responses };