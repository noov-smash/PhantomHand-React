import React from "react";
// Hooks
import { useDatabase } from "./useDatabase";
// Configs
import { auth } from "../configs/firebase";
// Interfaces
import { FirebaseUserProps } from "../interfaces";

export const useAuth = () => {
  const { fetchUser, saveUser } = useDatabase();

  /*
   * Firebase Auth
   */
  const signInAnonymously =
    React.useCallback(async (): Promise<FirebaseUserProps | null> => {
      try {
        console.log("Signing in to Firebase...");
        const sign = await auth.signInAnonymously();
        if (sign.user?.uid) {
          const user = await fetchUser(sign.user.uid);
          if (!user)
            await saveUser({
              uid: sign.user.uid,
              isAdmin: false,
            });
          if (user?.isAdmin) {
          }
          return user || null;
        }
        return null;
      } catch (error) {
        throw error;
      }
    }, [fetchUser, saveUser]);

  return { signInAnonymously };
};
