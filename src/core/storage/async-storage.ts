import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const getItem = async <T>(key: string): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  return value !== null ? JSON.parse(value) : null;
};
const setItem = <T>(key: string, value: T): Promise<void> =>
  AsyncStorage.setItem(key, JSON.stringify(value));
const removeItem = (key: string): Promise<void> => AsyncStorage.removeItem(key);
const clearAll = (): Promise<void> => AsyncStorage.clear();

export const atomWithAsyncStorage = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      clearAll,
      getItem,
      removeItem,
      setItem,
    }))
  );
