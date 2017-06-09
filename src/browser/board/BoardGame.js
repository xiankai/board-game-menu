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
      succint,
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
      <div style={{ paddingTop: 15 }}>
        <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
          <Image
            src={image}
            // src={'//placehold.it/100x100'}
            size={{ height: 150, width: 150 }}
            title={name}
          />
        </div>
        <div style={{
          display: 'inline-block',
          marginLeft: 10,
          width: 'calc(100% - 160px)',
        }}>
          <Heading style={() => ({
            display: 'inline-block',
            fontSize: 30,
            marginBottom: 0,
          })}>
            { name }
          </Heading>
          <div style={{ display: 'inline-block', float: 'right', marginLeft: 20 }}>
            <Text>{ playtime }</Text>
          </div>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <Text>{ players }</Text>
          </div>
          <div style={{ margin: '5px 0' }}>
            {
              category.slice(0, 6).map(category => (
                <Label key={category} type="primary">
                  { category }
                </Label>
              ))
            }
          </div>
          <div>
            {
              mechanic.slice(0, 6).map(mechanic => (
                <Label key={mechanic} type="danger">
                  { mechanic }
                </Label>
              ))
            }
          </div>
          <Description
            id={+id}
            description={description}
            succint={succint}
          />
        </div>
      </div>
    );
  }
}
