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

export default class BoardGame extends Component {
  constructor() {
    super();

    this.state = {
      description: [],
    };
  }

  render() {
    const {
      name,
      image,
      description,
      minPlayers,
      maxPlayers,
      playingtime,
      minplaytime,
      maxplaytime,
      category,
      mechanic,
    } = this.props;

    const players = minPlayers === maxPlayers
      ? `${minPlayers} players`
      : `${minPlayers} - ${maxPlayers} players`;

    let playtime = '';
    const hours = Math.floor(playingtime / 60);
    const minutes = playingtime % 60;

    if (hours > 0) {
      playtime += `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    if (minutes > 0) {
      playtime += ` ${minutes} mins`;
    }

    return (
      <div>
        <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
        <Image
          src={image}
          size={{ height: 100, width: 100 }}
          title={name}
        />
        </div>
        <div style={{ display: 'inline-block', marginLeft: 10, width: 'calc(100% - 110px)' }}>
          <div>
          <strong>{ name }</strong>
          </div>
          <div>
          <span>{ players }</span>
          <span>{ playtime }</span>
          </div>
        <textarea
            style={{ width: '100%' }}
            rows="4"
          defaultValue={description}
        />
        {
          category.map(category => (
            <Button
              primary
              size={-1}
              marginHorizontal={0.25}
              key={category}
            >
              { category }
            </Button>
          ))
        }

        {
          mechanic.map(mechanic => (
            <Button
              primary
              size={-1}
              marginHorizontal={0.25}
              key={mechanic}
            >
              { mechanic }
            </Button>
          ))
        }
        </div>
      </div>
    );
  }
}
