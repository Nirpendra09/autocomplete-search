"use client"

import React, { useState } from 'react';
import { searchSummaries } from '../utils/search';
import data from '../../public/data.json'; 
import BookCard from './BookCard';

interface SearchBarProps {
  onBookSelect: (selectedBookId: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onBookSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
  };

  const handleSuggestionClick = (id: number) => {
    onBookSelect(id);
    setSearchTerm(''); 
  };

  const matchingBookIds = searchSummaries(searchTerm);

  const highlightMatches = (text: string, query: string) => {
    if (!query) {
      return text;
    }

    const regex = new RegExp(query, 'gi');
    return text.replace(regex, (match) => `<mark class="bg-yellow-200 text-gray-800">${match}</mark>`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />

      {searchTerm && (
        <ul className="absolute top-full left-0 bg-white border rounded-md shadow-md mt-2 w-full z-50">
          {matchingBookIds.slice(0, 5).map((id) => (
            <li
              key={id}
              onClick={() => handleSuggestionClick(id)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100">
              {data.titles[id]}
              </li>
          ))}
        </ul>
      )}

      
    </div>
  );
};

export default SearchBar;