export async function fetchResults(searchQuery: string): Promise<DOIData[]> {
  const endpoint = `https://api.datacite.org/dois?query=${searchQuery}`;
  // const endpoint = `http://localhost:8080/search-results`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as APIResponse;

  return data.data;
}

export async function fetchPersonData({ orcidLink }: { orcidLink: string }) {
  const response = await fetch(`https://api.datacite.org/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          person(id: "${orcidLink}") {
            id
        datasets {
            nodes {
                id
                titles {
                    title
                }
                descriptions {
                    description
                }
            }
        }
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as APIResponse;

  return data;
}
