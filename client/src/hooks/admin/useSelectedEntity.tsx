import type { RowData } from "@tanstack/react-table";
import { useCallback, useState } from "react";

export function useSelectedEntity<Entity extends RowData>() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const select = useCallback(
    (entity: Entity) => setSelectedEntity(entity),
    [setSelectedEntity]
  );

  const unselect = useCallback(
    () => setSelectedEntity(null),
    [setSelectedEntity]
  );

  const methods = {
    select,
    unselect,
  };

  return [selectedEntity, methods] as const;
}
