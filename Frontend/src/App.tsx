import React, { useState, useEffect, useRef } from "react";
import type { FileData, ContextData } from "./types/file";
import FileExplorer from "./components/FileExplorer";
import CodeEditor from "./components/CodeEditor";
import FilesTab from "./components/FilesTab";
import BottomBar from "./components/BottomBar";
import type { OnMount } from "@monaco-editor/react";

function App() {
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);

  const [files, setFiles] =
    useState<FileData[]>([
      {
        id: "1",
        name: "App.tsx",
        language: "typescript",
        savedCode: `function App(){
      console.log("Hello")
      }`,
        code: `function App(){
      console.log("Hello")
      }`,
      },
      {
        id: "2",
        name: "index.ts",
        language: "typescript",
        savedCode: `console.log("Hello World");`,
        code:  `console.log("Hello World");`,
      },
    ]) ?? null;

  const [theme, setTheme] = useState("vs-dark");
  const [currentFileId, setcurrentFileId] = useState<string | null>("1");
  const [contextMenu, setContextMenu] = useState<ContextData | null>(null);
  const [activeFiles, setActiveFiles] = useState<string[]>(["1", "2"]);

  const currentFile: FileData | null =
    files.find((file) => file.id === currentFileId) ?? null;

  const addNewFile = () => {
    console.log("Add file");
    const fileName = prompt("Enter file name");

    if (!fileName?.trim()) return;

    const newFile: FileData = {
      id: crypto.randomUUID(),
      name: fileName.trim(),
      language: getLanguage(fileName),
      code: "",
      savedCode: "",
    };

    setFiles((prevFiles) => [...prevFiles, newFile]);
    console.log(files + "files");
    setcurrentFileId(newFile.id);
    console.log(currentFileId + "currentfile");
    setActiveFiles((prevFiles) => [...prevFiles, newFile.id]);
    console.log(activeFiles + "activefiles");
  };

  const deleteFile = (id: string) => {
    const recentFiles = files.filter((file) => file.id !== id);
    setFiles(recentFiles);
    const nextFile = recentFiles[0];
    console.log(nextFile);

    if (!nextFile) {
      setcurrentFileId(null);
    } else {
      setcurrentFileId(nextFile.id);
    }

    setContextMenu(null);
  };

  const renameFile = (id: string) => {
    const newName = prompt("Enter file name") as string;

    setFiles(
      files.map((file) => (file.id === id ? { ...file, name: newName } : file)),
    );

    setContextMenu(null);
  };

  const saveFile = () => {
    files.map
  };

  const closeFile = (id: string) => {
    const recentFiles = activeFiles.filter((fileId) => fileId !== id);

    setActiveFiles(recentFiles);

    if (currentFileId === id) {
      const closedIndex = activeFiles.indexOf(id);

      const nextFileId =
        recentFiles[Math.min(closedIndex, recentFiles.length - 1)];

      setcurrentFileId(nextFileId ?? null);
    }
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;
  };

  const getLanguage = (fileName: string): string => {
    if (!monacoRef.current) return "plaintext";

    const extension = "." + fileName.split(".").pop()?.toLowerCase();

    const language = monacoRef.current.languages
      .getLanguages()
      .find((language) => language.extensions?.includes(extension));

    return language?.id ?? "plaintext";
  };

  const openFile = (id: string) => {
    setActiveFiles((prevFiles) =>
      prevFiles.includes(id) ? prevFiles : [...prevFiles, id],
    );

    setcurrentFileId(id);
  };

  const changeLanguage = (language: string) => {
    if (!currentFileId) return;

    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === currentFileId ? { ...file, language } : file,
      ),
    );
  };

  const handleCodeChange = (value: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === currentFileId ? { ...file, code: value } : file,
      ),
    );
  };

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "vs-dark" ? "vs" : "vs-dark"));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        console.log(e.target)
        saveFile();
      }

      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        console.log("Event detected");
        addNewFile();
      }

      // if (e.ctrlKey && e.key.toLowerCase() === "p") {
      //   e.preventDefault();
      //   searchFile();
      // }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log(files);
    console.log(activeFiles);
    console.log(currentFile?.language);
  }, [files]);

  return (
    <div className="h-screen min-w-[320px] overflow-hidden bg-[#11151b] font-mono text-[#d7dee9]">
      <div className="flex h-full flex-col bg-[radial-gradient(circle_at_18%_0%,rgba(42,104,145,0.12),transparent_34%),#11151b]">
        <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] sm:grid-cols-[218px_minmax(0,1fr)] sm:grid-rows-1">
          <FileExplorer
            files={files}
            currentFileId={currentFileId}
            contextMenu={contextMenu}
            onDeleteFile={deleteFile}
            onRenameFile={renameFile}
            onOpenFile={openFile}
            setContextMenu={setContextMenu}
          />

          <div className="flex min-h-0 flex-col">
            <FilesTab
              files={files}
              activeFiles={activeFiles}
              currentFileId={currentFileId}
              onOpenFile={openFile}
              onCloseFile={closeFile}
              onCodeChange={handleCodeChange}
            />
            <CodeEditor
              currentFile={currentFile}
              theme={theme}
              setFiles={setFiles}
              currentFileId={currentFileId}
              handleEditorMount={handleEditorMount}
              onCodeChange={handleCodeChange}
            />
            <BottomBar
              currentFile={currentFile}
              theme={theme}
              onChangeTheme={changeTheme}
              onChangeLanguage={changeLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
