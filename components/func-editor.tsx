import { Func, Prisma } from '@prisma/client';
import axios from 'axios';
import React, { useState } from 'react';
import { mutate } from 'swr';
import Editor, { OnChange } from "@monaco-editor/react";

async function submit(name: string, contents: string): Promise<Func> {
  const data: Prisma.FuncCreateInput = {
    name: name,
    contents: contents
  };
  return (await axios.post<Func>("/api/funcs", data)).data
}

export default function FuncEditor() {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value)
  };

  const handleEditorChange: OnChange = (contents, event) => {
    setContents(contents);
  }

  const handleSubmit = (event) => {
    submit(name, contents).then(() => { mutate("/api/funcs") })
    event.preventDefault();
    setName("");
    setContents("");
  };

  return <div>
    <h2>{`Editing: ${name}`}</h2>
    <div>
      <Editor
        height="50vh"
        defaultLanguage="typescript"
        defaultValue="// write your function here!"
        onChange={handleEditorChange}
      />
    </div>
    <form onSubmit={handleSubmit}>
      <label>
        Name: <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
    {/* <FuncCompilerError compilerError={compilerError} /> */}
  </div >
}
