"use client";
import React from 'react';
import data from '../../public/data.json';

interface BookCardProps {
  bookId: number;
}

const BookCard: React.FC<BookCardProps> = ({ bookId }) => {
  const book = data.summaries.find((book) => book.id === bookId);
  const author = data.authors.find((author) => author.book_id === bookId);

  if (!book || !author) return null;

  return (
    <div 
      className="bg-white p-4 rounded-md shadow-md transform transition duration-300 ease-in-out hover:scale-105"
    > 
      <h3 className="text-xl font-semibold mb-2">{data.titles[bookId]}</h3>
      <p className="text-gray-700 mb-3">{book.summary}</p>
      <p className="text-gray-600">By: {author.author}</p>
    </div>
  );
};

export default BookCard;