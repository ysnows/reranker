import { RerankerProvider } from "@enconvo/api";

const OMLX_BASE_URL = "http://127.0.0.1:54536";
const DEFAULT_MODEL = "jinaai/jina-reranker-v3-mlx";

export default function main(options: RerankerProvider.RerankerOptions) {
  return new JinaMlxRerankerProvider({ options });
}

export class JinaMlxRerankerProvider extends RerankerProvider {
  constructor(fields: { options: RerankerProvider.RerankerOptions }) {
    super(fields);
  }

  protected async _rerank(
    query: string,
    documents: string[]
  ): Promise<RerankerProvider.RerankResult> {
    const opts = this.options as RerankerProvider.RerankerOptions & {
      modelName?: { value: string };
    };
    const modelId = opts.modelName?.value || DEFAULT_MODEL;

    const resp = await fetch(`${OMLX_BASE_URL}/v1/rerank`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modelId,
        query,
        documents,
        return_documents: false,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => resp.statusText);
      throw new Error(
        `MLX Jina reranker request failed (${resp.status}): ${errText}`
      );
    }

    const data = (await resp.json()) as {
      results?: { index: number; relevance_score: number }[];
      model?: string;
      usage?: Record<string, number>;
    };
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error(
        "MLX Jina reranker: malformed response — missing 'results' array"
      );
    }

    return {
      properties: {
        model: data.model,
        usage: data.usage,
      },
      data: data.results.map((item) => ({
        relevance_score: item.relevance_score,
        index: item.index,
      })),
    };
  }
}
