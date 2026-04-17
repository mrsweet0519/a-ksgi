// Local Storage Utility for Browser-based DB
export const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(`ksgi_${key}`, JSON.stringify(data));
};

export const getFromStorage = (key: string) => {
  const data = localStorage.getItem(`ksgi_${key}`);
  return data ? JSON.parse(data) : null;
};
