import { APIResponse } from "../models/ApiModel";
import ApiClient from "./ApiClient";

export default class BaseApi {
  protected apiClient: ApiClient;

	
  constructor(baseUrl: string = 'https://jsonplaceholder.typicode.com') {
    this.apiClient = new ApiClient(baseUrl);
  }

  protected async handleRequest<T>(request: () => Promise<T> ): Promise<APIResponse> {
    try {
			const data = await request();
			return {
				success: true,
				message: "Submission successful",
				data
			};
    } catch (error) {
			console.log(error.message)
			return {
				success: false,
				message: error.message
			};
    }
	}
}