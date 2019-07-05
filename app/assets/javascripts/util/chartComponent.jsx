const Charts = window.Charts = React.createClass({

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
                text: '(30 Days)'
            },

            xAxis: {
                categories: this.props.categories,
                type: 'datetime',
                text: 'Date & Time',

                dateTimeLabelFormats: {

                    day: '%e. %b',
                }
            },


            yAxis: {
                title: {
                    text: 'Visitors'
                }

            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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