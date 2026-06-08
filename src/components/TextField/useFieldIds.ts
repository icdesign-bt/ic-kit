import { useId } from 'react';

export function useFieldIds(id?: string) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return {
    fieldId,
    labelId: `${fieldId}-label`,
    helperId: `${fieldId}-helper`,
  };
}
