import React from 'react'

export default React.createContext({
  films: [],
  collections: [],
  addFilm: () => {},
  deleteFilm: () => {},
  addCollection: () => {},
  deleteCollection: () => {}
})