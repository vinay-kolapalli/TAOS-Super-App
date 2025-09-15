import { getSignedUrl } from "@/lib/s3";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { getFileName } from "../../utils/file-upload";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FilePreview } from "./file-preview";

export interface Props {
  files: string[];
  onDelete: (file: string) => void;
}

export function UploadedFiles({ files, onDelete }: Props) {
  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    const file = e.currentTarget.dataset.file;
    if (file) onDelete?.(file);
  }

  if (files.length === 0) return null;

  return (
    <div className="grid gap-2">
      {files.map((file) => (
        <Card key={file} className="p-2">
          <div className="flex items-center gap-3">
            <FilePreview src={file} />
            <div className="flex-1 min-w-0">
              <Link href={getSignedUrl(file)} target="_blank" rel="noopener noreferrer" className="block">
                <p className="text-sm font-medium truncate hover:text-primary transition-colors">{getFileName(file)}</p>
              </Link>
            </div>

            <Button
              type="button"
              data-file={file}
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="flex-shrink-0 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <IconTrash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
