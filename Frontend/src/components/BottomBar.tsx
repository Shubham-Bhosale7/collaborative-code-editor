import React from "react";
import type { FileData } from "../types/file";

interface BottomBar {
  currentFile: FileData | null;
  theme: string;
  onChangeTheme: () => void;
  onChangeLanguage: (language: string) => void;
}

function BottomBar({
  currentFile,
  theme,
  onChangeTheme,
  onChangeLanguage,
}: BottomBar) {
  return (
    <div className="flex h-9 shrink-0 items-center justify-end gap-2 border-t border-[#29323d] bg-[#191e26] px-3">
      <label>
        <select
          aria-label="Editor language"
          className="h-7 cursor-pointer appearance-none rounded border border-transparent bg-transparent px-2 text-xs text-[#9caabd] outline-none transition-colors hover:border-[#35404c] hover:bg-[#222933] focus:border-[#4d86ad]"
          value={currentFile?.language ?? ""}
          onChange={(e) => {
            onChangeLanguage(e.target.value);
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </label>
      <button
        type="button"
        aria-label={
          theme === "vs-dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        title={
          theme === "vs-dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        onClick={onChangeTheme}
        className="flex h-7 w-7 items-center justify-center rounded border border-transparent bg-transparent text-base text-[#b8c4d2] transition-colors hover:border-[#35404c] hover:bg-[#222933]"
      >
        {theme === "vs-dark" ? "☼" : "☾"}
      </button>
    </div>
  );
}

export default BottomBar;
