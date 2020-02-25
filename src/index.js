import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import TempChartBundle from "./lib";
import tempData from "./tempData.json"

class App extends Component {
    constructor(props) {
        super(props);

        this.dataTypeToColorDict = {
            MEDS: "#C2EEF8",
            FLUSHES: "#5DD2EF",
            TPN: "#84A5D5",
            FEEDS: "#A3DBDC",
            lol434ra: "#C13BDA",
            xbo4334x: "#613BFA"
        }

        this.state = {
            data: tempData,
            dtWindow: [1482814800000, 1510117200000],
            width: 1200,
            height: 400
        }

        this.meds = ["MEDS", "FLUSHES", "FEEDS", "TPN"]

        this.handleRemoveBtnCLick = this.handleRemoveBtnCLick.bind(this)
    }

    componentDidMount() {
        let self = this
        let firstTime = true
        setInterval(function () {
            self.simulateDataChange(firstTime)
            firstTime = false
        }, 1000)
    }

    handleRemoveBtnCLick() {
        let data = this.state.data
        data = data.slice(0, -1)
        this.setState({
            ...this.state,
            data: [
                { name: "Administered Medications", time: 1456293058, type: "Intake", value: 1 },
                { name: "Blood Products", time: 1456293058, type: "Output", value: 28.502415458937197 },
                { name: "Urine Output", time: 1456293058, type: "Output", value: 28.502415458937197 },
                { name: "Administered Medications", time: 1456293058, type: "Intake", value: 28.502415458937197 },
                { name: "Continuous Medications", time: 1456293058, type: "Intake", value: 28.502415458937197 },
                { name: "Administered Medications", time: 1456293060, type: "Intake", value: 28.502415458937197 },
                { name: "Blood Products", time: 1456293060, type: "Output", value: 28.502415458937197 },
                { name: "Urine Output", time: 1456293060, type: "Output", value: 28.502415458937197 },
                { name: "Administered Medications", time: 1456293060, type: "Intake", value: 28.502415458937197 },
                { name: "Continuous Medications", time: 1456293060, type: "Intake", value: 28.502415458937197 },
            ],
        })
    }

    handleSubmit = (e) => {
        if (e) e.preventDefault()
        const data = this.data.value
        var jsonStr = data.replace(/(\w+:)|(\w+ :)/g, function (s) {
            return '"' + s.substring(0, s.length - 1) + '":'
        })

        let json = JSON.parse(jsonStr)
        let newData = this.state.data
        newData.push(json)
        this.setState({
            data: [...this.state.data, json]
        })
    }

    simulateDataChange(firstTime) {
        let newMaxTime
        if (firstTime) {
            newMaxTime = (this.state.data[this.state.data.length - 1]["time"]) + 26400
        } else {
            newMaxTime = this.state.data[this.state.data.length - 1]["time"] + 26400
        }

        let newTemp = {
            temp: (Math.floor(Math.random() * 20) + 20), 
            time: newMaxTime
        }

        let newData = this.state.data
        // newData = newData.slice(2)
        newData.push(newTemp)

        this.setState({
            ...this.state,
            data: [...newData, newTemp],
            dtWindow: [this.state.data[0]["time"] * 1000, newMaxTime * 1000 - 26400000]
        })
        console.log(this.state.data)
    }

    render() {
        let { data, dtWindow, width, height } = this.state
        return (
            <>
                <div>Pass in data in the form: {' { value: 1, type: "MEDS" } '}</div>
                <form onSubmit={this.handleSubmit}>
                    <input style={{
                        height: "50px",
                        width: "50%",
                        fontSize: "14pt"
                    }} placeholder="data" type="text" ref={(element) => { this.data = element }} />
                    <button>ADD DATA</button>
                </form>
                <button onClick={this.handleRemoveBtnCLick}>REMOVE DATA</button>
                <TempChartBundle
                    data={data}
                    dtWindow={dtWindow}
                    width={width}
                    height={height}
                    isXAxisVisible={false} />
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
