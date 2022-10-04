export const FetchPost = async (
  PATH: string,
  OBJECT: object
): Promise<Response> =>
  fetch(PATH, {
    method: 'POST',
    body: JSON.stringify(OBJECT),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const Fetcher = (URl: string) => fetch(URl).then((res) => res.json());
