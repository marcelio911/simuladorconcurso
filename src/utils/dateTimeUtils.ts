
const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
};

export { formatDateTime };