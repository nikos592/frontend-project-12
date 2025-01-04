import leoProfanity from 'leo-profanity';
import { useMemo } from 'react';
import { FilterContext } from '../contexts';

export const FilterProvider = ({ children }) => {
  const filter = useMemo(() => {
    leoProfanity.loadDictionary('ru');
    return leoProfanity;
  }, []);

  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
