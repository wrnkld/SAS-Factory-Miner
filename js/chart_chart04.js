var chart = AmCharts.makeChart("chart_chart04", {
	"type": "serial",
    "path": "http://www.amcharts.com/lib/3/",
	"categoryField": "year",
	"rotate": false,
	"startDuration": 0,
	"categoryAxis": {
		"axisColor": "#d9d9d9",
		"tickLength": 0,
		"gridPosition": "start"
	},
	"trendLines": [],
	"graphs": [
		{
        	"balloonText": "Value",
			"fillAlphas": 0.8,
			"id": "AmGraph-1",
			"lineColor": "#4462a3",
			"lineAlpha": 1,
			"title": "Income",
			"type": "column",
			"valueField": "income"
		},
		{
        	"balloonText": "Value",
			"fillAlphas": 0.8,
			"id": "AmGraph-2",
			"lineColor": "#91af51",
			"lineAlpha": 1,
			"title": "Expenses",
			"type": "column",
			"valueField": "expenses"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"axisColor": "#d9d9d9",
			"tickLength": 0,
			"axisAlpha": 1
		}
	],
	"allLabels": [],
	"balloon": {
			"adjustBorderColor": true,
			"fillColor": "#000000",
			"fillAlpha": ".9",
			"shadowAlpha": "0",
			"cornerRadius": "0",
			"borderThickness": "0",
			"color": "#ffffff",
		},
	"titles": [],
	"dataProvider": [
		{
			"year": 2012,
			"income": 23.5,
			"expenses": 18.1
		},
		{
			"year": 2013,
			"income": 26.2,
			"expenses": 22.8
		},
		{
			"year": 2014,
			"income": 30.1,
			"expenses": 23.9
		},
		{
			"year": 2015,
			"income": 29.5,
			"expenses": 25.1
		},
		{
			"year": 2016,
			"income": 24.6,
			"expenses": 25
		}
	],
    "export": {
    	"enabled": true
     }

});