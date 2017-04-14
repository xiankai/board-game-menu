// @flow
import React, { Component } from 'react';

import {
  Box,
  PageHeader,
  TextInput,
  Button,
} from '../../common/components';
import { Title } from '../components';

export default class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  handleChange = e => {
    this.setState({
      user: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { router: { push } } = this.props;

    push(`/lookup/${this.state.user}`);
  };

  render() {
    return (
      <Box>
        <Title message="Board Game Menu" />
        <PageHeader
          heading="Board Game Menu generator"
          description="For your list from BoardGameGeek"
        />
        <TextInput
          type="text"
          size={2}
          maxLength={100}
          placeholder="Enter your BGG username"
          onChange={this.handleChange}
        />
        <Button
          primary
          onClick={this.handleSubmit}
        >
          Lookup
        </Button>
      </Box>
    );
  }
}
