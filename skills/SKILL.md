---
name: reranker
description: >
  Reranker provider integrations for Voyage AI, SiliconFlow, and Enconvo Cloud Plan, with model management APIs.
metadata:
  author: EnconvoAI
  version: "1.0.11"
---

## API Reference

Just use the `local_api` tool to request these APIs.

| Endpoint | Description |
|----------|-------------|
| `reranker/rerank` | Rerank a list of documents against a query using the configured reranker provider. Returns a Voyage-compatible response: `{ object: "list", data: [{ relevance_score, index }], model, usage }`.. _4 params — use `check_local_api_schemas` tool_ |
| `reranker/models/enconvo_ai` | _No params_ |
| `reranker/models/siliconflow` | _No params_ |
| `reranker/models/voyage` | _No params_ |

