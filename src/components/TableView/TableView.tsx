import * as RX from 'reactxp';

const defaultRootStyle = RX.Styles.createViewStyle({
    
});

const defaultHeaderStyle = RX.Styles.createViewStyle({
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
    flexDirection: "column",
    flex: 1,
    alignItems: "center"
});

const defaultHeaderCellStyle = RX.Styles.createViewStyle({
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
})

export interface ITableViewProps {
    fieldNames: string[],
    rows: {[fieldName: string]: RX.Types.ComponentBase}[],
    tableRootStyle?: RX.Types.ViewStyle,
    tableHeaderStyle?: RX.Types.ViewStyle,
    tableBodyStyle?: RX.Types.ScrollViewStyle,
    tableRowStyle?: RX.Types.ViewStyle,
    tableCellStyle?: RX.Types.ViewStyle,
    tableHeaderCellStyle?: RX.Types.ViewStyle,
}

export default function TableView({
    fieldNames,
    rows,
    tableRootStyle,
    tableHeaderStyle,
    tableBodyStyle,
    tableRowStyle,
    tableCellStyle,
    tableHeaderCellStyle
}: ITableViewProps) {
    return (
        <RX.View style={[defaultRootStyle, tableRootStyle]}>
            <RX.View style={[defaultHeaderStyle, tableHeaderStyle]}>
                {
                    fieldNames.map(field => (
                        <RX.View key={field} style={[defaultHeaderCellStyle, tableHeaderCellStyle]}>
                            <RX.Text>{field}</RX.Text>
                        </RX.View>
                    ))
                }
            </RX.View>
            <RX.ScrollView style={[defaultBodyStyle, tableBodyStyle]}>
                {
                    rows.map((row, indx) => {
                        return (
                            <RX.View style={[defaultRowStyle, tableRowStyle]} key={indx}>
                                {
                                    fieldNames.map((field, indx2) => (
                                        <RX.View key={"row" + indx + "-" + indx2} style={[defaultCellStyle, tableCellStyle]}>{row[field]}</RX.View>
                                    ))
                                }
                            </RX.View>
                        )
                    })
                }
            </RX.ScrollView>
        </RX.View>
    )
}