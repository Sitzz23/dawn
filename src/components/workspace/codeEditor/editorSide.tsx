import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { nord } from "@uiw/codemirror-themes-all";
import { langs } from "@uiw/codemirror-extensions-langs";
import { jsx } from "react/jsx-runtime";

type Props = {};

const EditorSide = (props: Props) => {
  return (
    <div className=" content-center h-full p-2 rounded-lg ">
      <CodeMirror
        // value={code}
        theme={nord}
        style={{ fontSize: 14 }}
        height="200px"
        extensions={[langs.jsx()]}
        // onChange={(editor, data, value) => {
        //   handleCodeInput(editor, data, value);
        // }}
        // className="cursor-text"
      />
    </div>
  );
};

export default EditorSide;
