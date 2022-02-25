const url = process.env.NEXT_PUBLIC_SERVER_API_URL;
console.log(url)
export const getRequest = async (api) => {
  console.log(url + api)
  let serverResponse = await fetch(url + api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let data = await serverResponse.json();

  return data;
};
