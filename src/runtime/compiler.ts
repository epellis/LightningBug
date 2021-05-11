import asc from "assemblyscript/cli/asc"

export type CompileResult = {
  binary: Uint8Array,
  stdout: string,
  stderr: string,
  error?: Error,
}

export function compileSource(contents: string): CompileResult {
  const stdout = asc.createMemoryStream();
  const stderr = asc.createMemoryStream();

  let compileError: Error;
  let binary: Uint8Array = new Uint8Array();

  asc.main([
    "main.ts",
    "--binaryFile", "main.wasm",
  ], {
    stdout,
    stderr,
    readFile(name, baseDir) {
      if (name === "main.ts") {
        return contents;
      } else {
        return "";
      }
    },
    writeFile(name, data, baseDir) {
      if (name === "main.wasm") {
        binary = new Uint8Array([...binary, ...data])
      }
    },
    listFiles(dirname, baseDir) {
      return [];
    }
  }, err => {
    if (err) {
      compileError = err;
    }
    return 0;
  })

  return {
    binary,
    stdout: stdout.toString(),
    stderr: stderr.toString(),
    error: compileError,
  }
}
