"use client";

import { type CategoryModel } from "~/server/api/routers/category";
import { DataTable } from "~/app/_components/shared/table/data-table";
import { api } from "~/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { getDateCell } from "~/app/_components/shared/table/date-cell";
import CreateOrEditCategory from "~/app/admin/categories/_components/create-or-edit-category";
import { getEditCategoryCell } from "./_components/edit-category-cell";
import { getDeleteCategoryCell } from "./_components/delete-category-cell";
import Spinner from "~/app/_components/layout/spinner";

const columns: ColumnDef<CategoryModel>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (props) => getDateCell(props),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: (props) => getDateCell(props),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    header: "Edit",
    cell: (props) => getEditCategoryCell(props),
  },
  {
    header: "Delete",
    cell: (props) => getDeleteCategoryCell(props),
  },
];

export default function CategoryPage() {
  const { data, isLoading, isError } = api.category.getAll.useQuery({
    limit: 50,
    offset: 0,
  });

  return (
    <div className="text-black">
      <div className="container mx-auto p-4">
        <section className="flex justify-between">
          <h2 className="mb-8 flex items-baseline text-3xl font-bold text-rose-500">
            Categories
            {isLoading ? (
              <Spinner />
            ) : (
              <span className="ml-2 text-sm">
                {data?.amount?.value
                  ? `(${data.amount.value})`
                  : "No categories yet"}
              </span>
            )}
          </h2>
          <CreateOrEditCategory />
        </section>
        <section className={isLoading || isError ? "hidden" : ""}>
          <DataTable data={data?.categories ?? []} columns={columns} />
        </section>
      </div>
    </div>
  );
}
