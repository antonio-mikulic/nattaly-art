import { type CategoryModel } from "~/server/api/routers/category";

export function isValueCategoryModel(
  value: unknown,
): value is CategoryModel | undefined {
  if (!value) return false;
  if (!value.hasOwnProperty("id")) return false;
  if (!value.hasOwnProperty("name")) return false;
  return true;
}
