import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ContentRow from "./components/ContentRow";
import VideoModal from "./components/VideoModal";
import { mockData, profiles } from "./data/mockData";
import { useToast } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";

const NetflixHome = () => {
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);
  const [myList, setMyList] = useState(mockData.myList);
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handlePlay = (content) => {
    let videoUrl = '';
    let title = '';

    if (typeof content === 'string') {
      // Direct YouTube URL
      videoUrl = content;
      title = "Video";
    } else if (content.trailerUrl) {
      videoUrl = content.trailerUrl;
      title = content.title;
    } else {
      // For demo purposes, use a generic trailer
      videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      title = content.title;
    }

    setVideoModal({ isOpen: true, url: videoUrl, title });
  };

  const handleAddToList = (content) => {
    const isAlreadyInList = myList.find(item => item.id === content.id);
    
    if (isAlreadyInList) {
      setMyList(myList.filter(item => item.id !== content.id));
      toast({
        title: "Removed from My List",
        description: `${content.title} has been removed from your list.`,
      });
    } else {
      setMyList([...myList, content]);
      toast({
        title: "Added to My List",
        description: `${content.title} has been added to your list.`,
      });
    }
  };

  const handleMoreInfo = (content) => {
    toast({
      title: "More Info",
      description: `More information about ${content.title} would be displayed here.`,
    });
  };

  const handleSearch = (query) => {
    setIsSearching(true);
    // Simulate search across all content
    const allContent = [
      ...mockData.trendingNow,
      ...mockData.popularMovies,
      ...mockData.popularSeries,
      ...mockData.actionMovies,
      ...myList
    ];

    const results = allContent.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    
    if (results.length === 0) {
      toast({
        title: "No Results",
        description: `No content found for "${query}".`,
      });
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="bg-black min-h-screen">
      <Header
        onSearch={handleSearch}
        onProfileSelect={setCurrentProfile}
        currentProfile={currentProfile}
      />

      {isSearching ? (
        // Search Results View
        <div className="pt-20 px-4 md:px-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-2xl font-bold">Search Results</h1>
            <button
              onClick={clearSearch}
              className="text-white hover:text-gray-300 underline"
            >
              Back to Home
            </button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.map((item) => (
                <div key={item.id} className="cursor-pointer group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto rounded-md group-hover:scale-105 transition-transform"
                    onClick={() => handlePlay(item)}
                  />
                  <h3 className="text-white text-sm mt-2 group-hover:text-gray-300">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white text-center py-20">
              <p className="text-xl">No results found.</p>
            </div>
          )}
        </div>
      ) : (
        // Normal Home View
        <>
          <Hero
            content={mockData.heroContent}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            onMoreInfo={handleMoreInfo}
          />

          <div className="relative -mt-32 z-20">
            <ContentRow
              title="Trending Now"
              items={mockData.trendingNow}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
              onMoreInfo={handleMoreInfo}
            />

            <ContentRow
              title="Popular Movies"
              items={mockData.popularMovies}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
              onMoreInfo={handleMoreInfo}
            />

            <ContentRow
              title="Popular TV Shows"
              items={mockData.popularSeries}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
              onMoreInfo={handleMoreInfo}
            />

            {myList.length > 0 && (
              <ContentRow
                title="My List"
                items={myList}
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onMoreInfo={handleMoreInfo}
              />
            )}

            <ContentRow
              title="Action Movies"
              items={mockData.actionMovies}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
              onMoreInfo={handleMoreInfo}
            />
          </div>
        </>
      )}

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, url: '', title: '' })}
        videoUrl={videoModal.url}
        title={videoModal.title}
      />

      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NetflixHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
