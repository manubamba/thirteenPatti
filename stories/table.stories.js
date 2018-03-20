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
        Name: <RX.Text>Vineet</RX.Text>,
        Estimate: <RX.Text>5</RX.Text>,
        Kickout: <RX.Button>Kickout</RX.Button>
    },
    {
        isAdmin: <RX.Text>No</RX.Text>,
        Name: <RX.Text>Manu</RX.Text>,
        Estimate: <RX.Text>4</RX.Text>,
        Kickout: <RX.Button>Kickout</RX.Button>
    },
    {
        isAdmin: <RX.Text>No</RX.Text>,
        Name: <RX.Text>Rakesh</RX.Text>,
        Estimate: <RX.Text>6</RX.Text>,
        Kickout: <RX.Button>Kickout</RX.Button>
    }
]

storiesOf('Table View', module)
  .add('Three row table', () => <TableView fieldNames={["isAdmin", "Name", "Estimate", "Kickout"]} rows={rows3} />)
