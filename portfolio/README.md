# portfolio

> design inspired by [cosmin](https://cosminstudios.com) — all credits to him for the original look.

---

## about

personal portfolio built with react, typescript, and vite. dark theme, glass-morphism ui, lanyard integration for live discord status, and a built-in music player with synced lyrics.

pages:
- **home** — bio, discord presence, quick links
- **setup** — hardware, apps, dev skills (gaming/working tabs)
- **projects** — showreel of commissions and collabs
- **contact** — discord (live status via lanyard), github, telegram
- **music** — audio player with lrc lyrics from lrclib

---

## stack

```txt
vite       — bundler / dev server
react 19   — ui
typescript — types
react-router-dom — navigation
lanyard api — live discord presence
lrclib api — synced lyrics lookup
```

---

## getting started

```sh
npm install
npm run dev
```

build for production:

```sh
npm run build
npm run preview
```

---

## notes

- discord user id in the source is public-facing (lanyard is a public api)
- all music files are my own property and are not licensed for reuse
- the `.gitignore` excludes `node_modules`, `dist`, `.ds_store`, and `*.local` files
