
export const findCollection = (collections=[], collectionId) =>
collections.find(collection => collection.id === Number(collectionId))

export const findFilm = (films=[], filmId) =>
films.find(note => note.id === Number(filmId))

export const getFilmsForCollection = (films=[], collectionId) => (
(!collectionId)
  ? films
  : films.filter(note => note.collection === collectionId)
)

export const countFilmsForCollection = (films=[], collectionId) =>
films.filter(note => note.collection === collectionId).length
