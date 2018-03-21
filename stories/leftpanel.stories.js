import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import LeftPanel from '../src/components/LeftPanel/LeftPanel';

const allPersons = [
    {
        name: "Vineet",
        id: 1,
        estimate: 5,
        isAdmin: false
    },
    {
        name: "Manik",
        id: 2,
        estimate: 6,
        isAdmin: true
    },
    {
        name: "Manu",
        id: 3,
        estimate: 4,
        isAdmin: false
    },
    {
        name: "Rakesh",
        id: 4,
        estimate: 5,
        isAdmin: true
    }
]

const props = {
    kickOut: (personId) => {
        console.log("kicking person with id: " + personId);
    },
    toggleAdmin: (personId) => {
        console.log("toggling the admin status of person with personId: " + personId);
    },
    persons: allPersons,
    currentPerson: allPersons[0],
    storyStatus: 'discussion'
}

storiesOf('Left Panel', module)
  .add('Left Panel', () => <LeftPanel {...props}/>)
