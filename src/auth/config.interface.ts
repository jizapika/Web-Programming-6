import { AppInfo } from "supertokens-node/types";

export const ConfigInjectionToken = "AUTH_MODULE_CONFIG";

export type AuthModuleConfig = {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
}