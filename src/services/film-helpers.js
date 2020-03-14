
export const findCollection = (collections=[], collectionId) =>
collections.find(collection => collection.id === Number(collectionId))

export const findFilm = (films=[], filmId) =>
films.find(film => film.id === Number(filmId))

export const getFilmsForCollection = (films=[], collectionId) => (
(!collectionId)
  ? films
  : films.filter(film => film.collection === collectionId)
)

export const countFilmsForCollection = (films=[], collectionId) =>
films.filter(film => film.collection === collectionId).length
