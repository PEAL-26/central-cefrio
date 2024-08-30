import { FieldName, FieldValues, UseFormReturn } from "react-hook-form";

export interface FileCustom extends File {
  preview: string;
}

export interface ImageSelectorProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form" | "name"> {
  maxSize?: number;
  defaultFiles?: FileCustom[];
  name?: FieldName<FieldValues>;
  form?: UseFormReturn<any>;
  url?: string;
}

export const acceptedFileTypes = {
  image: {
    "image/png": [],
    "image/jpeg": [],
  },
  file: {
    "application/pdf": [],
  },
};
