import React from "react";
import { expect } from "chai";
import { spy } from "sinon";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import ArticleList from "../client/components/ArticleList";
import Article from "../client/components/Article";

describe("React components", () => {
  describe("Article", () => {
    // Before every `it` spec, we instantiate a new `Article` react component.
    // `Article` comes from the client/components/Article.js file.
    // This component will receive some data in its `fullArticle` prop.
    // We store this component in a testable wrapper, `articleWrapper`.

    let articleData, articleWrapper;
    beforeEach("Create <Article /> wrapper", () => {
      articleData = {
        title: "Migratory Birds",
        content:
          "The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family."
      };
      // creates the testable React component
      articleWrapper = shallow(<Article fullArticle={articleData} />);
    });

    // These specs are relatively promitive — all we are asking you to
    // do is to fill in each JSX tag (h1 & p) in the `render`
    // method to match the HTML string shown. You can pass these in a
    // "trivial" way, but look five or so specs down for a twist…

    xit("includes the article's title as an h1", () => {
      expect(articleWrapper.find("h1")).to.have.html("<h1>Migratory Birds</h1>");
    });

    xit("includes the article's content as paragraph", () => {
      expect(articleWrapper.find("p")).to.have.html(
        "<p>The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.</p>"
      );
    });

    // This spec requires more understanding of JSX / React.
    // Here we are demonstrating that your `render` method shouldn't
    // always return the exact same strings in its JSX; instead, the result
    // should vary based on the passed-in data. Where does that data come from?
    // How do you get access to it? Go back to the `beforeEach` block to see.

    xit("is not hardcoded", () => {
      const aDifferentArticle = {
        title: "Blue Wizards",
        content:
          "They are two of the five Wizards (or Istari) sent by the Valar to Middle-earth to aid in the struggle against Sauron."
      };
      // we make a new component with this different data, and check its contents
      const differentarticleWrapper = shallow(<Article fullArticle={aDifferentArticle} />);
      expect(differentarticleWrapper.find("h1")).to.have.html("<h1>Blue Wizards</h1>");
      expect(differentarticleWrapper.find("p")).to.have.html(
        "<p>They are two of the five Wizards (or Istari) sent by the Valar to Middle-earth to aid in the struggle against Sauron.</p>"
      );
    });
  });

  describe("ArticleList", () => {
    // Once again, we are making a testable React component. This time,
    // it's our `Inbox` component.

    const articleList = [
      {
        title: "Migratory Birds",
        content:
          "The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family."
      },
      {
        title: "Blue Wizards",
        content:
          "They are two of the five Wizards (or Istari) sent by the Valar to Middle-earth to aid in the struggle against Sauron."
      },
      {
        title: "Loren Ipsum",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ];

    let articleListWrapper;
    beforeEach("Create <ArticleList />", () => {
      articleListWrapper = shallow(<ArticleList />);
      // we're simulating the component mounting by simply calling the `componentDidMountMethod` for this component (if you've defined one)
      if (articleListWrapper.instance().componentDidMount) {
        articleListWrapper.instance().componentDidMount();
      }
    });

    // How (or where) do you define the initial state of a React component?
    xit("starts with an initial state having an empty articles array", () => {
      const currentState = articleListWrapper.state();
      expect(currentState.articles).to.be.deep.equal([]);
    });

    xit("is comprised of <Article /> components based on what gets placed on the state", () => {
      // This will alter the component's *local state* (i.e. `this.state`).
      articleListWrapper.setState({ articles: articleList });
      // There should now be a bunch of Message components in the output.
      expect(articleListWrapper.find(Article)).to.have.length(3);

      // The first message displayed in the inbox should be based off of the
      // first element in the randomMessages array.
      const firstMessage = articleListWrapper.find(Article).at(0);
      expect(firstMessage.equals(<Article fullArticle={articleList[0]} />)).to.be.true; // eslint-disable-line
    });
  });
});