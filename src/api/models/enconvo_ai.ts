export const rerankerEnconvoAiModels = [
  {
    "title": "Voyage Rerank-2.5 (80 points per invoke)",
    "value": "voyage/rerank-2.5",
    "id": "enconvo-voyage-rerank-2.5",
    "description": "Voyage Rerank 2.5 — high-quality reranking via Enconvo Cloud Plan.",
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": true,
    "is_bring_your_own_key": false
  },
  {
    "title": "Voyage Rerank-2.5 Lite (32 points per invoke)",
    "value": "voyage/rerank-2.5-lite",
    "id": "enconvo-voyage-rerank-2.5-lite",
    "description": "Voyage Rerank 2.5 Lite — cost-effective reranking via Enconvo Cloud Plan.",
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": true,
    "is_bring_your_own_key": false
  },
  {
    "title": "Voyage Rerank-2 (40 points per invoke)",
    "value": "voyage/rerank-2",
    "id": "enconvo-voyage-rerank-2",
    "description": "Voyage Rerank 2 — general-purpose reranking via Enconvo Cloud Plan.",
    "context": 16000,
    "is_online": true,
    "is_enconvo_cloud": true,
    "is_bring_your_own_key": false
  },
  {
    "title": "Voyage Rerank-2 Lite (10 points per invoke)",
    "value": "voyage/rerank-2-lite",
    "id": "enconvo-voyage-rerank-2-lite",
    "description": "Voyage Rerank 2 Lite — lightweight reranking via Enconvo Cloud Plan.",
    "context": 8000,
    "is_online": true,
    "is_enconvo_cloud": true,
    "is_bring_your_own_key": false
  }
];

export default async function main() {
  return Response.json(rerankerEnconvoAiModels);
}
