import { RerankerProvider } from "@enconvo/api"

/**
 * Preload the configured reranker provider on app startup.
 * @private
 */
export default async function main() {
    RerankerProvider.fromEnv().then((provider) => {
        provider.preload()
    })
}
