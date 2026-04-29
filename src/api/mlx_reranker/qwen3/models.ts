import { ListCache, RequestOptions } from "@enconvo/api";

export const qwen3RerankerModels = [
  {
    title: "Qwen3-Reranker 0.6B (mxfp8)",
    value: "mlx-community/Qwen3-Reranker-0.6B-mxfp8",
    id: "mlx-qwen3-reranker-0.6b-mxfp8",
    description:
      "Alibaba Qwen3-Reranker 0.6B (mxfp8) — small, multilingual reranker; high-precision FP8 weights. Default.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    context: 32768,
    download_size: "600 MB",
  },
  {
    title: "Qwen3-Reranker 0.6B (4bit DWQ)",
    value: "mlx-community/Qwen3-Reranker-0.6B-4bit-DWQ",
    id: "mlx-qwen3-reranker-0.6b-4bit-dwq",
    description:
      "Alibaba Qwen3-Reranker 0.6B (4bit DWQ) — smallest footprint multilingual reranker.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    context: 32768,
    download_size: "335 MB",
  },
  {
    title: "Qwen3-Reranker 4B (4bit DWQ)",
    value: "mlx-community/Qwen3-Reranker-4B-4bit-DWQ",
    id: "mlx-qwen3-reranker-4b-4bit-dwq",
    description:
      "Alibaba Qwen3-Reranker 4B (4bit DWQ) — high-quality multilingual reranker.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    context: 32768,
    download_size: "2.1 GB",
  },
  {
    title: "Qwen3-Reranker 8B (4bit DWQ)",
    value: "mlx-community/Qwen3-Reranker-8B-4bit-DWQ",
    id: "mlx-qwen3-reranker-8b-4bit-dwq",
    description:
      "Alibaba Qwen3-Reranker 8B (4bit DWQ) — top-tier multilingual reranker.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    context: 32768,
    download_size: "4.0 GB",
  },
];

async function fetchModels(
  _options: RequestOptions
): Promise<ListCache.ListItem[]> {
  return qwen3RerankerModels as any;
}

export default async function main(req: Request) {
  const options = (await req.json().catch(() => ({}))) as RequestOptions;

  const modelCache = new ListCache(fetchModels);
  const items = await modelCache.getList(options);

  return Response.json(items);
}
