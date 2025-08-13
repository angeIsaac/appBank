import React, { useState } from 'react';
import { Play, Plus, Info } from 'lucide-react';

const Hero = ({ content, onPlay, onAddToList, onMoreInfo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePlay = () => {
    if (content.trailerUrl) {
      onPlay(content.trailerUrl);
    }
  };

  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.backdrop}
          alt={content.title}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-12 max-w-2xl">
        {content.logo ? (
          <img
            src={content.logo}
            alt={content.title}
            className="h-24 md:h-32 mb-4 object-contain"
          />
        ) : (
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>
        )}

        {/* Meta Information */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-white">
          <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold">
            {content.rating}
          </span>
          <span>{content.year}</span>
          <span>{content.seasons}</span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {content.genres.map((genre, index) => (
            <span key={index} className="text-white text-sm">
              {genre}{index < content.genres.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-white text-lg mb-8 leading-relaxed max-w-xl">
          {content.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePlay}
            className="flex items-center justify-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-gray-200 transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Play</span>
          </button>

          <button
            onClick={() => onAddToList(content)}
            className="flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded-md font-bold hover:bg-gray-600/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>My List</span>
          </button>

          <button
            onClick={() => onMoreInfo(content)}
            className="flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded-md font-bold hover:bg-gray-600/90 transition-colors sm:hidden"
          >
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>
        </div>
      </div>

      {/* Fade to content */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};

export default Hero;