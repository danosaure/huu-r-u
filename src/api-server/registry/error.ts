import { ApiServerError } from "../error";

export class RegistryError extends ApiServerError {
  constructor(message: string) {
    super(message);
    this.name = "RegistryError";
  }
}
