// __tests__/SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchBar from '../components/SearchBar';
import data from '../../public/data.json';
import React from 'react';

describe('SearchBar component', () => {
  const mockOnBookSelect = jest.fn();

  beforeEach(() => {
    render(<SearchBar onBookSelect={mockOnBookSelect} />);
  });

  it('renders the search input field', () => {
    const inputElement = screen.getByPlaceholderText('Search for books...');
    expect(inputElement).toBeInTheDocument(); 
  });

  it('updates search term on input change', () => {
    const inputElement = screen.getByPlaceholderText('Search for books...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
  });

  it('displays search suggestions when search term is entered', () => {
    const inputElement = screen.getByPlaceholderText('Search for books...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'the' } }); 

    const suggestionList = screen.getByRole('list');
    expect(suggestionList).toBeVisible();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0); 
  });

  it('hides search suggestions when input is cleared', () => {
    const inputElement = screen.getByPlaceholderText('Search for books...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'the' } }); 
    fireEvent.change(inputElement, { target: { value: '' } }); 

    const suggestionList = screen.queryByRole('list'); 
    expect(suggestionList).not.toBeInTheDocument(); 
  });

  it('calls onBookSelect with correct ID when a suggestion is clicked', () => {
    const inputElement = screen.getByPlaceholderText('Search for books...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'the' } });

    const suggestionItems = screen.getAllByRole('listitem');
    fireEvent.click(suggestionItems[0]); 

    expect(mockOnBookSelect).toHaveBeenCalledWith(data.titles.indexOf(suggestionItems[0]?.textContent?.trim() || ''));
  });

  it('clears the search term after selecting a suggestion', () => {
    const inputElement = screen.getByPlaceholderText('Search for books...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'the' } });
    const suggestionItems = screen.getAllByRole('listitem');
    fireEvent.click(suggestionItems[0]); 

    expect(inputElement.value).toBe('');
  });

});