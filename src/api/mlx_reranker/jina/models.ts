import { ListCache, RequestOptions } from "@enconvo/api";

export const jinaRerankerModels = [
  {
    title: "Jina Reranker v3",
    value: "jinaai/jina-reranker-v3-mlx",
    id: "jina-reranker-v3-mlx",
    description:
      "Jina Reranker v3 — multilingual listwise reranker, on-device on Apple Silicon.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    context: 32768,
    download_size: "1.1 GB",
  },
];

async function fetchModels(
  _options: RequestOptions
): Promise<ListCache.ListItem[]> {
  return jinaRerankerModels as any;
}

export default async function main(req: Request) {
  const options = (await req.json().catch(() => ({}))) as RequestOptions;

  const modelCache = new ListCache(fetchModels);
  const items = await modelCache.getList(options);

  return Response.json(items);
}
