import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFirstTimeOpen() {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkFirstTimeOpen() {
      try {
        const hasOpened = await AsyncStorage.getItem("hasOpened");
        if (!hasOpened) {
          setIsFirstTime(true);
          await AsyncStorage.setItem("hasOpened", "true");
        } else {
          setIsFirstTime(false);
        }
      } catch (error) {
        console.error("error getting first time", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkFirstTimeOpen();
  }, []);

  return { isFirstTime, isLoading };
}
