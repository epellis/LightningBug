import { Func, Prisma } from '@prisma/client';
import axios from 'axios';
import React, { useState } from 'react';

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

  const handleContentsChange = (event) => {
    setContents(event.target.value);
  };

  const handleSubmit = (event) => {
    submit(name, contents).then(func => console.log(JSON.stringify(func)))
    event.preventDefault();
  };

  return <div>
    <h2>{`Editing: ${name}`}</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Name: <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Contents: <input type="text" value={contents} onChange={handleContentsChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div >
}
