# kk

kk is a minimal language that transpiles to [BBTag].

```
embed = buildembed({
  title: "Hello, world!"
  description: "This is a sample embed created with `kk`."
  thumbnail.url: useravatar()
})

embed(embed)
```

## Installing

```bash
$ npm i -g slice/kk
$ kk file.kk
```

[BBTag]: https://blargbot.xyz/tags#set
