var width = 800,
    height = 600,
    radius = Math.min(width, height) / 2;

function hover_adjust(d, color) {
  return d.hover ? d3.rgb(color).brighter(0.66) : color;
}
	
var svg = d3.select("#tree").append("svg")
    .attr("width", '75%')
    .attr("height", '75%')
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
    .append("g")
    .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");
	
function add_missing(d) {
  if (d.children) {
    var sum = 0;
    for (i in d.children) {
      sum += d.children[i].count;
      d.children[i] = add_missing(d.children[i]);
    }
    var diff = d.count - sum;
    if (diff > 0) {
      missing = {"missing": true, "count": diff};
      d.children.push(missing);
    }
  }
  return d;
}

var partition = d3.layout.partition().value(function(d) { return d.count; });

var x = d3.scale.linear().range([0, 2 * Math.PI]);
var y = d3.scale.sqrt().range([0, radius]);

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function find_minmax(node, attr) {
  if (node.children) {
    minmaxs = node.children.map(function (n) { return find_minmax(n, attr); });
    min = Math.min.apply(null, minmaxs.map(function (mm) {return mm.min}));
    max = Math.max.apply(null, minmaxs.map(function (mm) {return mm.max}));
    return {"min": Math.min(min, node[attr]), "max": Math.max(max, node[attr])};
  } else {
    return {"min": node[attr], "max": node[attr]};
  }
}

d3.json("js/tree.json", function(error, root) {
  var model = root;
  var model_type = model.model_fields[root.objective_field].optype == "categorical" ?
               "classification" : "regression";
  var minmaxs = {};
  if (model_type == "classification") {
    minmaxs.confidence = find_minmax(model.root, "confidence");
  } else {
    // Hacky label switch for regression trees
    document.getElementById("cnf").innerHTML = "Expected Error";

    minmaxs.expected_error = find_minmax(model.root, "confidence");
    minmaxs.output = find_minmax(model.root, "output");
  }

  model.root = add_missing(model.root);

  var scale_pred = model_type == "classification" ?
                     d3.scale.category10() :
                     d3.scale.linear().domain([minmaxs.output.min,
                                               minmaxs.output.max])
                                      .range(["#222", "#2ee"]);
  var scale_conf = model_type == "classification" ?
                     d3.scale.linear().domain([minmaxs.confidence.min,
                                               minmaxs.confidence.max])
                                      .range(["#d33", "#3d3"]) :
                     d3.scale.linear().domain([minmaxs.expected_error.max,
                                               minmaxs.expected_error.min])
                                      .range(["#d33", "#3d3"]);
  var scale_split = d3.scale.category20b();

  var color_lookup =
    {"prediction": function(d) {
                     if (d.missing) {
                       return "#d7d7d7";
                     } else {
                       return hover_adjust(d, scale_pred(d.output));
                     }
                   },
     "confidence": function(d) {
                     if (d.missing) {
                       return "#d7d7d7";
                     } else {
                       return hover_adjust(d, scale_conf(d.confidence));
                     }
                   },
     "split": function(d) {
                if (d.missing) {
                  return "#d7d7d7";
                } else {
                  return hover_adjust(d, scale_split(d.predicate.field));
                }
              }
     };

  var color_fn = color_lookup["prediction"];

  var path = svg.selectAll("path")
      .data(partition.nodes(model.root))
      .enter().append("path")
      .attr("d", arc)
      .style("fill", color_fn)
      .style("stroke", "#fff")
      .on("click", click)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  var click_in_progress = false;

  function click(d) {
    mark_hover(d, false);

    click_in_progress = true;
    path.transition().duration(750).style("fill", color_fn).attrTween("d", arcTween(d));
    setTimeout(function() {click_in_progress = false;}, 750);
  }

  d3.selectAll("input").on("change", change);

  function change() {
    color_fn = color_lookup[this.value];
    path.transition().duration(250).style("fill", color_fn);
  }

  function mouseover(d) {
    var split = d.predicate;

    var split_msg;

    if (split.field) {
      if (split.term) {
        if (split.value == 0 && split.operator == "<=") {
          split_msg = model.model_fields[split.field].name +
                        " does not contain '" + split.term + "'";
        } else if (split.value == 0 && split.operator == ">") {
          split_msg = model.model_fields[split.field].name +
                        " contains '" + split.term + "'";
        } else {
          split_msg = model.model_fields[split.field].name + " contains "
                        + "'" + split.term + "'" + " " + split.operator
                        + " " + split.value + " time(s)";
        }
      } else {
       split_msg = model.model_fields[split.field].name + " " +
         split.operator + " " + split.value;
      }
    } else {
      split_msg = "Tree Root";
    }
    var conf_msg = {"classification": "Confidence", "regression": "Expected Error"};

    var hover = d3.select("#hover-info");
    hover.append("div").attr("class", "split-predicate").text(split_msg);
    tbody = hover.append("table").attr("class", "node-info").append("tbody");
    var output = model_type == "classification" ? d.output : parseFloat(d.output.toFixed(3));

    table_add(tbody, "Prediction", output);
    table_add(tbody, conf_msg[model_type], parseFloat(d.confidence.toFixed(3)));
    table_add(tbody, "Count", d.count);

    mark_hover(d, true);
    if (!click_in_progress) {
      path.style("fill", color_fn);
    }

    var summ_doc = d3.select("#summary-info");
    var summaries = summarize(d);
    for (id in summaries) {
      if (!summaries.hasOwnProperty(id)) { continue; }
      var name = model.model_fields[id].name;

      fs = summaries[id];

      if (fs.terms) {
        occurs = {};
        not_occurs = {};
        occurances = {};
        for (term in fs.terms) {
          ts = fs.terms[term];
          ts.toString = function() { return JSON.stringify(this)};
          var to;
          if (occurances[ts]) {
            to = occurances[ts];
          } else {
            to = {};
          }
          to[term] = true;
          occurances[ts] = to;
        }

        for (ts in occurances) {
          msg = name;

          tsp = JSON.parse(ts);
          if (tsp.max == 0) {
            msg += " does not contain [ ";
          } else {
            msg += " contains [ ";
          }

          for (term in occurances[ts]) {
            msg += term + " ";
          }
          msg += "]"

          if (tsp.max != 0 && !(tsp.min == 0 && !isNum(tsp.max))) {
            if (isNum(tsp.min)) {
              msg += " more than " + tsp.min;
            }
            if (isNum(tsp.min) && isNum(tsp.max)) {
              msg += " but";
            }
            if (isNum(tsp.max)) {
              msg += " no more than " + tsp.max;
            }
            msg += " time(s)";
          }

          summ_doc.append("div").text(msg);
        }

      } else {
        var msg = name;

        if (isNum(fs.min)) {
          msg = parseFloat(fs.min.toFixed(3)) + " < " + msg;
        }
        if (isNum(fs.max)) {
          msg += " <= " + parseFloat(fs.max.toFixed(3));
        }
        if (fs.eq) {
          msg += " = " + fs.eq;
        } else if (fs.not_eq) {
          msg += " !=";
          var first = true;
          for (category in fs.not_eq) {
            if (first) {
              first = false;
            } else {
              msg += "|";
            }
            if (!fs.not_eq.hasOwnProperty(category)) { continue; }
            msg += " " + category;
          }
        }
        summ_doc.append("div").text(msg);
      }
    }
  }

  function mouseout(d) {
    d3.select("#hover-info").html("");
    d3.select("#summary-info").html("");
    mark_hover(d, false);
    if (!click_in_progress) {
      path.style("fill", color_fn);
    }
  }

  function mark_hover (d, val) {
    if (d.parent) { mark_hover(d.parent, val); };
    d.hover = val;
  }
});

d3.select(self.frameElement).style("height", height + "px");

function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function summarize (node) {
  var pred = node.predicate;
  if (node.parent) {
    var summary = summarize(node.parent);
    switch(pred.operator) {
      case "<=":
        if (pred.term) {
          if (summary[pred.field]) {
            if (summary[pred.field].terms[pred.term]) {
              var old_max = summary[pred.field].terms[pred.term].max;
              max = isNum(old_max) ? Math.min(pred.value, old_max) : pred.value;
              summary[pred.field].terms[pred.term].max = max;
            } else {
              summary[pred.field].terms[pred.term] = {"max": pred.value};
            }
          } else {
            summary[pred.field] = {};
            terms = {};
            terms[pred.term] = {"max": pred.value};
            summary[pred.field].terms = terms;
          }
        } else {
          if (summary[pred.field]) {
            var old_max = summary[pred.field].max;
            max = isNum(old_max) ? Math.min(pred.value, old_max) : pred.value;
            summary[pred.field].max = max;
          } else {
            terms = {};
            terms[pred.term] = {"max": pred.value};
            summary[pred.field] = {"max": pred.value};
          }
        }
        break;
      case ">":
        if (pred.term) {
          if (summary[pred.field]) {
            if (summary[pred.field].terms[pred.term]) {
              var old_min = summary[pred.field].terms[pred.term].min;
              min = isNum(old_min) ? Math.max(pred.value, old_min) : pred.value;
              summary[pred.field].terms[pred.term].min = min;
            } else {
              summary[pred.field].terms[pred.term] = {"min": pred.value};
            }
          } else {
            summary[pred.field] = {};
            terms = {};
            terms[pred.term] = {"min": pred.value};
            summary[pred.field].terms = terms;
          }
        } else {
          if (summary[pred.field]) {
            var old_min = summary[pred.field].min;
            min = isNum(old_min) ? Math.max(pred.value, old_min) : pred.value;
            summary[pred.field].min = min;
          } else {
            summary[pred.field] = {"min": pred.value};
          }
        }
        break;
      case "=":
        summary[pred.field] = {"eq": pred.value};
        break;
      case "!=":
        if (!summary[pred.field]) {
          summary[pred.field] = {};
        }
        if (!summary[pred.field].not_eq) {
          summary[pred.field].not_eq = {};
        }
        summary[pred.field].not_eq[pred.value] = true;
        break;
    }
    return summary;
  } else {
    return {};
  }
}

function table_add (table, field, val) {
  var row = table.append("tr");
  row.append("td").text(field);
  row.append("td").text(val);
  return row;
}