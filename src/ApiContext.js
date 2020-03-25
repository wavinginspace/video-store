import React from 'react'

export default React.createContext({
  loggedIn: '',
  films: [],
  collections: [],
  user: '',
  addFilm: () => {},
  deleteFilm: () => {},
  addCollection: () => {},
  deleteCollection: () => {},
  handleRegistrationSuccess: () => {}
})