AmCharts.useUTC = true;
var chart = AmCharts.makeChart( "chart_chart06", {
	"type": "gantt",
    "theme": "light",
	"marginRight": 10,
	"marginTop": 10,
	"period": "hh",
    "dataDateFormat":"YYYY-MM-DD",
    "path": "http://www.amcharts.com/lib/3/",
	"balloonDateFormat": "JJ:NN",
	"columnWidth": 0.5,
	"valueAxis": {
		"type": "date",
		"axisColor": "#d9d9d9",
		"tickLength": 0,
		"axisAlpha": 0,
		"minimum": 7,
		"maximum": 31
	},
	"brightnessStep": 10,
	"graph": {
		"fillAlphas": 1,
		"balloonText": "Value"
	},
	"categoryField": "category",
	"segmentsField": "segments",
	"colorField": "color",
	"startDate": "2015-01-01",
	"startField": "start",
	"endField": "end",
	"durationField": "duration",
	"categoryAxis": {
		"axisColor": "#d9d9d9",
		"tickLength": 0
		},
	"dataProvider": [ {
		"category": "Value",
		"segments": [ {
			"start": 7,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 2,
			"color": "#91af51",
			"task": "Task #2"
		}, {
			"duration": 2,
			"color": "#ea8143",
			"task": "Task #3"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 10,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 1,
			"color": "#91af51",
			"task": "Task #2"
		}, {
			"duration": 4,
			"color": "#ea8143",
			"task": "Task #3"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 12,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"start": 16,
			"duration": 2,
			"color": "#91af51",
			"task": "Task #2"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 8,
			"duration": 1,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 4,
			"color": "#91af51",
			"task": "Task #2"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 9,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 1,
			"color": "#91af51",
			"task": "Task #2"
		}, {
			"duration": 8,
			"color": "#ea8143",
			"task": "Task #3"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 9,
			"duration": 8,
			"color": "#91af51",
			"task": "Task #2"
		}, {
			"duration": 7,
			"color": "#ea8143",
			"task": "Task #3"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 12,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"start": 16,
			"duration": 2,
			"color": "#ea8143",
			"task": "Task #3"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 8,
			"duration": 10,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 2,
			"color": "#91af51",
			"task": "Task #2"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 18,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 2,
			"color": "#91af51",
			"task": "Task #2"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 17,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 2,
			"color": "#91af51",
			"task": "Task #2"
		}, {
			"duration": 2,
			"color": "#ea8143",
			"task": "Task #3"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 13,
			"duration": 2,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"duration": 1,
			"color": "#91af51",
			"task": "Task #2"
		}, {
			"duration": 4,
			"color": "#ea8143",
			"task": "Task #3"
		} ]
	}, {
		"category": "Value",
		"segments": [ {
			"start": 10,
			"duration": 3,
			"color": "#4462a3",
			"task": "Task #1"
		}, {
			"start": 17,
			"duration": 4,
			"color": "#91af51",
			"task": "Task #2"
		} ]
	} ],
	"balloon": {
		"adjustBorderColor": true,
		"fillColor": "#000000",
		"fillAlpha": ".9",
		"shadowAlpha": "0",
		"cornerRadius": "0",
		"borderThickness": "0",
		"color": "#ffffff",
	},
    "export": {
    	"enabled": true
     }
} );