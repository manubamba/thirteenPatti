import * as RX from 'reactxp';
import NavigatorImpl, { Types } from 'reactxp-navigation';

interface UiButtonProps extends RX.Types.ButtonProps {
    styles?: RX.Types.ButtonStyle,
}

const buttonStyle = RX.Styles.createButtonStyle({
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    margin: 5
})

export default function({title, styles, ...props}: UiButtonProps) {
    return(
        <RX.Button {...props} style={[buttonStyle, styles]}>
            <RX.Text>{title}</RX.Text>
        </RX.Button>
    )
}