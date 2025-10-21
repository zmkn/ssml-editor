import { EditorStorageService } from '@ssml-editor/core';
import {
  MenuBaseService,
  type BaseEditor,
  type EditorConfig,
} from '@ssml-editor/vue';
import type { VoiceContentDataModel } from './model';

export class VoiceMenuService extends MenuBaseService {
  private _editorStorageService: EditorStorageService;

  constructor(editor: BaseEditor, config: EditorConfig) {
    super(editor);
    this._editorStorageService = new EditorStorageService(config.storageName);
  }

  async fetchConfig(): Promise<VoiceContentDataModel | undefined> {
    return await this._editorStorageService.read(VoiceMenuService.STORE_KEY);
  }

  async saveConfig(data: VoiceContentDataModel): Promise<boolean> {
    return await this._editorStorageService.save(
      VoiceMenuService.STORE_KEY,
      data,
    );
  }

  static STORE_KEY = 'voice';
}
