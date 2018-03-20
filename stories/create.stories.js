import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import CreateSession from '../src/components/createSession/CreateSession';


storiesOf('Create Session', module)
  .add('Landing page', () => <CreateSession onClickCreate={action('Create session')}/>)
