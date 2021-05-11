import { CompileFuncResponse } from "../src/services/func";

export default function FuncCompileResults({ results }: { results?: CompileFuncResponse }) {
  return <div>
    <p>Stdout<code>{results?.stdout}</code></p>
    <p>Stderr<code>{results?.stderr}</code></p>
    <p>Error<code>{results?.error?.message}</code></p>
  </div>
}
