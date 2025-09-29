import {
	Anime,
	AnimeDetail,
	AnimeListResponse,
	SearchResponse,
} from "../types/anime";

class AnimeService {
	private baseURL = "http://127.0.0.1:8000/v1";

	async getAnimeList(page: number = 1): Promise<AnimeListResponse> {
		try {
			const response = await fetch(`${this.baseURL}/animes?page=${page}`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: AnimeListResponse = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching anime list:", error);
			throw new Error("Failed to fetch anime list");
		}
	}

	async getAnimeById(id: number): Promise<AnimeDetail> {
		try {
			const response = await fetch(`${this.baseURL}/anime/${id}`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: AnimeDetail = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching anime details:", error);
			throw new Error("Failed to fetch anime details");
		}
	}

	async searchAnime(keyword: string): Promise<SearchResponse> {
		try {
			const response = await fetch(
				`${this.baseURL}/search?keyword=${encodeURIComponent(keyword)}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: SearchResponse = await response.json();
			return data;
		} catch (error) {
			console.error("Error searching anime:", error);
			throw new Error("Failed to search anime");
		}
	}

	getBaseUrl(): string {
		return this.baseURL;
	}
}

export const animeService = new AnimeService();
