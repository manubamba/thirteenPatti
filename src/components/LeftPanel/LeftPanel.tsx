import * as RX from 'reactxp';
import { IPerson } from '../../interfaces/commonInterfaces';

export interface ILeftPanelProps {
    kickOut: (personId: number) => void,
    makeAdmin: (personId: number) => void,
    persons: IPerson[]
}

export default function LeftPanel({kickOut, makeAdmin, persons}: ILeftPanelProps) {

}