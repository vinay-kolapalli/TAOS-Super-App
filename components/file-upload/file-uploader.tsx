"use client";
import { orpc } from "@/lib/orpc/client";
import { tryCatch } from "@/lib/try-catch";
import { cn } from "@/lib/utils";
import { safe } from "@orpc/client";
import { IconUpload } from "@tabler/icons-react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { parseAcceptProp, validateFiles } from "../../utils/file-upload";
import { UploadedFiles } from "./uploaded-files";

export type OnUploadFiles = Array<{ url: string; path: string }>;

export interface Props {
  files: (string | null | undefined)[];
  isUploading?: boolean;
  setIsUploading?: React.Dispatch<React.SetStateAction<boolean>>;
  folder: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeInMB?: number; // in MB
  onUpload: (files: OnUploadFiles, error?: string) => void;
  onDelete: (file: string) => void;
}

export function FileUploader({
  files,
  folder,
  onUpload,
  isUploading,
  setIsUploading,
  accept,
  multiple = false,
  maxFiles,
  maxSizeInMB,
  onDelete,
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: parseAcceptProp(accept),
    multiple,
    maxFiles,
    disabled: isUploading,
  });
  const filteredFiles = useMemo(() => files.filter((file) => !!file), [files]);
  const displayUploader = useMemo(
    () => (maxFiles ? maxFiles !== filteredFiles.length : true),
    [maxFiles, filteredFiles]
  );

  async function handleUpload(files: File[]) {
    const validation = validateFiles(files, accept, maxSizeInMB, maxFiles);

    if (!validation.valid) {
      const errorMessage = validation.errors[0] || "Invalid files";
      onUpload?.([], errorMessage);
      return;
    }

    const filesToUpload = validation.validFiles;
    if (filesToUpload.length === 0) return;

    setIsUploading?.(true);

    const uploadPromises = filesToUpload.map(async (file) => {
      const { error, data } = await safe(orpc.files.upload({ file, folder }));

      if (error) {
        throw new Error(error.message);
      }

      return {
        url: data.data.url,
        path: data.data.path,
      };
    });

    const results = await tryCatch(Promise.all(uploadPromises));
    onUpload?.(results.data ?? [], results.error?.message);

    setIsUploading?.(false);
  }

  function handleDrop(acceptedFiles: File[]) {
    if (acceptedFiles.length === 0) return;
    handleUpload(acceptedFiles);
  }

  return (
    <div className="space-y-2">
      {displayUploader && (
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors",
            isDragActive && "border-primary bg-primary/5",
            !isDragActive && "border-muted-foreground/25",
            isUploading && "pointer-events-none opacity-50",
            !isUploading && "hover:border-primary hover:bg-primary/5"
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-2">
            <IconUpload className="h-6 w-6 text-muted-foreground" />
            <div className="text-sm">
              <span className="text-xs font-medium">Click to upload</span> or drag and drop
            </div>
          </div>

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            </div>
          )}
        </div>
      )}
      {/* @ts-expect-error - filteredFiles is filtered to only include strings */}
      <UploadedFiles files={filteredFiles} onDelete={onDelete} />
    </div>
  );
}
