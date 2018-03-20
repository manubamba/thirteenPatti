import * as RX from 'reactxp';

const defaultRootStyle = RX.Styles.createViewStyle({
    // borderWidth: 1,
    // borderColor: "#eee"
});

const defaultHeaderStyle = RX.Styles.createViewStyle({
    borderWidth: 2,
    borderColor: "#eee",
    flexDirection: "row"
});

const defaultBodyStyle = RX.Styles.createScrollViewStyle({
    borderWidth: 1,
    backgroundColor: '#eee',
    flexDirection: "column"
});

const defaultRowStyle = RX.Styles.createViewStyle({
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row"
});

const defaultCellStyle = RX.Styles.createViewStyle({
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "column"
});

export interface ITableViewProps {
    fieldNames: string[],
    rows: {[fieldName: string]: RX.Types.ComponentBase}[],
    tableRootStyle?: RX.Types.ViewStyle,
    tableHeaderStyle?: RX.Types.ViewStyle,
    tableBodyStyle?: RX.Types.ScrollViewStyle,
    tableRowStyle?: RX.Types.ViewStyle,
    tableCellStyle?: RX.Types.ViewStyle,
}

export default function TableView({
    fieldNames,
    rows,
    tableRootStyle,
    tableHeaderStyle,
    tableBodyStyle,
    tableRowStyle,
    tableCellStyle
}: ITableViewProps) {
    return (
        <RX.View style={[defaultRootStyle, tableRootStyle]}>
            <RX.View style={[defaultHeaderStyle, tableHeaderStyle]}>
                {
                    fieldNames.map(field => (
                        <RX.View key={field}>
                            <RX.Text>{field}</RX.Text>
                        </RX.View>
                    ))
                }
            </RX.View>
            <RX.View style={[defaultBodyStyle, tableBodyStyle]}>
                {
                    rows.map((row, indx) => {
                        // let cellsArr = [];
                        // for(let fieldName in fieldNames) {
                        //     let cellComp = <RX.View key={fieldName + "-cell-" + indx} style={[defaultCellStyle, tableCellStyle]}>{row[fieldName]}</RX.View>
                        //     cellsArr.push(cellComp);
                        // }
                        return (
                            <RX.View style={[defaultRowStyle, tableRowStyle]} key={indx}>
                                {
                                    fieldNames.map((field, indx2) => (
                                        <RX.View key={"row" + indx + "-" + indx2}>{row[field]}</RX.View>
                                    ))
                                }
                            </RX.View>
                        )
                    })
                }
            </RX.View>
        </RX.View>
    )
}