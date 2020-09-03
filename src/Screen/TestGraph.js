import React, { Component } from 'react';
import { View, Text, Dimensions, WebView, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import LineChart from "react-native-responsive-linechart";
import ChartView from 'react-native-highcharts';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import PureChart from 'react-native-pure-chart';
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
// } from 'react-native-chart-kit'

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(25, 118, 210,  ${opacity})`, // optional
        strokeWidth: 2 // optional
    }]
};

const dataA = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

const data = [-10, -15, 40, 60, 78, 42, 56];
const labels = ["jan", "feb", "mar", "apr", "may", "jun", "jul"];
const configB = {
    line: {
        visible: true,
        strokeWidth: 1,
        strokeColor: "#54a0ff"
    },
    area: {
        visible: false
    },
    tooltip: {
        visible: true,
        labelFontSize: 10
    },
    grid: {
        stepSize: 10000
    },
    yAxis: {
        labelColor: "#54a0ff"
    },
    insetY: 10,
    insetX: 10
};

const modules = [
    'highcharts-more',
    'solid-gauge'
];

const Highcharts = 'Highcharts';
const conf = {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        // events: {
        //     load: function () {

        //         // set up the updating of the chart each second
        //         var series = this.series[0];
        //         setInterval(function () {
        //             var x = (new Date()).getTime(), // current time
        //                 y = Math.random();
        //             series.addPoint([x, y], true, true);
        //         }, 1000);
        //     }
        // }
    },
    title: {
        text: 'Live random data'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Random data',
        // data: (function () {
        //     // generate an array of random data
        //     var data = [],
        //         time = (new Date()).getTime(),
        //         i;

        //     for (i = -19; i <= 0; i += 1) {
        //         data.push({
        //             x: time + i * 1000,
        //             y: Math.random()
        //         });
        //     }
        //     return data;
        // }())
    }]
};

const options = {
    global: {
        useUTC: false
    },
    lang: {
        decimalPoint: ',',
        thousandsSep: '.'
    }
};

export default class TestGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: {
                series: [{
                    data: [1, 3, 2]
                }]
            }
        };
    }

    getChart() {
        let sampleData = [
            { x: '2018-01-01', y: 30 },
            { x: '2018-01-02', y: 200 },
            { x: '2018-01-03', y: 170 },
            { x: '2018-01-04', y: 250 },
            { x: '2018-01-03', y: 170 },
            { x: '2018-01-04', y: 250 },
            { x: '2018-01-03', y: 170 },
            { x: '2018-01-04', y: 250 },
            { x: '2018-01-05', y: 10 }
        ]
        return sampleData
    }
    render() {
        return (
            <View style={styles.container}>
                <PureChart
                    data={this.getChart()}
                    type='line'
                    width={'100%'}
                    height={200}
                    
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"
    }
});
