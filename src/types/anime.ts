export interface Anime {
  ID: string;
  name: string;
  img: string;
  score: number;
}

export interface AnimeListResponse {
  page: number;
  data: Anime[];
}

export interface AnimeDetail {
  id: number;
  name: string;
  leftside: {
    image: string;
    info: {
      Type?: string;
      Episode?: string;
      Status?: string;
      Aired?: string;
      Premiered?: string;
      Broadcast?: string;
      Producers?: string[];
      Licensors?: string[];
      Studios?: string;
      Source?: string | null;
      Genres?: string[];
      Duration?: string;
      Rating?: string;
    };
  };
  stat: {
    Score?: string;
    UserVotes?: string;
    Ranked?: string;
    Popularity?: string;
    Members?: string;
    Favorites?: string;
  };
  synopsis: string;
  related: Array<{
    image: string;
    relation: string;
    title: string;
    ID: string;
    Type: string;
  }>;
  voice_actors: Array<{
    character: {
      name: string;
      role: string;
      image: string;
    };
    voice_actor: {
      name: string;
      image: string;
    };
  }>;
}

export interface SearchResult {
  id: number;
  type: string;
  name: string;
  image_url: string;
  payload: {
    media_type: string;
    start_year: number;
    aired: string;
    score: string;
    status: string;
  };
  es_score: number;
}

export interface SearchResponse {
  categories: Array<{
    type: string;
    items: SearchResult[];
  }>;
}