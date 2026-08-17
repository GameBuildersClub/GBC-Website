import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every route here is prerendered at build time and nothing revalidates at runtime,
// so prerendered payloads are read straight from Workers Static Assets — no R2/KV
// bucket to provision and no origin round trip.
//
// Do NOT set enableCacheInterception here: it mishandles RSC prefetch responses
// (`?_rsc=`), which sends the App Router into an endless prefetch retry loop
// (~94 req/s per open tab, measured) and burns the Workers request quota.
//
// When the admin CMS lands and pages need runtime revalidation, swap this for
// withRegionalCache(r2IncrementalCache) plus a NEXT_INC_CACHE_R2_BUCKET binding.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
