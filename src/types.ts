interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: DOIData[] | null;
}

interface DOICreator {
  affiliation: string[];
  name: string;
  nameIdentifiers: {
    nameIdentifier: string;
    nameIdentifierScheme: string;
    schemeURI: string;
  };
  nameType: string;
}

interface DOIData {
  attributes: {
    doi: string;
    titles: { title: string }[];
    descriptions?: { description: string }[];
    publisher: string;
    publicationYear: number;
    creators: DOICreator[];
  };
}

interface APIResponse {
  data: DOIData[];
}

/// /// ///

type RorAdminInfo = {
  created: {
    date: string;
    schema_version: string;
  };
  last_modified: {
    date: string;
    schema_version: string;
  };
};

type RorExternalId = {
  all: string[];
  preferred: string | null;
  type: string;
};

type RorLink = {
  type: string;
  value: string;
};

type RorGeonamesDetails = {
  country_code: string;
  country_name: string;
  lat: number;
  lng: number;
  name: string;
};

type RorLocation = {
  geonames_details: RorGeonamesDetails;
  geonames_id: number;
};

type RorName = {
  lang: string | null;
  types: string[];
  value: string;
};

type RorOrganization = {
  admin: RorAdminInfo;
  domains: string[];
  established: number;
  external_ids: RorExternalId[];
  id: string;
  links: RorLink[];
  locations: Location[];
  names: RorName[];
  relationships: any[];
  status: string;
  types: string[];
};
