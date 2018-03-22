import * as RX from 'reactxp';
import { IPerson, EStoryState } from '../../interfaces/commonInterfaces';
import TableView, {ITableViewProps, Ifield} from "../TableView/TableView";
import UiButton from '../../uiElemComponents/UiButton';

export interface ILeftPanelProps {
    kickOut: (personId: number) => void;
    toggleAdmin: (personId: number) => void;
    persons: IPerson[];
    currentPerson: IPerson;
    storyStatus: EStoryState;
}

interface IAdminProps {
    toggleAdmin: (personId: number) => void;
    personId: number;
    isAdmin: boolean;
}
const AdminComponent = ({toggleAdmin, isAdmin, personId}: IAdminProps) => (
    <UiButton onPressOut={(e: RX.Types.SyntheticEvent) => toggleAdmin(personId)} title={isAdmin ? '\u2713' : ""} />
)

interface IKickProps {
    kickOut: (personId: number) => void;
    personId: number;
}
const KickComponent = ({kickOut, personId}: IKickProps) => (
    <UiButton onPressOut={(e: RX.Types.SyntheticEvent) => kickOut(personId)} title={'\u2715'} />
)

enum FieldKeys {
    Name = 'name',
    Estimate = 'estimate',
    IsAdmin = 'isAdmin',
    Kick = 'kick'
}

export default function LeftPanel({kickOut, toggleAdmin, persons, currentPerson, storyStatus}: ILeftPanelProps) {
    let fields: Ifield[] = [
        {fieldKey: FieldKeys.Name, fieldText: "Name"},
        {fieldKey: FieldKeys.Estimate, fieldText: "Estimate"}
    ];
    if(currentPerson.isAdmin) {
        fields.push({fieldKey: FieldKeys.IsAdmin, fieldText: "Admin"});
        fields.push({fieldKey: FieldKeys.Kick, fieldText: "Kickout"});
    }

    let rows: {[fieldName: string]: JSX.Element}[] = persons.map(person => {
        var obj = {
            [FieldKeys.Name]: <RX.Text>{person.name}</RX.Text>,
            [FieldKeys.Estimate]: <RX.Text>{storyStatus == EStoryState.DISCUSSION ? person.estimate : ''}</RX.Text>,
            [FieldKeys.IsAdmin]: <AdminComponent toggleAdmin={toggleAdmin} isAdmin={person.isAdmin} personId={person.id} />,
            [FieldKeys.Kick]: <KickComponent kickOut={kickOut} personId={person.id} />
        }
        // if(person.isAdmin) {
        //     let adminObj = {
        //     }
        //     obj = Object.assign(obj, adminObj);
        // }
        return obj;
    })

    return <TableView fields={fields} rows={rows} />
}