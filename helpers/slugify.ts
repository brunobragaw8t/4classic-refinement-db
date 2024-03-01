export function slugify (text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters except dashes and spaces
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with a single dash
    .trim() // Trim leading and trailing spaces
}
