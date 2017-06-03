// @flow
import * as themes from '../themes';
import React, { Component } from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  PageHeader,
  Paragraph,
  SwitchTheme,
  Text,
  ToggleBaseline,
} from '../../common/components';
import { Link, Title } from '../components';
import BoardGame from './BoardGame';

import he from 'he';

import { connect } from 'react-redux';
import { populate, error } from '../../common/board/actions';

const corsProxy = 'https://crossorigin.me';
const bggApi = 'https://boardgamegeek.com/xmlapi2';

class BoardPage extends Component {
  constructor() {
    super();

    this.state = { loading: true };
  }

  componentDidMount() {
    return this.setState({ loading: false }); // for debug
    const { dispatch, params: { user } } = this.props;

    const fetchGames = fetch(`${corsProxy}/${bggApi}/collection/?username=${user}&excludesubtype=boardgameexpansion`)
      .then(resp => resp.text())
      .then(text => {
        const items = new DOMParser()
          .parseFromString(text, 'text/xml')
          .querySelectorAll('[subtype="boardgame"]');

        return Array.prototype.map.call(items, item => item.getAttribute('objectid'));
      });

    fetchGames.then(
      objects => fetch(`${corsProxy}/${bggApi}/thing/?id=${objects.join(',')}`)
        .then(resp => resp.text())
        .then(text => {
          const items = new DOMParser()
            .parseFromString(text, 'text/xml')
            .querySelectorAll('item');

          const getTags = (item, tag) =>
            Array.prototype.map.call(
              Array.prototype.filter.call(
                item.querySelectorAll('link'),
                link => link.getAttribute('type') === tag,
              ),
              item => item.getAttribute('value'),
            );

          const boardgames = Array.prototype.map.call(items, item => ({
            id: item.getAttribute('id'),
            name: `
              ${item.querySelector('name').getAttribute('value')}
              (${item.querySelector('yearpublished').getAttribute('value')})
            `,
            image: item.querySelector('image').textContent,
            description: he.decode(item.querySelector('description').textContent),
            minPlayers: +item.querySelector('minplayers').getAttribute('value'),
            maxPlayers: +item.querySelector('maxplayers').getAttribute('value'),
            playingtime: +item.querySelector('playingtime').getAttribute('value'),
            minplaytime: +item.querySelector('minplaytime').getAttribute('value'),
            maxplaytime: +item.querySelector('maxplaytime').getAttribute('value'),
            category: getTags(item, 'boardgamecategory'),
            mechanic: getTags(item, 'boardgamemechanic'),
          }));

          dispatch(populate(boardgames));
          this.setState({ loading: false });
        }),
      reason => {
        dispatch(error(`Failed to fetch game data: ${reason}`));
        this.setState({ loading: false });
      },
    );
  }

  handleSuccintToggle = () => {
    this.setState({
      succint: !this.state.succint,
    });
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    }

    const {
      appetizers,
      lightFare,
      mainCourse,
      error,
    } = this.props;

    return (
      <div>
        <h1 style={{
          fontFamily: ['Monsieur La Doulaise', 'cursive'],
          fontSize: 85,
          margin: '0 auto',
        }}>
          Board Game Menu
        </h1>
        <Title message="Board Games" />
        <label>
          <input type="checkbox" checked={this.state.succint} onChange={this.handleSuccintToggle} />
          Succint Descriptions? (limits to 3 lines max)
        </label>
        {
          error
        }
        {
          appetizers.length > 0 &&
          <PageHeader
            heading="Appetizers"
            description="Under an hour"
          />
        }
        { appetizers.map(game => <BoardGame key={game.id} {...game} succint={this.state.succint} />)}
        {
          lightFare.length > 0 &&
          <PageHeader
            heading="Light Fare"
            description="1 - 3 hours"
          />
        }
        { lightFare.map(game => <BoardGame key={game.id} {...game} succint={this.state.succint} />)}
        {
          mainCourse.length > 0 &&
          <PageHeader
            heading="Main Course"
            description="> 3 hours"
          />
        }
        { mainCourse.map(game => <BoardGame key={game.id} {...game} succint={this.state.succint} />)}
      </div>
    );
  }
}

export default connect(
  state => state.board,
)(BoardPage);
