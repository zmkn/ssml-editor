import type { StorageType } from "@/enumeration";

export interface EditorHtmlConfig {
  storageType?: StorageType;
  storageName?: string;
  reader?: () => Promise<string>;
  saver?: (html: string) => Promise<boolean>;
  autoSave?: boolean;
  autoSaveWait?: number;
}
