export async function createFetch(url, method = "GET", body = null) {
  const obj = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  let promiseFetch;
  if (method !== "POST" && method !== "PATCH" && method !== "PUT") {
    promiseFetch = await fetch(url, obj);
  } else {
    obj.body = JSON.stringify(body);
    promiseFetch = await fetch(url, obj);
  }

  if (!promiseFetch.ok) {
    throw new Error(`HTTP error! status: ${promiseFetch.status}`);
  }

  const data = await promiseFetch.json();
  return data;
}
