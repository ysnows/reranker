import { RerankerProvider } from "@enconvo/api"

/** Rerank request parameters (Voyage/Cohere-compatible shape) */
interface RerankRequest {
  /** @required Search query used to rank the documents by relevance */
  query: string
  /** @required Documents to score and rank against the query */
  documents: string[]
  /** Model name echoed back in the response. The active reranker model is determined by the configured provider. */
  model?: string
  /** Limit the response to the top N most relevant documents, sorted by descending relevance_score */
  top_n?: number
}

/**
 * Rerank a list of documents against a query using the configured reranker provider.
 * Returns a Voyage-compatible response: `{ object: "list", data: [{ relevance_score, index }], model, usage }`.
 * @param {Request} req - Request object, body is {@link RerankRequest}
 * @returns Reranked documents with relevance scores and original indices
 */
export default async function main(req: Request) {
  const { query, documents, model, top_n } = (await req.json()) as RerankRequest

  const provider = await RerankerProvider.fromEnv()
  const result = await provider.rerank(query, documents)

  const sorted = [...result.data].sort((a, b) => b.relevance_score - a.relevance_score)
  const data = typeof top_n === "number" ? sorted.slice(0, top_n) : sorted

  const resolvedModel = model ?? result.properties?.model ?? provider.getOptions().modelName?.value ?? ""

  return {
    object: "list",
    data: data.map((item) => ({
      relevance_score: item.relevance_score,
      index: item.index,
    })),
    model: resolvedModel,
    usage: result.properties?.usage ?? {},
  }
}
