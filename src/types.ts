interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: DOIData[] | null;
}

interface DOIData {
  attributes: {
    doi: string;
    titles: { title: string }[];
    descriptions?: { description: string }[];
    publisher: string;
    publicationYear: number;
  };
}

interface APIResponse {
  data: DOIData[];
}
