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
    const { dispatch, params: { user } } = this.props;

    const fetchGames = fetch(`${corsProxy}/${bggApi}/collection/?username=${user}`)
        .then(resp => resp.text())
        .then(text => {
          const items = new DOMParser()
            .parseFromString(text, 'text/xml')
            .querySelectorAll('[subtype="boardgame"]');

          return Array.prototype.map.call(items, item => item.getAttribute('objectid'));
        })
        .catch(reason => {
          dispatch(error(`Failed to load games: ${reason}`));
          this.setState({ loading: false });
        });

    fetchGames.then(objects => fetch(`${corsProxy}/${bggApi}/thing/?id=${objects.join(',')}`)
      .then(resp => resp.text())
      .then(text => {
        const items = new DOMParser()
          .parseFromString(text, 'text/xml')
          .querySelectorAll('item');

        const boardgames = Array.prototype.map.call(items, item => ({
          name: `
            ${item.querySelector('name').getAttribute('value')}
            (${item.querySelector('yearpublished').getAttribute('value')})
          `,
          image: item.querySelector('image').textContent,
          description: item.querySelector('description').textContent,
          minPlayers: +item.querySelector('minplayers').getAttribute('value'),
          maxPlayers: +item.querySelector('maxplayers').getAttribute('value'),
          playingtime: +item.querySelector('playingtime').getAttribute('value'),
          minplaytime: +item.querySelector('minplaytime').getAttribute('value'),
          maxplaytime: +item.querySelector('maxplaytime').getAttribute('value'),
          category: Array.prototype.map.call(item.querySelectorAll('boardgamecategory'), category => category.getAttribute('value')),
          mechanic: Array.prototype.map.call(item.querySelectorAll('boardgamemechanic'), mechanic => mechanic.getAttribute('value')),
        }));

        dispatch(populate(boardgames));
        this.setState({ loading: false });
      }),
    )
    .catch(reason => {
      dispatch(error(`Failed to fetch game data: ${reason}`));
      this.setState({ loading: false });
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
      <Box>
        <Title message="Board Games" />
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
        { appetizers.map(game => <BoardGame {...game} />)}
        {
          lightFare.length > 0 &&
          <PageHeader
            heading="Light Fare"
            description="1 - 3 hours"
          />
        }
        { lightFare.map(game => <BoardGame {...game} />)}
        {
          mainCourse.length > 0 &&
          <PageHeader
            heading="Main Course"
            description="> 3 hours"
          />
        }
        { mainCourse.map(game => <BoardGame {...game} />)}
      </Box>
    );
  }
}

export default connect(
  state => state.board,
)(BoardPage);
