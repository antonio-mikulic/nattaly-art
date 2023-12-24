"use client";

import { type CellContext } from "@tanstack/react-table";
import { type CategoryModel } from "~/server/api/routers/category";
import { api } from "~/trpc/react";
import ConfirmDelete from "~/app/_components/shared/table/confirm-delete";
import { useToast } from "~/ui/use-toast";

export const getDeleteCategoryCell = (
  props: CellContext<CategoryModel, unknown>,
) => {
  if (!props.row.original?.id) return <span>{"-|-"}</span>;

  const { toast } = useToast();
  const utils = api.useUtils();

  const deleteCategory = api.category.delete.useMutation({
    onError: (e) => {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      await utils.category.getAll.invalidate();
    },
  });

  return (
    <ConfirmDelete
      onConfirm={() =>
        deleteCategory.mutate({
          id: props.row.original.id,
        })
      }
    ></ConfirmDelete>
  );
};
