var chart = AmCharts.makeChart("chart_chart03", {
    "type": "serial",
    "theme": "light",
    "marginTop":10,
    "marginRight": 0,
    "path": "http://www.amcharts.com/lib/3/",
    "dataProvider": [{
        "year": "2000",
        "value": 0.507
    }, {
        "year": "2001",
        "value": 0.500
    }, {
        "year": "2002",
        "value": 0.492
    }, {
        "year": "2003",
        "value": 0.484
    }, {
        "year": "2004",
        "value": 0.436
    }, {
        "year": "2005",
        "value": 0.43
    }, {
        "year": "2006",
        "value": 0.40
    }, {
        "year": "2007",
        "value": 0.391
    }, {
        "year": "2008",
        "value": 0.372
    }, {
        "year": "2009",
        "value": 0.357
    }, {
        "year": "2010",
        "value": 0.333
    }, {
        "year": "2011",
        "value": 0.3
    }, {
        "year": "2012",
        "value": 0.283
    }, {
        "year": "2013",
        "value": 0.244
    }, {
        "year": "2014",
        "value": 0.230
    }, {
        "year": "2015",
        "value": 0.205
    }],
    "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
    }],
    "graphs": [{
        "id":"g1",
        "balloonText": "Value",
        "bullet": "round",
        "bulletSize": 8,         
        "lineColor": "#4462a3",
        "lineThickness": 1,
        "negativeLineColor": "#ea8143",
        "type": "smoothedLine",
        "valueField": "value"
    }],
    "dataDateFormat": "YYYY",
    "categoryField": "year",
    "categoryAxis": {
        "minPeriod": "YYYY",
		"tickLength": 0,
        "parseDates": true,
		"axisColor": "#d9d9d9",
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
    },
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
});
