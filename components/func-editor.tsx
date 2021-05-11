import { Func, Prisma } from '@prisma/client';
import axios from 'axios';
import React, { useState } from 'react';
import { mutate } from 'swr';
import Editor, { OnChange } from "@monaco-editor/react";
import FuncCompileResults from './func-compile-results';
import { CompileFuncResponse } from '../src/services/func';

async function submit(name: string, contents: string): Promise<Func> {
  const data: Prisma.FuncCreateInput = {
    name: name,
    contents: contents
  };
  return (await axios.post<Func>("/api/funcs", data)).data
}

async function compile(contents: string): Promise<CompileFuncResponse> {
  return (await axios.post<CompileFuncResponse>("/api/funcs/compile", {
    contents
  })).data;
}

export default function FuncEditor() {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [compileResults, setCompileResults] = useState<CompileFuncResponse>(null)

  const handleNameChange = (event) => {
    setName(event.target.value)
  };

  const handleEditorChange: OnChange = (contents, event) => {
    setContents(contents);
    compile(contents).then((res) => setCompileResults(res))
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
    <FuncCompileResults results={compileResults} />
  </div >
}
