"use client";

import { type CellContext } from "@tanstack/react-table";
import { type CategoryModel } from "~/server/api/routers/category";
import CreateOrEditCategory from "./create-or-edit-category";

export const getEditCategoryCell = (
  props: CellContext<CategoryModel, unknown>,
) => {
  if (!props.row.original?.id) return <span>{"-|-"}</span>;

  return (
    <CreateOrEditCategory category={props.row.original}></CreateOrEditCategory>
  );
};
