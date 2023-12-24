"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/ui/button";
import { Label } from "~/ui/label";
import { Textarea } from "~/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { Input } from "~/ui/input";
import { type CategoryModel } from "~/server/api/routers/category";
import { DialogDescription } from "@radix-ui/react-dialog";

export interface CreateOrEditCategoryProps {
  category?: CategoryModel;
}

export interface CategoryPagePropRef extends CreateOrEditCategoryProps {
  ref: React.MutableRefObject<null>;
}

export default function CreateOrEditCategory({
  category,
}: CreateOrEditCategoryProps) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [parentId, setParentId] = useState(category?.parentId ?? undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const utils = api.useUtils();

  const availableCategories = api.category.getAll.useQuery({
    limit: 50,
    offset: 0,
  });

  const create = api.category.create.useMutation({
    onSuccess: async () => {
      closeDialog();
      await utils.category.getAll.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const edit = api.category.update.useMutation({
    onSuccess: async () => {
      closeDialog();
      await utils.category.getAll.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const resetForm = () => {
    setName(category?.name ?? "");
    setDescription(category?.description ?? "");
    setParentId(category?.parentId ?? undefined);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setError(undefined);
  };

  const toggleOpen = async () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      resetForm();
      await availableCategories.refetch();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button variant={category?.id ? "outline" : "default"}>
          {category?.id ? "Edit" : "Create"} Category
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="DialogContent">
          <DialogTitle>
            {" "}
            {category?.id ? "Edit" : "Create"} a new category
          </DialogTitle>
          {category?.id && (
            <DialogDescription className="text-sm font-light">
              <span className="block">
                Created at: {category.createdAt.toLocaleString()}
              </span>
              {category.updatedAt &&
                category.updatedAt !== category.updatedAt && (
                  <span className="block">
                    Updated at: {category.updatedAt.toLocaleString()}
                  </span>
                )}
            </DialogDescription>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (category?.id) {
                edit.mutate({ id: category.id, name, description, parentId });
              } else {
                create.mutate({ name, description, parentId });
              }
            }}
          >
            <div className="mb-4">
              <Label htmlFor="name">
                Category Name <span className="text-red-700">*</span>
              </Label>
              <Input
                required={true}
                minLength={3}
                className="mt-1 w-full"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name && name.length < 3 && (
                <p className="pt-1  text-sm text-red-500">
                  Name must be at least 3 characters long
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="description">
                Description <span className="text-red-700">*</span>
              </Label>
              <Textarea
                required={true}
                minLength={3}
                className="mt-1 w-full"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {description && description.length < 3 && (
                <p className="pt-1 text-sm text-red-500">
                  Description must be at least 3 characters long
                </p>
              )}
            </div>
            <div className="mb-8">
              <Label htmlFor="parentId">Parent Category</Label>
              {availableCategories.data?.categories?.length ? (
                <Select
                  value={parentId?.toString() ?? undefined}
                  onValueChange={(value) => setParentId(parseInt(value))}
                >
                  <SelectTrigger value={undefined} className="w-full">
                    <SelectValue placeholder="Choose a parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={"0"} value={"0"}>
                      No parent
                    </SelectItem>

                    {availableCategories.data?.categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-red-500">
                  There are no categories available
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <DialogClose asChild>
                <Button className="mr-2" variant="ghost" onClick={closeDialog}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  create.isLoading ||
                  edit.isLoading ||
                  name?.length < 3 ||
                  description?.length < 3
                }
              >
                {category?.id ? "Update" : "Create"}
              </Button>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
