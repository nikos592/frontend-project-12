import * as filter from 'leo-profanity';

export const censorText = (text) => filter.clean(text);

export const addRussianDictionary = (dictionary) => {
  const ruDictionary = filter.getDictionary(dictionary);

  return filter.add(ruDictionary);
};
