import * as RX from 'reactxp';
import NavigatorImpl, { Types } from 'reactxp-navigation';
import { NavigationRouteId } from '../../App';
import UiButton from '../../uiElemComponents/UiButton';

interface HeaderProps {
    navigator: NavigatorImpl;
    title?: string;
    enableBackNav?: boolean
}

const rootStyle = RX.Styles.createViewStyle({
    flexDirection: "row",
    justifyContent: "flex-start",
})

const titleStyle = RX.Styles.createTextStyle({
    marginLeft: 100
})

export default class Header extends RX.Component<HeaderProps, {}> {

    private navigateBack = () => {
        this.props.navigator.pop();
    }

    render() {
        let {enableBackNav, title} = this.props;
        return (
            <RX.View style={rootStyle}>
                {
                    !!enableBackNav && <UiButton title="Back" onPress={this.navigateBack} />
                }
                <RX.Text style={titleStyle}>{!!title ? title : ''}</RX.Text>
            </RX.View>
        );
    }
}