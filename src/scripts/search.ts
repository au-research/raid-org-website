import { fetchResults } from "@/services/search-service";

const STYLES = {
  resultContainer: "border-b border-gray-200 py-4",
  title: "text-lg font-semibold",
  doiLink:
    "rounded bg-[#368bcc] px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-[#4a96d1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#368bcc]",
  description: "mt-2 text-gray-700",
  publicationInfo: "text-sm text-gray-500 mt-2",
  creatorInfo: "text-sm text-gray-500 mt-2",
  loadingContainer: "flex justify-center items-center py-4",
  loadingSpinner:
    "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600",
  errorMessage: "text-red-600 py-4",
  noResults: "text-gray-600",
} as const;

export function initializeSearch() {
  console.log("initializeSearch triggered...!");
  const searchForm = document.getElementById("searchForm") as HTMLFormElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const searchTitle = document.getElementById(
    "searchTitle"
  ) as HTMLInputElement;
  const searchDescription = document.getElementById(
    "searchDescription"
  ) as HTMLInputElement;
  const resultsContainer = document.getElementById("results") as HTMLDivElement;

  if (
    !searchForm ||
    !searchInput ||
    !resultsContainer ||
    !searchTitle ||
    !searchDescription
  ) {
    throw new Error("Required DOM elements not found");
  }

  let state: SearchState = {
    isLoading: false,
    error: null,
    results: null,
  };

  function updateState(newState: Partial<SearchState>): void {
    state = { ...state, ...newState };
  }

  function buildSearchQuery(query: string): string {
    const searchFields = [];

    if (searchTitle.checked) {
      //   searchFields.push(`(titles.title:*${query}*)`);
      searchFields.push(`(titles.title:"${query}")`);
    }

    if (searchDescription.checked) {
      searchFields.push(`(descriptions.description:"${query}")`);
    }

    if (searchFields.length === 0) {
      //   searchFields.push(`(titles.title:*${query}*)`);
      searchFields.push(`(titles.title:${query})`);
    }

    const searchFieldsQuery = searchFields.join(" OR ");
    return `((identifiers.identifier:*raid.org.au*) AND (${searchFieldsQuery}))`;
  }

  function escapeHtml(unsafe: string): string {
    return (
      unsafe
        ?.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;") || ""
    );
  }

  function highlightSearchTerm(text: string, searchTerm: string): string {
    if (!searchTerm) return escapeHtml(text);

    // Escape both the text and search term for safety
    const escapedText = escapeHtml(text);
    const escapedSearchTerm = escapeHtml(searchTerm);

    // Create a regular expression that matches the search term case-insensitively
    const regex = new RegExp(`(${escapedSearchTerm})`, "gi");

    // Replace matches with highlighted version
    return escapedText.replace(
      regex,
      '<mark class="bg-yellow-200 rounded px-1">$1</mark>'
    );
  }

  function withContainer(content: string, className: string): string {
    return `
        <div class="${className}">
          ${content}
        </div>
      `;
  }

  function createTitleSection(
    titles: { title: string }[],
    searchTerm: string
  ): string {
    const titleText = titles.map((el) => el.title).join("; ");
    return `
        <h3 class="${STYLES.title}">
          ${highlightSearchTerm(titleText, searchTerm)}
        </h3>
      `;
  }

  function createDoiLink(doi: string): string {
    return `
        <a 
          target="__blank" 
          href="https://raid.org/${escapeHtml(doi)}" 
          class="${STYLES.doiLink}"
        >
          DOI: ${escapeHtml(doi)}
        </a>
      `;
  }

  function createDescriptionSection(
    searchTerm: string,
    descriptions?: { description: string }[]
  ): string {
    if (!descriptions?.length) {
      return "";
    }

    const descriptionText = descriptions.map((el) => el.description).join("; ");
    return `
      <p class="${STYLES.description}">
        Description: ${highlightSearchTerm(descriptionText, searchTerm)}
      </p>
    `;
  }

  function createPublicationInfo(publisher: string, year: number): string {
    return `
        <p class="${STYLES.publicationInfo}">
          Published by ${escapeHtml(publisher)} (${year})
        </p>
      `;
  }

  function createCreatorInfo({ creators }: { creators: DOICreator[] }): string {
    const creatorText = creators.map((el) => el.name).join("; ");
    return `
        <a class="${STYLES.creatorInfo}">
          ${creatorText ? `Created by ${escapeHtml(creatorText)}` : "Unknown creator"}
        </a>
      `;
  }

  function createResultHTML(item: DOIData, searchTerm: string): string {
    const { attributes } = item;

    const sections = [
      createTitleSection(attributes.titles, searchTerm),
      createDescriptionSection(searchTerm, attributes.descriptions),
      createPublicationInfo(attributes.publisher, attributes.publicationYear),
      createCreatorInfo({
        creators: attributes.creators,
      }),
      `<br/>${createDoiLink(attributes.doi)}`,
    ].join("\n");

    return withContainer(sections, STYLES.resultContainer);
  }

  function renderLoading(): void {
    resultsContainer.innerHTML = withContainer(
      `<div class="${STYLES.loadingSpinner}"></div>`,
      STYLES.loadingContainer
    );
  }

  function renderResults(): void {
    if (!state.results?.length) {
      resultsContainer.innerHTML = `
          <p class="${STYLES.noResults}">No results found</p>
        `;
      return;
    }

    const searchTerm = searchInput.value.trim();
    const resultsHtml = state.results
      .map((result) => createResultHTML(result, searchTerm))
      .join("");

    resultsContainer.innerHTML = resultsHtml;
  }

  function renderError(): void {
    resultsContainer.innerHTML = withContainer(
      escapeHtml(state.error || "An error occurred while searching"),
      STYLES.errorMessage
    );
  }

  async function handleSearch(event: Event): Promise<void> {
    event.preventDefault();

    const searchQuery = searchInput.value.trim();
    if (!searchQuery) return;

    updateState({ isLoading: true, error: null, results: null });
    renderLoading();

    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const searchQuery02 = buildSearchQuery(encodedQuery);
      const results = await fetchResults(searchQuery02);

      updateState({ isLoading: false, results, error: null });
      renderResults();
    } catch (error) {
      updateState({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        results: null,
      });
      renderError();
    }
  }

  function handleKeyboardShortcut(e: KeyboardEvent): void {
    const baseUrl = import.meta.env.BASE_URL ? import.meta.env.BASE_URL : "";
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      window.location.href = `${baseUrl}/search`;
    }
  }

  // Event listeners
  searchForm.addEventListener("submit", handleSearch);
  document.addEventListener("keydown", handleKeyboardShortcut);
}
