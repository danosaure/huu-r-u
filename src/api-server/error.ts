import { AppError } from "../error";

export class ApiServerError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "ApiServerError";
  }
}
