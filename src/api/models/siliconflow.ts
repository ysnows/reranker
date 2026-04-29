export const rerankerSiliconflowModels = [
  {
    "title": "BAAI/bge-reranker-v2-m3",
    "value": "BAAI/bge-reranker-v2-m3",
    "id": "siliconflow-bge-reranker-v2-m3",
    "description": "BGE Reranker V2 M3 — multilingual reranking via SiliconFlow.",
    "context": 8000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "netease-youdao/bce-reranker-base_v1",
    "value": "netease-youdao/bce-reranker-base_v1",
    "id": "siliconflow-bce-reranker-base",
    "description": "BCE Reranker Base — Chinese-English reranking via SiliconFlow.",
    "context": 512,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  }
];

export default async function main() {
  return Response.json(rerankerSiliconflowModels);
}
