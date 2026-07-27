const NAMED_ENTITIES = {
  nbsp: " ",
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  bull: " ",
  middot: " ",
  ndash: "–",
  mdash: "—",
};

function decodeHtmlEntities(value) {
  return value
    .replace(/&#(\d+);/g, (match, decimalCode) => {
      const codePoint = Number(decimalCode);

      if (!Number.isFinite(codePoint)) {
        return match;
      }

      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return match;
      }
    })
    .replace(/&#x([0-9a-f]+);/gi, (match, hexadecimalCode) => {
      const codePoint = Number.parseInt(hexadecimalCode, 16);

      if (!Number.isFinite(codePoint)) {
        return match;
      }

      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return match;
      }
    })
    .replace(
      /&([a-z]+);/gi,
      (match, entityName) => NAMED_ENTITIES[entityName.toLowerCase()] ?? match,
    );
}

export function richTextToPlainText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const normalizedValue = String(value).trim();

  if (!normalizedValue) {
    return "";
  }

  const withoutUnsafeContent = normalizedValue
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");

  const withoutBlockTags = withoutUnsafeContent
    .replace(/<(br|hr)\s*\/?>/gi, " ")
    .replace(
      /<\/(p|div|li|ul|ol|h[1-6]|blockquote|section|article|figure)>/gi,
      " ",
    );

  const withoutTags = withoutBlockTags.replace(/<[^>]*>/g, " ");

  return decodeHtmlEntities(withoutTags)
    .replace(/[\u2022\u2023\u2043\u2219\u25aa\u25ab\u25cf\u25cb\u25e6]/g, " ")
    .replace(/[\u200b-\u200d\u2060\ufeff]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
