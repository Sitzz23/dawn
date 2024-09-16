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
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import * as themes from "@uiw/codemirror-themes-all";

type Props = {};

const EditorSide = (props: Props) => {
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState(language.boilerplate);

  const handleLanguageChange = (value: string) => {
    const newLanguage =
      languages.find((lang) => lang.value === value) || languages[0];
    setLanguage(newLanguage);
    setCode(newLanguage.boilerplate);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <Select
          onValueChange={handleLanguageChange}
          defaultValue={language.value}
        >
          <SelectTrigger className="w-[180px]">
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
        {/* <Button onClick={handleRunCode}>Run Code</Button> */}
      </div>
      <div className="border rounded-md overflow-hidden grow h-full">
        <CodeMirror
          value={code}
          className="h-full"
          theme={themes.tokyoNight}
          extensions={[langs[language.value as keyof typeof langs]()]}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
};

export default EditorSide;
