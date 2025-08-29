import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type FieldValues, type UseFormProps } from "react-hook-form";
import { z } from "zod";

interface UseZodFormOptions<T extends z.ZodType> {
  schema: T;
  queryKey?: string[];
  formOptions?: Omit<UseFormProps<z.infer<T> & FieldValues>, "resolver">;
  mutationFn: (data: z.infer<T>) => Promise<any>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useZodForm<T extends z.ZodType>({
  schema,
  queryKey,
  formOptions,
  mutationFn,
  onSuccess,
  onError,
}: UseZodFormOptions<T>) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<T> & FieldValues>({
    resolver: standardSchemaResolver(schema),
    ...formOptions,
  });

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      onSuccess?.(data);
      form.reset();
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    form,
    mutation,
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
