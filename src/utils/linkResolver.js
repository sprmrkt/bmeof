const linkResolver = (doc) => {
  // Pretty URLs for known types
  if (doc.type === "homepage") return `/`;
  if (doc.type === "work") return `/work/${doc.uid}/`;
  if (doc.type === "studio") return `/studio/`;
  if (doc.type === "hello") return `/hello/`;
  if (doc.type === "gravy") return `/gravy/`;

  // Backup for all other types
  return `/`;
}

module.exports = linkResolver