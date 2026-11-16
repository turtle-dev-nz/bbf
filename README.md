# Big Brain Foundation Website

## Running locally

```
npm start
```

## Builds

| Command                 | Use for    | Indexable? |
| ----------------------- | ---------- | ---------- |
| `npm run build`         | Production | Yes        |
| `npm run build:staging` | Staging    | No         |

The staging build adds `<meta name="robots" content="noindex, nofollow">`, swaps `robots.txt` to
`Disallow: /`, adds a Cloudflare `_headers` file with `X-Robots-Tag: noindex`, and drops `sitemap.xml`.

## Deploying to staging (Cloudflare Worker)

Run **Actions → Deploy to staging → Run workflow** on GitHub and pick the branch to test (or type
any branch, tag or commit into `ref`). It builds in staging mode and deploys to
<https://bbf.owennicholson.com>. Only one branch is on staging at a time — the latest deploy wins.
`main` is untouched until you deploy to production.

Worker config is in [`wrangler.jsonc`](wrangler.jsonc); setup steps (secrets, environment) are at the
top of [`.github/workflows/deploy-staging.yml`](.github/workflows/deploy-staging.yml).

## Deploying to production (cPanel)

Run **Actions → Deploy to cPanel → Run workflow** on GitHub. It builds in production mode and uploads
`dist/` to `public_html` over FTPS. Setup steps (secrets, environment) are at the top of
[`.github/workflows/deploy-cpanel.yml`](.github/workflows/deploy-cpanel.yml).

After a deploy, reset the cache in cPanel so visitors get the latest version (setting location TBD —
update this note once found).
