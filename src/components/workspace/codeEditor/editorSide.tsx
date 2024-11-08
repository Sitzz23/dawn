"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants/editorUtils";
import React, { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";

type Props = {};

const EditorSide = (props: Props) => {
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState(language.boilerplate);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("editorLanguage");
    const savedCode = localStorage.getItem("editorCode");

    if (savedLanguage) {
      const loadedLanguage =
        languages.find((lang) => lang.value === savedLanguage) || languages[0];
      setLanguage(loadedLanguage);
    }

    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const saveToLocalStorage = useCallback(
    (newCode: string, newLanguage: typeof language) => {
      localStorage.setItem("editorCode", newCode);
      localStorage.setItem("editorLanguage", newLanguage.value);
    },
    []
  );

  // const debouncedSave = useCallback(
  //   debounce(async (newCode: string, newLanguage: typeof language) => {
  //     setIsSaved(false);
  //     saveToLocalStorage(newCode, newLanguage);
  //     // await saveToConvex(newCode, newLanguage.value);
  //     setIsSaved(true);
  //   }, 1000),
  //   []
  // );

  const handleLanguageChange = (value: string) => {
    const newLanguage =
      languages.find((lang) => lang.value === value) || languages[0];
    setLanguage(newLanguage);
    setCode(newLanguage.boilerplate);
    // debouncedSave(newLanguage.boilerplate, newLanguage);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // debouncedSave(newCode, language);
  };

  return (
    <div className="flex flex-col gap-4 h-full pr-2">
      <div className="flex justify-between items-center">
        <Select onValueChange={handleLanguageChange} value={language.value}>
          <SelectTrigger className="w-[180px] border-none bg-white/5">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${isSaved ? "bg-green-500" : "bg-yellow-500"}`}
          ></div>
          <span className="text-sm text-gray-400">
            {isSaved ? "Saved" : "Saving..."}
          </span>
        </div>
      </div>
      <div className="rounded-md overflow-hidden grow h-full">
        <CodeMirror
          value={code}
          className="h-full"
          theme={themes.tokyoNight}
          extensions={[langs[language.value as keyof typeof langs]()]}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
};

export default EditorSide;
