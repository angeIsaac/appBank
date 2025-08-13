import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ChevronDown } from 'lucide-react';

const ContentCard = ({ item, onPlay, onAddToList, onMoreInfo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setIsHovered(true), 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsHovered(false);
  };

  return (
    <div
      className="relative min-w-64 h-36 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover rounded-md"
      />

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/80 rounded-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
          {/* Title and Info */}
          <div>
            <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <span className="text-green-500 font-bold">{Math.round(item.rating * 10)}% Match</span>
              <span>{item.year}</span>
              <span className="border border-gray-400 px-1 text-xs">
                {item.type === 'movie' ? 'HD' : 'HD'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay(item);
              }}
              className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToList(item);
              }}
              className="bg-gray-600 text-white rounded-full p-2 hover:bg-gray-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo(item);
              }}
              className="bg-gray-600 text-white rounded-full p-2 hover:bg-gray-500 transition-colors ml-auto"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ContentRow = ({ title, items, onPlay, onAddToList, onMoreInfo }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 800;
      const newScrollLeft = direction === 'left' 
        ? current.scrollLeft - scrollAmount
        : current.scrollLeft + scrollAmount;
      
      current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      
      setTimeout(() => {
        setCanScrollLeft(current.scrollLeft > 0);
        setCanScrollRight(current.scrollLeft < current.scrollWidth - current.clientWidth);
      }, 300);
    }
  };

  const handleScroll = () => {
    const { current } = scrollRef;
    if (current) {
      setCanScrollLeft(current.scrollLeft > 0);
      setCanScrollRight(current.scrollLeft < current.scrollWidth - current.clientWidth);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-white text-xl font-bold mb-4 px-4 md:px-12">{title}</h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Content Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide px-4 md:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onPlay={onPlay}
              onAddToList={onAddToList}
              onMoreInfo={onMoreInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;