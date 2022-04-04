export const request = async (url, options) => {
  const baseUrl = `${process.env.BASE_URL}${url}`;
  const response = await fetch(baseUrl, options);

  return response.json();
};
