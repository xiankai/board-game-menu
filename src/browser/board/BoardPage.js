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

const corsProxy = 'https://crossorigin.me';
const bggApi = 'https://boardgamegeek.com/xmlapi2';

export default class BoardPage extends Component {
  constructor() {
    super();

    this.state = {
      games: []
    };
  };
  
  componentDidMount() {
    const { params: { user } } = this.props;
    const fetchGames = fetch(`${corsProxy}/${bggApi}/collection/?username=${user}`)
        .then(resp => resp.text())
        .then(text => {
          const items = new DOMParser()
            .parseFromString(text, 'text/xml')
            .querySelectorAll('[subtype="boardgame"]');

          return Array.prototype.map.call(items, item => item.getAttribute('objectid'));
        })
        .catch(reason => console.error(`Failed to load games: ${reason}`));
      
    const games = fetchGames.then(objects => fetch(`${corsProxy}/${bggApi}/thing/?id=${objects.join(',')}`)
      .then(resp => resp.text())
      .then(text => {
        const items = new DOMParser()
          .parseFromString(text, 'text/xml')
          .querySelectorAll('item');

        return Array.prototype.map.call(items, item => ({
          name: `
            ${item.querySelector('name').getAttribute('value')}
            (${item.querySelector('yearpublished').getAttribute('value')})
          `,
          image: item.querySelector('image').textContent,
          description: item.querySelector('description').textContent,
          minPlayers: item.querySelector('minplayers').getAttribute('value'),
          maxPlayers: item.querySelector('maxplayers').getAttribute('value'),
          playingtime: item.querySelector('playingtime').getAttribute('value'),
          minplaytime: item.querySelector('minplaytime').getAttribute('value'),
          maxplaytime: item.querySelector('maxplaytime').getAttribute('value'),
          category: Array.prototype.map.call(item.querySelectorAll('boardgamecategory'), category => category.getAttribute('value')),
          mechanic: Array.prototype.map.call(item.querySelectorAll('boardgamemechanic'), mechanic => mechanic.getAttribute('value')),
        }));
      })
    )
    .catch(reason => console.error(`Failed to fetch game data: ${reason}`));

    games.then(games => {
      this.setState({
        games,
      })
    });
  }

  render() {
    return (
      <Box>
        <Title message="Board Games" />
        { this.state.games.map(game => <BoardGame {...game} /> )}
      </Box>
    );
  }
}
