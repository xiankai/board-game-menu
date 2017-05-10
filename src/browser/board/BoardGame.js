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
import Label from './Label';
import Description from './Description';

export default class BoardGame extends Component {
  render() {
    const {
      id,
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

      customDescription,
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
            // src={'//placehold.it/100x100'}
            size={{ height: 100, width: 100 }}
            title={name}
          />
        </div>
        <div style={{ display: 'inline-block', marginLeft: 10, width: 'calc(100% - 110px)' }}>
          <div>
            <div style={{ display: 'inline-block' }}>
              <div>
                <strong>{ name }</strong>
              </div>
              <div>
                <span>{ players }</span>
                <span>{ playtime }</span>
              </div>
            </div>
            <div style={{ display: 'inline-block' }}>
              {
                category.map(category => (
                  <Label>
                    { category }
                  </Label>
                ))
              }

              {
                mechanic.map(mechanic => (
                  <Label>
                    { mechanic }
                  </Label>
                ))
              }
            </div>
          </div>
          <Description description={description} id={+id} />
        </div>
      </div>
    );
  }
}
