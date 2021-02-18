var chart = AmCharts.makeChart("chart_chart01", {
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
			"lineColor": "#4462a3",
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
			"expenses": 19.9
		},
		{
			"year": "Value",
			"expenses": 18.1
		},
		{
			"year": "Value",
			"expenses": 17.9
		},
		{
			"year": "Value",
			"expenses": 16.1
		},
		{
			"year": "Value",
			"expenses": 12.9
		},
		{
			"year": "Value",
			"expenses": 12.1
		},
		{
			"year": "Value",
			"expenses": 11
		}
	],
    "export": {
    	"enabled": true
     }

});