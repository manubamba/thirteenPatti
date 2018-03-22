import * as RX from 'reactxp';
import NavigatorImpl, { Types } from 'reactxp-navigation';
import { NavigationRouteId } from '../../App';
import Header from '../Header/Header';
import UiButton from '../../uiElemComponents/UiButton';

interface HomePageProps {
    navigator: NavigatorImpl;
}

export default class HomePage extends RX.Component<HomePageProps, {}> {

    private navigateTo = (navigationRoute: NavigationRouteId) => () => {
        this.props.navigator.push({
            routeId: navigationRoute,
            sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight
        });
    }

    render() {
        return (
            <RX.View>
                <Header title="Home Page" navigator={this.props.navigator} />
                <RX.View>
                    <UiButton title="Create Session" onPress={this.navigateTo(NavigationRouteId.CreateSession)}></UiButton>
                    <UiButton title="Join Session" onPress={this.navigateTo(NavigationRouteId.JoinSession)}></UiButton>
                </RX.View>
            </RX.View>
        );
    }
}