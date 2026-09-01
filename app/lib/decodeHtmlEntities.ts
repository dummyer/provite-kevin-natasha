export function decodeHtmlEntities(str: string): string {
    if (!str) return str;

    return str
        // numeric decimal: &#128591;
        .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
        // numeric hex: &#x1F64F;
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
            String.fromCodePoint(parseInt(hex, 16))
        )
        // jaga-jaga kalau ada named entity umum
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ");
}