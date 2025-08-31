import { useCallback, useState } from "react";

export function useLaunchedAt() {
  const [launchedAt, _setLaunchedAt] = useState<Date | null>(null);

  const setLaunchedAt = useCallback(
    () => _setLaunchedAt(new Date()),
    [_setLaunchedAt]
  );

  const clearLaunchedAt = useCallback(
    () => _setLaunchedAt(null),
    [_setLaunchedAt]
  );

  return [launchedAt, { setLaunchedAt, clearLaunchedAt }] as const;
}

/**
 * Manages the state and methods for creating and deleting launched at times.
 * @returns The `useCreateDeleteLaunchedAt` function returns a tuple with two elements. The first
 * element is an object containing the `createLaunchedAt` and `deleteLaunchedAt` values. The second
 * element is an object containing two methods: `launch` and `clear`. The `launch` method takes a mode
 * parameter ("create" or "delete") and sets the corresponding launchedAt value
 */
export function useCreateDeleteLaunchedAt() {
  const [
    createLaunchedAt,
    {
      setLaunchedAt: setCreateLaunchedAt,
      clearLaunchedAt: clearCreateLaunchedAt,
    },
  ] = useLaunchedAt();
  const [
    deleteLaunchedAt,
    {
      setLaunchedAt: setDeleteLaunchedAt,
      clearLaunchedAt: clearDeleteLaunchedAt,
    },
  ] = useLaunchedAt();

  const state = {
    createLaunchedAt,
    deleteLaunchedAt,
  };

  const methods = {
    launch: (mode: "create" | "delete") => {
      if (mode === "create") {
        setCreateLaunchedAt();
      } else {
        setDeleteLaunchedAt();
      }
    },
    clear: () => {
      clearCreateLaunchedAt();
      clearDeleteLaunchedAt();
    },
  };

  return [state, methods] as const;
}
