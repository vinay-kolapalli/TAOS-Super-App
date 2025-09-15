import { getSignedUrl } from "@/lib/s3";
import { getFileIcon, getFileName, isImage } from "@/utils/file-upload";
import Image from "next/image";

export interface Props {
  src: string;
}

export function FilePreview({ src }: Props) {
  const fileName = getFileName(src);
  const FileIcon = getFileIcon(fileName);
  const isImageFile = isImage(fileName);

  if (isImageFile) {
    return (
      <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-muted">
        <Image src={getSignedUrl(src)} width={300} height={300} alt={fileName} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-muted flex items-center justify-center">
      <FileIcon className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}
