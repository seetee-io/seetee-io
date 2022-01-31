---
title: 'Example Post' # Post title; Required.
summary: 'This is an example post.' # Summary shown on the blog homepage; Optional.
subtitle: 'This is just an example.' # Subtitle shown on the article page. Optional.
date: '2021-03-08' # Publishing date; Required.
blocktime: '673676' # Publishing block time; Required.
authors: # List of author {name:, link:} dicts; Name is required, link is optional.
  - name: '@seetee_io'
    link: 'https://twitter.com/@seetee_io'
  - name: 'Satoshi'
thumbnail: thumbnail.png # Thumbnail for the blog homepage. Required. See below for where the image file is expected to be.
cover: cover.png # Cover image shown on the article page. Optional. See below for where the image file is expected to be.
coverImageCaption: 'Photo by <a href="https://bitcoin.org">Satoshi Nakamoto</a>' # Cover image caption (can be HTML). Optional.
unlisted: true # Hide the post on the /blog overview page. It'll still be accessible by direct link. Optional. Defaults to true.
---

This is an _example_ post that will **not** be published.

Here you can write [GitHub Flavored Markdown](https://github.github.com/gfm/).

The slug of the article will be the filename of the `.md` file.

## Footnotes

Footnotes can be used like this[^1].

## Images

For inline images use the `<Image>` component.

<Image postId="example" name="logo.png" caption="Seetee Logo" />

Image captions are optional.

All image files (inline images, thumbnail, cover) are expected to be in the following directory:

```
public/assets/blog/<postId>/
```

The `postId` is the filename of the respective post without the `.md` extension.

For example, the image above is expected to be under:

```
public/assets/blog/example/logo.png
```

[^1]: Make sure to use numbers as tags. Words will work as well but then the footnote will be the word which won't look too good.
