import supabase from './supabase';

// Fetch and optionally filter facts by category
export const fetchFacts = async (category = 'All') => {
  const { data, error } = await supabase
    .from('facts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);

  return category === 'All'
    ? data
    : data.filter(fact => fact.category === category);
};

// Insert new fact and return the created record
export const createFact = async (fact) => {
  const { data, error } = await supabase
    .from('facts')
    .insert([fact])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

// Remove fact by id
export const deleteFact = async (id) => {
  const { error } = await supabase
    .from('facts')
    .delete()
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);
};

// Two-step vote update: get current value then increment
export const updateVoteCount = async (factId, columnName) => {
  // First get current value
  const { data: fact, error: fetchError } = await supabase
    .from('facts')
    .select(columnName)
    .eq('id', factId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // Then increment it
  const { data, error } = await supabase
    .from('facts')
    .update({ [columnName]: fact[columnName] + 1 })
    .eq('id', factId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}; 