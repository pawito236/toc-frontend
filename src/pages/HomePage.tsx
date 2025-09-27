import React, { useState, useEffect } from "react";
import { AnimeCard } from "../components/AnimeCard";
import { LoadingCard, LoadingSpinner } from "../components/LoadingSpinner";
import { animeService } from "../services/animeService";
import { Anime, AnimeListResponse } from "../types/anime";
import { TrendingUp, Filter, ChevronLeft, ChevronRight } from "lucide-react";

interface HomePageProps {
	onAnimeClick: (animeId: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAnimeClick }) => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchAnimeList = async (page: number) => {
		setIsLoading(true);
		setError(null);

		try {
			const response: AnimeListResponse = await animeService.getAnimeList(
				page
			);
			setAnimeList(response.data);
			setCurrentPage(response.page);
		} catch (error) {
			setError("Failed to load anime list. Please try again.");
			console.error("Error fetching anime list:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAnimeList(currentPage);
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		if (page < 1) return;
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleAnimeCardClick = (animeId: string) => {
		onAnimeClick(parseInt(animeId));
	};

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-600 text-xl mb-4">{error}</div>
					<button
						onClick={() => fetchAnimeList(currentPage)}
						className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Discover Amazing Anime
						</h1>
						<p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
							Explore thousands of anime titles, read detailed
							information, and find your next favorite series.
						</p>
						<div className="flex items-center justify-center gap-2 text-blue-200">
							<TrendingUp className="w-5 h-5" />
							<span>
								Currently showing {animeList.length} anime on
								page {currentPage}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Page Controls */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-3">
						<h2 className="text-2xl font-bold text-gray-900">
							Top Anime
						</h2>
						<div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
							Page {currentPage}
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<button
								onClick={() =>
									handlePageChange(currentPage - 1)
								}
								disabled={currentPage <= 1}
								className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
									currentPage > 1
										? "border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600"
										: "border-gray-200 text-gray-400 cursor-not-allowed"
								}`}
							>
								<ChevronLeft className="w-4 h-4" />
								Previous
							</button>

							<input
								type="number"
								value={currentPage}
								onChange={(e) => {
									const page = parseInt(e.target.value);
									if (page > 0) handlePageChange(page);
								}}
								className="w-16 px-2 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								min="1"
							/>

							<button
								onClick={() =>
									handlePageChange(currentPage + 1)
								}
								className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
							>
								Next
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>

				{/* Anime Grid */}
				{isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
						{Array.from({ length: 24 }).map((_, index) => (
							<LoadingCard key={index} />
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
						{animeList.map((anime) => (
							<AnimeCard
								key={anime.ID}
								anime={anime}
								onClick={() => handleAnimeCardClick(anime.ID)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
