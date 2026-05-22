import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

export const tamaguiConfig: ReturnType<typeof createTamagui> = createTamagui(config);

export type TamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends TamaguiConfig {}
}
