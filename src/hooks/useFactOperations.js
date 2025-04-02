import { useState, useCallback } from 'react';
import { fetchFacts, createFact, deleteFact, updateVoteCount } from '../services/factService';

export const useFactOperations = () => {
  // Centralized state management for the entire app
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('All');

  // Initial load and category filtering
  const getFacts = useCallback(async (category = 'All') => {
    setIsLoading(true);
    setError(null);
    setCurrentCategory(category);

    try {
      const data = await fetchFacts(category);
      setFacts(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optimistic update - add new fact to state before server response
  const handleCreateFact = useCallback(async (fact) => {
    try {
      const newFact = await createFact(fact);
      setFacts(prev => [newFact, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Create error:', err);
      return false;
    }
  }, []);

  // Local state update without refetching the entire list
  const handleDeleteFact = useCallback(async (id) => {
    try {
      await deleteFact(id);
      setFacts(prev => prev.filter(fact => fact.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Delete error:', err);
    }
  }, []);

  // Precise update of a single fact's vote count
  const handleVote = useCallback(async (factId, column) => {
    try {
      const updatedFact = await updateVoteCount(factId, column);
      // Only update the changed fact in state, preserving others
      setFacts(prev =>
        prev.map(fact =>
          fact.id === factId ? updatedFact[0] : fact
        )
      );
    } catch (err) {
      setError(err.message);
      console.error('Vote error:', err);
    }
  }, []);

  return {
    facts,
    isLoading,
    error,
    currentCategory,
    getFacts,
    handleCreateFact,
    handleDeleteFact,
    handleVote
  };
}; 