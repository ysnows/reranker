import { RerankerProvider } from "@enconvo/api";

const MLX_BASE_URL = "http://127.0.0.1:54535/mlx_manage/mlx_reranker";
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

    const resp = await fetch(`${MLX_BASE_URL}/rerank`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hf_model_id: modelId,
        query,
        documents,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => resp.statusText);
      throw new Error(
        `MLX Jina reranker request failed (${resp.status}): ${errText}`
      );
    }

    const data = (await resp.json()) as {
      data?: { index: number; relevance_score: number }[];
      model?: string;
      usage?: Record<string, number>;
    };
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error(
        "MLX Jina reranker: malformed response — missing 'data' array"
      );
    }

    return {
      properties: {
        model: data.model,
        usage: data.usage,
      },
      data: data.data.map((item) => ({
        relevance_score: item.relevance_score,
        index: item.index,
      })),
    };
  }
}
