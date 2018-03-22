/*
* This file demonstrates a basic ReactXP app.
*/
// This example uses ExperimentalNavigation on iOS and Android
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector } from 'reactxp-navigation';
import * as RX  from 'reactxp';

import MainPanel from './MainPanel';
import SecondPanel from './SecondPanel';
import MainPageContainer from './containers/MainPageContainer';
import { Provider } from 'react-redux';
import store from './store/getStore';
import CreateSessionContainer from './containers/CreateSessionContainer';
import CommonJoinContainer from './containers/CommonJoinContainer';
import SharedJoinContainer from './containers/SharedJoinContainer';

import socket from './store/socket';
console.log(socket);
export enum NavigationRouteId {
    CreateSession,
    JoinSession,
    JoinSharedSession,
    MainStory
}

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    }, false)
};

class App extends RX.Component<{}, null> {
    private _navigator: Navigator;

    componentDidMount() {
        this._navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.CreateSession,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <Provider store={store}>
                <Navigator
                    ref={ this._onNavigatorRef }
                    renderScene={ this._renderScene }
                    cardStyle={ styles.navCardStyle }
                    delegateSelector={ DelegateSelector }
                />
            </Provider>
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        this._navigator = navigator;
    }

    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        const navProp = {navigator: this._navigator};
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainStory:
                return<RX.View><MainPageContainer {...navProp} /></RX.View>;
            case NavigationRouteId.CreateSession:
                return <RX.View><CreateSessionContainer {...navProp}/></RX.View>;
            case NavigationRouteId.JoinSession:
                return <RX.View><CommonJoinContainer {...navProp} /></RX.View>;
            case NavigationRouteId.JoinSharedSession:
                return <RX.View><SharedJoinContainer {...navProp} /></RX.View>;
        }

        return null;
    }

    private _onPressNavigate = () => {
        this._navigator.push({
            routeId: NavigationRouteId.MainStory,
            sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight
        });
    }

    private _onPressBack = () => {
        this._navigator.pop();
    }
}

export default App;
