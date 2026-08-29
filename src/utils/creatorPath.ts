export function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function creatorPath(id: number | string, name: string) {
  const slug = slugify(name);
  return slug ? `/creator/${id}-${slug}` : `/creator/${id}`;
}

export function editPath(id: number | string, name: string) {
  const slug = slugify(name);
  return slug ? `/edit/${id}-${slug}` : `/edit/${id}`;
}

export function parseIdFromParam(idSlug: string | undefined) {
  if (!idSlug) {
    return undefined;
  }

  return idSlug.split("-")[0];
}
