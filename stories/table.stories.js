import React from 'react';
import * as RX from "reactxp";
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import CreateSession from '../src/components/createSession/CreateSession';
import CommonJoin from "../src/components/CommonJoin/CommonJoin";
import SharedJoin from "../src/components/SharedJoin/SharedJoin";
import TableView from "../src/components/TableView/TableView";

const rows3 = [
    {
        isAdmin: <RX.Text>Yes</RX.Text>,
        name: <RX.Text>Vineet</RX.Text>,
        estimate: <RX.Text>5</RX.Text>,
        kick: <RX.Button>Kickout</RX.Button>
    },
    {
        isAdmin: <RX.Text>No</RX.Text>,
        name: <RX.Text>Manu</RX.Text>,
        estimate: <RX.Text>4</RX.Text>,
        kick: <RX.Button>Kickout</RX.Button>
    },
    {
        isAdmin: <RX.Text>No</RX.Text>,
        name: <RX.Text>Rakesh</RX.Text>,
        estimate: <RX.Text>6</RX.Text>,
        kick: <RX.Button>Kickout</RX.Button>
    }
];

const fields = [
    {fieldKey: 'isAdmin', fieldText: "Is Admin"},
    {fieldKey: 'name', fieldText: "Name"},
    {fieldKey: 'estimate', fieldText: "Estimate"},
    {fieldKey: 'kick', fieldText: "Kickout"}
]

storiesOf('Table View', module)
  .add('Three row table', () => <TableView fields={fields} rows={rows3} />)
