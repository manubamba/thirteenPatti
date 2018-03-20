import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import StoryPoints from '../src/components/mainPage/StoryPoints';
import { withKnobs, text } from '@storybook/addon-knobs/react';

storiesOf('Main Page/Story Points', module)
    .addDecorator(withKnobs)
    .add('Default', () => <StoryPoints onClickItem={action}/>)
    .add('With Final Value', () => <StoryPoints onClickItem={action} finalValue={text('Final Value', '')}/>);
