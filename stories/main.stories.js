import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import StoryPoints from '../src/components/mainPage/StoryPoints';
import MainPage from '../src/components/mainPage/MainPage';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';



storiesOf('Main Page', module)
    .addDecorator(withKnobs)
    .add('default', () => <MainPage sessionId="123456" isAdmin={boolean('Is Admin', true)} onClickResetVotes={action('onClickResetVotes')} onClickFinalize={action('onClickFinalize')}/>)


storiesOf('Main Page/Story Points', module)
    .addDecorator(withKnobs)
    .add('Default', () => <StoryPoints onClickItem={action('story point selected')}/>)
    .add('With Final Value', () => <StoryPoints onClickItem={action('story point selected')} finalValue={text('Final Value', 'infinity')}/>);
