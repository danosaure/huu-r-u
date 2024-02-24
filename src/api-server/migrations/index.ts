import { MigrationType } from "../../persistence";

import { migration as migration001 } from "./001-initial-structure";

export const migrations: Record<string, MigrationType> = {
  1: migration001,
};
