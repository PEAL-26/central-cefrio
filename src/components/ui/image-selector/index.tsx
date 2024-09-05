"use client";
import { cn } from "@/libs/utils";
import { CameraIcon, Trash } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { FileCustom, ImageSelectorProps } from "./types";
import { generateFileFromUrl } from "@/helpers/url";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; //5MB
const ACCEPT_FILE_TYPE = {
  // "image/png": [''],
  // "image/jpeg": [''],
  // "image/jpg": [''],
};

export const ImageSelector = forwardRef<HTMLInputElement, ImageSelectorProps>(
  (props, ref) => {
    const {
      maxSize = MAX_UPLOAD_SIZE,
      defaultFiles,
      onChange,
      name = "",
      form,
      url,
      ...rest
    } = props;
    const [files, setFiles] = useState<FileCustom[]>([]);

    const fileRemove = (
      event: { stopPropagation: () => void },
      indexToRemove: number = 0
    ) => {
      event.stopPropagation();

      const updatedFiles = files.slice();
      updatedFiles.splice(indexToRemove, 1);
      setFiles(updatedFiles);
      handleChange(updatedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
      accept: ACCEPT_FILE_TYPE,
      multiple: false,
      maxSize,
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        const newFiles = createImagePreview(acceptedFiles);
        setFiles(newFiles);
        handleChange(newFiles);
      },
    });

    const createImagePreview = (files: File[]) => {
      if (files.length === 0) return [];

      return files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    };

    const handleChange = useCallback(
      (newFiles: FileCustom[]) => {
        const files: FileList = {
          length: newFiles.length,
          item: (i: number) => newFiles[i],
          [Symbol.iterator]: function* () {
            for (let i = 0; i < newFiles.length; i++) {
              yield newFiles[i];
            }
          },
        };

        const event = {
          target: { files },
          currentTarget: { files },
        } as ChangeEvent<HTMLInputElement>;

        if (name) {
          form?.clearErrors(name);
          form?.setValue(name, files.length > 0 ? files : null);
        }

        onChange?.(event);
      },
      [form, name, onChange]
    );

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
      if (url) {
        (async () => {
          const file = await generateFileFromUrl(url);
          if (file) {
            const newFiles = createImagePreview([file]);
            setFiles(newFiles);
          }
        })();
      }
    }, [url]);

    useEffect(() => {
      const file = form?.watch(name);

      if (file) {
        const newFiles = createImagePreview([file]);
        setFiles(newFiles);
      }
    }, [form, name]);

    const errorMessage = form?.getFieldState(name)?.error?.message;

    return (
      <div {...getRootProps()}>
        <div className="flex h-[170px] w-[170px] cursor-pointer items-center justify-center border rounded">
          {files.length === 0 && (
            <CameraIcon height={80} width={80} className="text-primary/50" />
          )}
          {files.map((file, index) => (
            <div
              key={index}
              className="roundform?.watch(name)ed-sm group relative h-[170px] w-[170px]"
            >
              <Image
                alt={""}
                src={file.preview}
                fill
                className="rounded-sm object-center"
                onLoad={() => URL.revokeObjectURL(file.preview)}
              />
              <button
                onClick={fileRemove}
                className="absolute right-2 top-2 z-50 cursor-pointer rounded-lg bg-red-600 p-1.5 text-white hover:bg-red-800 group-hover:visible lg:invisible"
              >
                <Trash className="text-white group-hover:visible" size={20} />
              </button>
            </div>
          ))}
          <input ref={ref} {...getInputProps()} {...rest} />
        </div>
        {errorMessage && (
          <p className={cn("text-sm font-medium text-destructive")}>
            {String(errorMessage)}
          </p>
        )}
      </div>
    );
  }
);

ImageSelector.displayName = "ImageSelector";
