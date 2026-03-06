export function proxiedImageUrl(src: string) {
  return `/api/media/image?src=${encodeURIComponent(src)}`;
}

