import React from "react";
import ContextMenu from "./ContextMenu";
import type { FileData, ContextData } from "../types/file";

export interface FileExplorerProps {
  files: FileData[];
  currentFileId: string | null;
  contextMenu: ContextData | null;
  onDeleteFile: (fileId: string) => void;
  onRenameFile: (fileId: string) => void;
  onOpenFile: (fileId: string) => void;
  setContextMenu: React.Dispatch<React.SetStateAction<ContextData | null>>;
}

function FileExplorer({
  files,
  contextMenu,
  onDeleteFile,
  onRenameFile,
  onOpenFile,
  setContextMenu,
}: FileExplorerProps) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-[#29323d] bg-[#171c23] p-2 sm:block sm:overflow-y-auto sm:overflow-x-hidden sm:border-b-0 sm:border-r sm:p-3.5">
      <div className="hidden px-2 pb-2 text-[10px] font-bold tracking-[0.12em] text-[#708096] sm:block">
        EXPLORER
      </div>
      {files.map((file) => (
        <div className="group flex min-h-[34px] shrink-0 items-center rounded border border-transparent text-xs text-[#9caabd] transition-colors hover:bg-[#202833] hover:text-[#dbe6f3] sm:my-0.5">
          <div
            className="flex-1 cursor-pointer overflow-hidden whitespace-nowrap px-2.5 py-2 text-ellipsis before:mr-2 before:text-[10px] before:text-[#63a7d1] before:content-['{}']"
            key={file.id}
            onClick={() => {
              onOpenFile(file.id);
            }}
            onContextMenu={(e) => {
              e.preventDefault();

              setContextMenu({
                x: e.clientX,
                y: e.clientY,
                fileId: file.id,
              });
            }}
          >
            {file.name}
          </div>
          {contextMenu && (
            <ContextMenu
              contextMenu={contextMenu}
              onOpenFile={onOpenFile}
              onRenameFile={onRenameFile}
              onDeleteFile={onDeleteFile}
              onClose={() => setContextMenu(null)}
            />
          )}
          <button
            onClick={() => onDeleteFile(file.id)}
            className="mr-0.5 h-7 w-7 rounded border-0 bg-transparent text-[#667487] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#3a252b] hover:text-[#ec8791]"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}

export default FileExplorer;
