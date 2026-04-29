import { RerankerProvider } from "@enconvo/api";

const MLX_BASE_URL = "http://127.0.0.1:54535/mlx_manage/mlx_reranker";
const DEFAULT_MODEL = "mlx-community/Qwen3-Reranker-0.6B-mxfp8";

export default function main(options: RerankerProvider.RerankerOptions) {
  return new Qwen3RerankerProvider({ options });
}

export class Qwen3RerankerProvider extends RerankerProvider {
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
        `MLX Qwen3 reranker request failed (${resp.status}): ${errText}`
      );
    }

    const data = (await resp.json()) as {
      data?: { index: number; relevance_score: number }[];
      model?: string;
      usage?: Record<string, number>;
    };
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error(
        "MLX Qwen3 reranker: malformed response — missing 'data' array"
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
