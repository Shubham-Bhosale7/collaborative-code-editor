import React from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import type { FileData } from "../types/file";

interface CodeEditor {
  currentFile: FileData | null;
  currentFileId: string | null;
  theme: string;
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
  handleEditorMount: OnMount
  onCodeChange: (fileId: string) => void;
}

function CodeEditor({
  currentFile,
  currentFileId,
  theme,
  setFiles,
  handleEditorMount,
  onCodeChange
}: CodeEditor) {
  return (
    <Editor
      className="min-h-0 flex-1 bg-[#1e2228] pt-2"
      height="100%"
      language={currentFile?.language ?? ""}
      theme={theme}
      value={currentFile?.savedCode ?? ""}
      onChange={() => onCodeChange(currentFile.id)}
      onMount={handleEditorMount}
    />
  );
}

export default CodeEditor;
