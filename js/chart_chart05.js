var chart = AmCharts.makeChart("chart_chart05", {
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
			"axisAlpha": 0
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
			"year": "Value",
			"expenses": 10.1
		},
		{
			"year": "Value",
			"expenses": 12.8
		},
		{
			"year": "Value",
			"expenses": 13.9
		},
		{
			"year": "Value",
			"expenses": 15.1
		},
		{
			"year": "Value",
			"expenses": 17.9
		},
		{
			"year": "Value",
			"expenses": 19.1
		},
		{
			"year": "Value",
			"expenses": 20.9
		},
		{
			"year": "Value",
			"expenses": 23.1
		},
		{
			"year": "Value",
			"expenses": 25
		}
	],
    "export": {
    	"enabled": true
     }

});