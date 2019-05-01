import React, { PureComponent } from "react";

class TempChartLeftPanel extends PureComponent {
    constructor(props) {
        super(props);
        this.canvasW = this.props.canvasW
        this.canvasH = this.props.canvasH
    }

    render() {
        let { panelHeight, panelWidth } = this.props
        const styles = {
            tempChartLeftPanel: {
                height: panelHeight + "px",
                width: panelWidth + "px",
                backgroundColor: "#fffcec"
            },
            tempChartLabel: {
                position: "absolute",
                top: "45%",
                left: "10%",
                color: '#373c62',
                fontWeight: '800'
            }
        }
        return (
            <div className="temp-chart-left-panel"
                style={styles.tempChartLeftPanel}>
                <div className="temp-chart-label"
                    style={styles.tempChartLabel}> Temperature ({"\u00B0"}C) </div>
            </div>
        )
    }
}

export default TempChartLeftPanel