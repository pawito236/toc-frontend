import React from 'react';
import { Star, Calendar, Play } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
  onClick: () => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img 
          src={anime.img} 
          alt={anime.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{anime.score}</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Play className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {anime.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ID: {anime.ID}
            </span>
          </div>
          
          <div className="text-xs text-gray-500">
            ★ {anime.score}
          </div>
        </div>
      </div>
    </div>
  );
};