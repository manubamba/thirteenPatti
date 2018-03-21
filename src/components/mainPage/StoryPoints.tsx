import * as RX from 'reactxp';

export interface StoryPointsProps {
    onClickItem: (key: string) => void;
    chosenValue?: string;
    finalValue?: string;
}

export default class StoryPoints extends RX.Component<StoryPointsProps, any> {
    render() {
        const { onClickItem, finalValue, chosenValue } = this.props;
        const STORYPOINTS = [
            {
                key: '0',
                label: '0'
            },
            {
                key: '1',
                label: '1'
            },
            {
                key: '2',
                label: '2'
            },
            {
                key: '3',
                label: '3'
            },
            {
                key: '5',
                label: '5'
            },
            {
                key: '8',
                label: '8'
            },
            {
                key: '13',
                label: '13'
            },
            {
                key: '20',
                label: '20'
            },
            {
                key: '40',
                label: '40'
            },
            {
                key: '100',
                label: '100'
            },
            {
                key: '?',
                label: '?'
            },
            {
                key: 'coffee',
                label: '☕'
            },
            {
                key: 'infinity',
                label: '∞'
            },
        ];
        if (finalValue) {
            const finalValueObj = STORYPOINTS.filter(({key}) => key === finalValue)[0];
            return (
                <RX.View>
                    <RX.Text>{finalValueObj ? finalValueObj.label : finalValue}</RX.Text>
                </RX.View>
            );
        }
        return (
            <RX.View>
                {STORYPOINTS.map(({key, label}) => {
                    const handleClick = () => onClickItem(key);
                    return <RX.Button key={key} onPress={handleClick}>{label}</RX.Button>
                })}
            </RX.View>
        );
    }
}