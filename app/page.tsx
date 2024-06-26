"use client"
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';

export default function HomePage() {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const onBookSelect = (selectedBookId: number) => {
    if(selectedBooks.length >= 4) {
      // remove the first book and add the new one
      setSelectedBooks([...selectedBooks.slice(1), selectedBookId]);
    } else {
      setSelectedBooks([...selectedBooks, selectedBookId]);
    }
  };
  return (
    <main className="container w-full p-4 bg-gray-100 min-h-screen">
      <div className=" p-6 bg-white rounded-lg shadow-md"> 
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Book Search</h1>
        <SearchBar 
        onBookSelect = {onBookSelect}
        />
        <div
          id="book-container"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
        >
          {/* Book cards will be added here */}
          {
            selectedBooks.map((bookId) => (
              <BookCard key={bookId} bookId={bookId} />
            ))
          }
        </div>
      </div>
    </main>
  );
}