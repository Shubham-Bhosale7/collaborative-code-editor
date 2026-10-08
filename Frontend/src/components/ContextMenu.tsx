import React from "react";
import type { ContextData } from "../types/file";

interface ContextMenuProps {
  contextMenu: ContextData;
  onRenameFile: (fileId: string) => void;
  onDeleteFile: (fileId: string) => void;
  onOpenFile: (fileId: string) => void;
  onClose: () => void;
}

function ContextMenu({
  contextMenu,
  onRenameFile,
  onDeleteFile,
  onOpenFile,
  onClose,
}: ContextMenuProps) {
  const fileId = contextMenu.fileId;

  return (
    <div
      className="z-50 min-w-[150px] overflow-hidden rounded border border-[#35404c] bg-[#222933] p-1 text-xs text-[#c8d2df] shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
      style={{
        position: "fixed",
        left: contextMenu.x,
        top: contextMenu.y,
      }}
    >
      <div
        onClick={() => {
          onOpenFile(fileId);
          onClose();
        }}
        className="cursor-pointer rounded px-3 py-2 transition-colors hover:bg-[#2f4d61] hover:text-[#f0f7ff]"
      >
        Open
      </div>
      <div
        onClick={() => {
          onRenameFile(contextMenu.fileId);
          onClose();
        }}
        className="cursor-pointer rounded px-3 py-2 transition-colors hover:bg-[#2f4d61] hover:text-[#f0f7ff]"
      >
        Rename
      </div>
      <div
        onClick={() => {
          onDeleteFile(contextMenu.fileId);
          onClose();
        }}
        className="cursor-pointer rounded px-3 py-2  transition-colors hover:bg-[#512f36] hover:text-[#ffd9dc]"
      >
        Delete
      </div>
      <div className="cursor-pointer rounded px-3 py-2 transition-colors hover:bg-[#2f4d61] hover:text-[#f0f7ff]">
        Duplicate
      </div>
    </div>
  );
}

export default ContextMenu;
