import { saveAs } from 'file-saver';

export const FileUtils = {
  export(filename: string, textContent: string) {
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  },
};
