import localforage from 'localforage';
import type { StorageOptions } from './storage.model';

export class Storage {
  constructor(options: StorageOptions) {
    this.storage = localforage.createInstance({
      ...Storage.DefaultOptions,
      ...options,
    });
  }

  storage: LocalForage;

  getItem<T>(
    key: string,
    callback?: (err: any, value: T | null) => void,
  ): Promise<T | null> {
    return this.storage.getItem(key, callback);
  }

  setItem<T>(
    key: string,
    value: T,
    callback?: (err: any, value: T) => void,
  ): Promise<T> {
    return this.storage.setItem(key, value, callback);
  }

  removeItem(key: string, callback?: (err: any) => void): Promise<void> {
    return this.storage.removeItem(key, callback);
  }

  clear(callback?: (err: any) => void): Promise<void> {
    return this.storage.clear(callback);
  }

  length(callback?: (err: any, numberOfKeys: number) => void): Promise<number> {
    return this.storage.length(callback);
  }

  key(
    keyIndex: number,
    callback?: (err: any, key: string) => void,
  ): Promise<string> {
    return this.storage.key(keyIndex, callback);
  }

  keys(callback?: (err: any, keys: string[]) => void): Promise<string[]> {
    return this.storage.keys(callback);
  }

  iterate<T, U>(
    iteratee: (value: T, key: string, iterationNumber: number) => U,
    callback?: (err: any, result: U) => void,
  ): Promise<U> {
    return this.storage.iterate(iteratee, callback);
  }

  static DefaultOptions: StorageOptions = {
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    version: 100000,
    size: 4980736,
  };
}
