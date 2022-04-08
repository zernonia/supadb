import { setCDN, setOnigasmWASM, Highlighter, getHighlighter } from "shiki"

setOnigasmWASM(import.meta.env.DEV ? "" : "/shiki/dist/onigasm.wasm")
setCDN(import.meta.env.DEV ? "node_modules/shiki/" : "/shiki/")

export let highlighter: Highlighter

export async function initHighlighter() {
  highlighter = await getHighlighter({
    themes: ["dark-plus"],
    langs: ["ts", "graphql"],
  })
}
