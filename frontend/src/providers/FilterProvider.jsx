import leoProfanity from 'leo-profanity';
import { useMemo } from 'react';
import { FilterContext } from '../contexts';

export const FilterProvider = ({ children }) => {
  const filter = useMemo(() => {
    const russianWords = leoProfanity.getDictionary('ru');
    const englishWords = leoProfanity.getDictionary('en');
    leoProfanity.addDictionary('multiLang', [...russianWords, ...englishWords]);
    leoProfanity.loadDictionary('multiLang');
    return leoProfanity;
  }, []);

  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
