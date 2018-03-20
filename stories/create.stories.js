import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import CreateSession from '../src/components/createSession/CreateSession';
import CommonJoin from "../src/components/CommonJoin/CommonJoin";


storiesOf('Create Session', module)
  .add('Landing page', () => <CreateSession onClickCreate={action('Create session')}/>)

storiesOf('Join Session', module)
  .add('Common Join Page', () => <CommonJoin joinSession={action('Join Session')} />)
