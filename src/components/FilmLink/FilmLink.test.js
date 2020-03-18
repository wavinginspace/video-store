import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router} from 'react-router-dom';
import FilmLink from './FilmLink';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<Router><FilmLink film='test' /></Router>, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer.create(<Router><FilmLink film='test'/></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
