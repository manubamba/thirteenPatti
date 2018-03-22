import * as RX from 'reactxp';
import NavigatorImpl, { Types } from 'reactxp-navigation';

interface UiInputProps extends RX.Types.TextInputProps {
    styles?: RX.Types.TextInputStyle
}

interface UiInputState {
    focused: boolean
}

const rootStyle = RX.Styles.createTextInputStyle({
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#ddd"
});

const focusedStyle = RX.Styles.createTextInputStyle({
    borderColor: "#43a21f",
    borderWidth: 2
})

export default class UiInput extends RX.Component<UiInputProps, UiInputState> {

    constructor(props: UiInputProps) {
        super(props);
        this.state = {
            focused: false
        }
    }

    private changeFocus = (focused: boolean) => () => {
        this.setState({focused});
        // if(focused) {
        //     if(this.props.onFocus) {
        //         // this.props.onFocus();
        //     }
        // } else {
        //     if(this.props.onBlur) {
        //         this.props.onBlur();
        //     }
        // }
    }

    render() {
        let {...props} = this.props;
        return(
            <RX.TextInput style={[rootStyle, this.state.focused && focusedStyle]} {...props} onFocus={this.changeFocus(true)} onBlur={this.changeFocus(false)} />
        )
    }
}