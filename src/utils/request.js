/**
 * Request helper function to be used on query hook
 * @param { string } url
 * @param { object } options // query options (e.g. method, Content-Type etc...)
 * @returns { object } resopnse
 */

export const request = async (url, options) => {
  const baseUrl = `${process.env.BASE_URL}${url}`;
  const response = await fetch(baseUrl, options);

  return response.json();
};
