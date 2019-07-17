export const formatDate = datetime => {
  const date = new Date(datetime);
  return `Posted on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
};
