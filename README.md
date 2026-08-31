# Big Brain Foundation Website

## Running locally

```
npm start
```

## Deploying

1. Push your changes to `main`.
2. Run:

   ```
   npm run deploy
   ```

## Publishing to cPanel

1. Take the contents of the generated `dist` folder and upload them into `public_html`.
2. Upload the `assets` files into the `assets` folder — easiest to just upload and replace all.
3. Reset the cache in cPanel so visitors get the latest version (setting location TBD — update this note once found).
