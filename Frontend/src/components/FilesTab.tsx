import React from "react";
import type { FileData } from "../types/file";

interface FileTab {
  files: FileData[];
  activeFiles: string[];
  currentFileId: string | null;
  onOpenFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
  
}

function FilesTab({
  files,
  activeFiles,
  currentFileId,
  onOpenFile,
  onCloseFile,
}: FileTab) {

  return (
    <div className="flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-[#29323d] bg-[#191e26]">
      {activeFiles.map((fileId) => {
        const file = files.find((f) => f.id === fileId);
        if (!file) return null;

        return (
          <div
            key={fileId}
            className={`group flex h-full min-w-32 shrink-0 items-center rounded border-r border-[#29323d] text-xs transition-colors ${
              currentFileId === fileId
                ? "bg-[#252d38] text-[#dbe6f3]"
                : "text-[#9caabd] hover:bg-[#202833] hover:text-[#dbe6f3]"
            }`}
          >
            <div
              className="flex-1 cursor-pointer overflow-hidden whitespace-nowrap px-2.5 py-2 text-ellipsis before:mr-2 before:text-[10px] before:text-[#63a7d1] before:content-['{}']"
              onClick={() => onOpenFile(fileId)}
            >
              {file.name}
            </div>
            {file.code !== file.savedCode && (
              <span
                aria-hidden="true"
                className="mr-2 h-2 w-2 shrink-0 rounded-full bg-[#ec8791]"
              />
            )}
            <button
              onClick={() => onCloseFile(file.id)}
              className="mr-0.5 h-7 w-7 rounded border-0 bg-transparent text-[#667487] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#3a252b] hover:text-[#ec8791]"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FilesTab;
