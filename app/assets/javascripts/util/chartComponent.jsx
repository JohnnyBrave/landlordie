const Charts = createReactClass({

    componentDidMount: function () {

        // Build the chart
        Highcharts.chart(this.props.chartId, {
            title: {
                text: this.props.chartTitle,
                align: 'center',
                x: 10
            },
            chart: {
                backgroundColor: '#F6EFFB',
                type: 'line'
            },

            subtitle: {
                text: 'source: Reporting Department at FIPS-AFRICA'
            },



            yAxis: {
                title: {
                    text: this.props.yAxisLable
                }

            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {

                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2011
                }
            },

            // plotOptions: {
            //     series: {
            //         pointStart: Date.UTC(2016, 0, 1),
            //         pointInterval: 24 * 3600 * 1000 // one day
            //     }
            // },


            series: this.props.chartData


        });


    },
    render: function () {
        // var _this = this;
        return (
            <div id={this.props.chartId}></div>
        )
    }
});