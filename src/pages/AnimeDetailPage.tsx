import React, { useState, useEffect } from 'react';
import { 
  Star, Calendar, Play, Users, Heart, Trophy, 
  Clock, Globe, Building2, Tv, ExternalLink 
} from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { animeService } from '../services/animeService';
import { AnimeDetail } from '../types/anime';

interface AnimeDetailPageProps {
  animeId: number;
  onAnimeClick: (animeId: number) => void;
}

export const AnimeDetailPage: React.FC<AnimeDetailPageProps> = ({ 
  animeId, 
  onAnimeClick 
}) => {
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const animeDetail = await animeService.getAnimeById(animeId);
        setAnime(animeDetail);
      } catch (error) {
        setError('Failed to load anime details. Please try again.');
        console.error('Error fetching anime details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [animeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const InfoItem: React.FC<{ label: string; value: string | string[] | undefined; icon?: React.ReactNode }> = ({ 
    label, 
    value, 
    icon 
  }) => {
    if (!value) return null;
    
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    
    return (
      <div className="flex items-start gap-3 py-2">
        {icon && <div className="text-gray-500 mt-0.5">{icon}</div>}
        <div>
          <dt className="text-sm font-medium text-gray-500">{label}</dt>
          <dd className="text-sm text-gray-900 mt-1">{displayValue}</dd>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Anime Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <img
                  src={anime.leftside.image}
                  alt={anime.name}
                  className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>

            {/* Anime Info */}
            <div className="lg:col-span-2 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {anime.name}
              </h1>

              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                {anime.stat.Score && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{anime.stat.Score}</span>
                    {anime.stat.UserVotes && (
                      <span className="text-sm text-blue-200">
                        ({anime.stat.UserVotes} votes)
                      </span>
                    )}
                  </div>
                )}
                
                {anime.stat.Ranked && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">{anime.stat.Ranked}</span>
                  </div>
                )}
                
                {anime.stat.Popularity && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Trophy className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">{anime.stat.Popularity} Popular</span>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                  <div className="text-sm text-blue-200">Members</div>
                  <div className="font-bold text-lg">{anime.stat.Members || 'N/A'}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-red-300" />
                  <div className="text-sm text-blue-200">Favorites</div>
                  <div className="font-bold text-lg">{anime.stat.Favorites || 'N/A'}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Play className="w-6 h-6 mx-auto mb-2 text-green-300" />
                  <div className="text-sm text-blue-200">Episodes</div>
                  <div className="font-bold text-lg">{anime.leftside.info.Episode || 'Unknown'}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Tv className="w-6 h-6 mx-auto mb-2 text-purple-300" />
                  <div className="text-sm text-blue-200">Type</div>
                  <div className="font-bold text-lg">{anime.leftside.info.Type || 'Unknown'}</div>
                </div>
              </div>

              {/* Genres */}
              {anime.leftside.info.Genres && anime.leftside.info.Genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {anime.leftside.info.Genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            {anime.synopsis && (
              <section className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: anime.synopsis }}
                />
              </section>
            )}

            {/* Voice Actors */}
            {anime.voice_actors && anime.voice_actors.length > 0 && (
              <section className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Characters & Voice Actors</h2>
                <div className="grid gap-6">
                  {anime.voice_actors.map((va, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={va.character.image}
                        alt={va.character.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{va.character.name}</h4>
                        <p className="text-sm text-gray-600">{va.character.role}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{va.voice_actor.name}</p>
                          <p className="text-sm text-gray-600">Japanese</p>
                        </div>
                        <img
                          src={va.voice_actor.image}
                          alt={va.voice_actor.name}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Anime */}
            {anime.related && anime.related.length > 0 && (
              <section className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related</h2>
                <div className="grid gap-4">
                  {anime.related.map((related, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{related.title}</h4>
                        <p className="text-sm text-gray-600">{related.relation}</p>
                        <p className="text-xs text-gray-500 capitalize">{related.Type}</p>
                      </div>
                      {related.Type === 'anime' && (
                        <button
                          onClick={() => onAnimeClick(parseInt(related.ID))}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm text-blue-700"
                        >
                          View Details
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Information */}
              <section className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Information</h3>
                <dl className="space-y-1">
                  <InfoItem label="Type" value={anime.leftside.info.Type} icon={<Tv className="w-4 h-4" />} />
                  <InfoItem label="Episodes" value={anime.leftside.info.Episode} icon={<Play className="w-4 h-4" />} />
                  <InfoItem label="Status" value={anime.leftside.info.Status} />
                  <InfoItem label="Aired" value={anime.leftside.info.Aired} icon={<Calendar className="w-4 h-4" />} />
                  <InfoItem label="Premiered" value={anime.leftside.info.Premiered} />
                  <InfoItem label="Broadcast" value={anime.leftside.info.Broadcast} />
                  <InfoItem label="Source" value={anime.leftside.info.Source || undefined} />
                  <InfoItem label="Duration" value={anime.leftside.info.Duration} icon={<Clock className="w-4 h-4" />} />
                  <InfoItem label="Rating" value={anime.leftside.info.Rating} />
                </dl>
              </section>

              {/* Statistics */}
              <section className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Statistics</h3>
                <dl className="space-y-1">
                  <InfoItem 
                    label="Score" 
                    value={anime.stat.Score ? `${anime.stat.Score} (${anime.stat.UserVotes} votes)` : undefined}
                    icon={<Star className="w-4 h-4" />} 
                  />
                  <InfoItem label="Ranked" value={anime.stat.Ranked} icon={<Trophy className="w-4 h-4" />} />
                  <InfoItem label="Popularity" value={anime.stat.Popularity} />
                  <InfoItem label="Members" value={anime.stat.Members} icon={<Users className="w-4 h-4" />} />
                  <InfoItem label="Favorites" value={anime.stat.Favorites} icon={<Heart className="w-4 h-4" />} />
                </dl>
              </section>

              {/* Production */}
              <section className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Production</h3>
                <dl className="space-y-3">
                  <InfoItem 
                    label="Studios" 
                    value={anime.leftside.info.Studios} 
                    icon={<Building2 className="w-4 h-4" />} 
                  />
                  <InfoItem 
                    label="Producers" 
                    value={anime.leftside.info.Producers} 
                  />
                  <InfoItem 
                    label="Licensors" 
                    value={anime.leftside.info.Licensors} 
                    icon={<Globe className="w-4 h-4" />} 
                  />
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};