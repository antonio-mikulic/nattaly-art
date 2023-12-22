"use client";

import { type CellContext } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDateCell = (props: CellContext<any, unknown>) => {
  const value = props.getValue();
  if (!value) return <span>{"-|-"}</span>;

  const date = new Date(value as string);
  if (!isNaN(date.getTime())) {
    return <span>{date.toLocaleDateString()}</span>;
  }

  return <span>{"Invalid date"}</span>;
};
