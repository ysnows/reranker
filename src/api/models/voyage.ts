export const rerankerVoyageAiModels = [
  {
    "title": "rerank-2.5",
    "value": "rerank-2.5",
    "id": "voyage-rerank-2.5",
    "description": "Voyage Rerank 2.5 — high-quality reranking with your own API key.",
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "rerank-2.5-lite",
    "value": "rerank-2.5-lite",
    "id": "voyage-rerank-2.5-lite",
    "description": "Voyage Rerank 2.5 Lite — cost-effective reranking with your own API key.",
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "rerank-2",
    "value": "rerank-2",
    "id": "voyage-rerank-2",
    "description": "Voyage Rerank 2 — general-purpose reranking with your own API key.",
    "context": 16000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "rerank-2-lite",
    "value": "rerank-2-lite",
    "id": "voyage-rerank-2-lite",
    "description": "Voyage Rerank 2 Lite — lightweight reranking with your own API key.",
    "context": 8000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  }
];

export default async function main() {
  return Response.json(rerankerVoyageAiModels);
}
