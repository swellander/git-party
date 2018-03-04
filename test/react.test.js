import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Articles from '../client/components/Articles';
import SingleArticle from '../client/components/SingleArticle';


const articleList = [
  {
    title: 'Migratory Birds',
    content: 'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.'
  },
  {
    title: 'Blue Wizards',
    content: 'They are two of the five Wizards (or Istari) sent by the Valar to Middle-earth to aid in the struggle against Sauron.'
  }
];

describe('React components', () => {
  describe('<Articles /> component', () => {
    let articles;
    beforeEach('Create component', () => {
      articles = Enzyme.shallow(<Articles articleList={articleList}/>);
    });

    xit('uses a <SingleArticle /> for each article', () => {
      expect(articles.find(SingleArticle).length).to.be.equal(2);
    });
    
  });
});
