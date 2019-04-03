var container;
var zoom;
var rootData;
var depthInfo;
var companyData;
var judicialList = [];

$(document).ready(function() {
    resizeScreen();
    getData();
    selectChange();
});

window.onresize = function() {
    resizeScreen();
};

function changeScreen(dom) {
    if (!isFullScreen()) {
        $(dom).html('<span class="screened"></span>退出');
        launchFullScreen($('#screenArea')[0]);
    } else {
        $(dom).html('<span class="screen"></span>全屏');
        exitFullScreen();
    }
}

function selectChange() {
    $("#mao-select").on("change",
    function() {
        traverseLevel(rootData, $(this).val(), 2);
        drawTree(rootData);
    });

    $("#mao-select-gudong").on("change",
    function() {
        traverseLevel(rootData, $(this).val(), 3);
        drawTree(rootData);
    });

    $("#mao-select-juedui li").on("click",
    function() {
        if ($(this).val() == 1) {
            var companyDataTemp = JSON.parse(JSON.stringify(companyData));
            for (var k = 0; k < 2; k++) {
                var children = companyDataTemp.Result.Node.children[k].children;
                for (var i = 0; i < children.length; i++) {
                    if (! (children[i].FundedRate2 >= 67)) {
                        children.splice(i, 1);
                        i--;
                    }
                }
            }
            rootData = companyDataTemp.Result.Node;
        } else if ($(this).val() == 2) {
            var companyDataTemp = JSON.parse(JSON.stringify(companyData));
            for (var k = 0; k < 2; k++) {
                var children = companyDataTemp.Result.Node.children[k].children;
                for (var i = 0; i < children.length; i++) {
                    if (! (children[i].FundedRate2 < 67 && children[i].FundedRate2 >= 50)) {
                        children.splice(i, 1);
                        i--;
                    }
                }
            }
            rootData = companyDataTemp.Result.Node;
        } else if ($(this).val() == 3) {
            var companyDataTemp = JSON.parse(JSON.stringify(companyData));
            for (var k = 0; k < 2; k++) {
                var children = companyDataTemp.Result.Node.children[k].children;
                for (var i = 0; i < children.length; i++) {
                    if (! (children[i].FundedRate2 < 50)) {
                        children.splice(i, 1);
                        i--;
                    }
                }
            }
            rootData = companyDataTemp.Result.Node;
        } else {
            var companyDataTemp = JSON.parse(JSON.stringify(companyData));
            rootData = companyDataTemp.Result.Node;
        }
        traverseTreeId(rootData);
        draw(rootData);
        maoRefresh();
    });
};

var cloneObj = function(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj),
        /*序列化对象*/
        newobj = JSON.parse(str);
        /*还原*/
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};

function getData() {
    $('#load_data').show();
    companyData = {
        "judicialList": [{
            "companyName": "◎◎◎◎◎◎◎◎◎文化有限公司",
            "count": 12,
            "level": 2,
            "score": 27.0
        },
        {
            "companyName": "◎◎◎◎◎有限公司",
            "count": 51,
            "level": 3,
            "score": 595.0
        },
        {
            "companyName": "◎◎◎◎◎◎◎◎◎◎◎◎有限公司",
            "count": 211,
            "level": 3,
            "score": 3555.0
        },
        {
            "companyName": "◎◎◎◎◎◎◎◎◎有限公司",
            "count": 51,
            "level": 0,
            "score": 1.0
        },
        {
            "companyName": "◎◎◎◎◎信息技术有限公司",
            "count": 2572,
            "level": 3,
            "score": 186.0
        },
        {
            "companyName": "◎◎◎◎◎◎技术有限责任公司",
            "count": 2,
            "level": 2,
            "score": 24.0
        },
        {
            "companyName": "◎◎◎◎◎◎◎◎有限公司",
            "count": 4,
            "level": 0,
            "score": 0.0
        },
        {
            "companyName": "◎◎◎◎◎◎◎◎◎文化传媒有限公司",
            "count": 7,
            "level": 2,
            "score": 38.0
        }],
        "Result": {
            "Node": {
                "Category": 1,
                "children": [{
                    "Category": 2,
                    "children": [{
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "15.00%",
                        "Level": 1,
                        "FundedRate2": 15.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎科技有限公司",
                        "FundedRate": "13.33%",
                        "Level": 1,
                        "FundedRate2": 13.33
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "40.31%",
                        "Level": 1,
                        "FundedRate2": 40.31
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎文化传媒有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎有限公司",
                        "FundedRate": "50.00%",
                        "Level": 1,
                        "FundedRate2": 50.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎文化传媒有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎信息技术有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎技术有限责任公司",
                        "FundedRate": "16.89%",
                        "Level": 1,
                        "FundedRate2": 16.89
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "51.00%",
                        "Level": 1,
                        "FundedRate2": 51.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎信息技术有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎科技有限公司",
                        "FundedRate": "9.00%",
                        "Level": 1,
                        "FundedRate2": 9.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎信息技术有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎◎◎◎有限公司",
                        "FundedRate": "6.47%",
                        "Level": 1,
                        "FundedRate2": 6.47
                    },
                    {
                        "invType": 1,
                        "Category": 2,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎◎文化有限公司",
                        "FundedRate": "100.00%",
                        "Level": 1,
                        "FundedRate2": 100.0
                    }],
                    "name": "对外投资",
                    "Level": 0
                },
                {
                    "Category": 3,
                    "children": [{
                        "invType": 1,
                        "Category": 3,
                        "children": [],
                        "name": "◎◎◎◎◎◎◎◎管理有限公司",
                        "FundedRate": "60.17%",
                        "Level": 1,
                        "FundedRate2": 60.17
                    },
                    {
                        "invType": 0,
                        "Category": 3,
                        "children": [],
                        "name": "贾◎◎",
                        "FundedRate": "32.06%",
                        "Level": 1,
                        "FundedRate2": 32.06
                    },
                    {
                        "invType": 0,
                        "Category": 3,
                        "children": [],
                        "name": "刘◎",
                        "FundedRate": "2.88%",
                        "Level": 1,
                        "FundedRate2": 2.88
                    },
                    {
                        "invType": 0,
                        "Category": 3,
                        "children": [],
                        "name": "贾◎◎",
                        "FundedRate": "2.07%",
                        "Level": 1,
                        "FundedRate2": 2.07
                    },
                    {
                        "invType": 0,
                        "Category": 3,
                        "children": [],
                        "name": "曹◎",
                        "FundedRate": "1.52%",
                        "Level": 1,
                        "FundedRate2": 1.52
                    },
                    {
                        "invType": 1,
                        "Category": 3,
                        "children": [],
                        "name": "◎◎◎◎◎◎管理有限责任公司",
                        "FundedRate": "1.31%",
                        "Level": 1,
                        "FundedRate2": 1.31
                    }],
                    "name": "股东",
                    "Level": 0
                }],
                "name": "◎◎◎◎◎◎◎◎◎股份有限公司",
                "Level": 0
            }
        }
    };
    judicialList = companyData.judicialList;
    $('#load_data').hide();
    $('#no_data').hide();
    var companyDataTemp = JSON.parse(JSON.stringify(companyData));
    rootData = companyDataTemp.Result.Node;
    traverseTreeId(rootData);
    draw(rootData);
}

function maoRefresh() {
    draw(rootData);
}

function draw(root) {
    tree = d3.layout.cluster().size([360, 600]).separation(function(a, b) {
        return (a.parent == b.parent ? 2 : 3) / a.depth;
    });
    $("#main").empty();
    svg = d3.select("#main").append("svg").attr("xmlns", "http://www.w3.org/2000/svg");
    svg.empty();
    d3.select('svg').attr('width', $('#main').width());
    d3.select('svg').attr('height', $('#main').height());
    container = svg.append("g");
    linkContainer = container.append("g");

    zoom = d3.behavior.zoom().scaleExtent([0.2, 2]).on("zoom", zoomed);
    svg.call(zoom);
    initLocation();

    function zoomed() {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    function initLocation() {
        zoom.translate([svg.attr('width') / 2, svg.attr('height') / 2]);
        zoom.scale(0.7);
        container.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")");
    }

    nodes = tree.nodes(rootData);
    links = tree.links(nodes);
    nodes.forEach(function(d) {
        if (d.depth > 1) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            }
        }
    });
    root.x0 = 0;
    root.y0 = 0;
    drawTree(root);
}

function drawTree(data) {
    var diagonal = d3.svg.diagonal.radial().projection(function(d) {
        return [d.y, d.x / 180 * Math.PI];
    });

    nodes = tree.nodes(rootData);
    links = tree.links(nodes);

    depthInfo = [];
    nodes.forEach(function(d) {
        if (depthInfo[d.depth]) {
            depthInfo[d.depth].count++;
        } else {
            depthInfo[d.depth] = {
                count: 1
            };
        }
    });
    baseLength = 135;
    if (nodes.length > 100 && nodes.length <= 500) {
        baseLength = 200;
    } else if (nodes.length > 500 && nodes.length <= 1000) {
        baseLength = 350;
    } else if (nodes.length > 1000) {
        baseLength = 500;
    }
    nodes.forEach(function(d) {
        if (d.depth <= 2) {
            d.y = d.depth * baseLength;
        } else if (d.depth == 3) {
            d.y = depthInfo[d.depth - 1].pathLength + baseLength * 2;
        } else if (d.depth == 4) {
            d.y = depthInfo[d.depth - 1].pathLength + baseLength * 2;
        } else if (d.depth == 5) {
            d.y = depthInfo[d.depth - 1].pathLength + baseLength * 2;
        }
        depthInfo[d.depth].pathLength = d.y;
    });

    var linkUpdate = linkContainer.selectAll(".link").data(links,
    function(d) {
        return d.target.id;
    });
    var linkEnter = linkUpdate.enter();
    var linkExit = linkUpdate.exit();

    linkEnter.append("path").attr("class", "link").attr("d",
    function(d) {
        var o = {
            x: data.x0,
            y: data.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    }).transition().duration(500).attr("d", diagonal);

    linkUpdate.attr("stroke",
    function(d) {
        if (d.source.Category == 2 || d.target.Category == 2) {
            return "#0054ff";
        }
        if (d.source.Category == 3 || d.target.Category == 3) {
            return "#29cee1";
        }
        if (d.source.Category == 4 || d.target.Category == 4) {
            return "#65d289";
        }
        if (d.source.Category == 5 || d.target.Category == 5) {
            return "#bd73e7";
        }
        if (d.source.Category == 6 || d.target.Category == 6) {
            return "#ee7698";
        }
        if (d.source.Category == 7 || d.target.Category == 7) {
            return "#f59c28";
        }
        if (d.source.Category == 8 || d.target.Category == 8) {
            return "#79a3f1";
        }
        if (d.source.Category == 9 || d.target.Category == 9) {
            return "#3dc9f7";
        }
        return "#f35151";
    }).transition().duration(500).attr("d", diagonal).attr("style", "fill: none; stroke-opacity: 1; stroke: #9ecae1; stroke-width: 1px;");

    linkExit.transition().duration(500).attr("d",
    function(d) {
        var o = {
            x: data.x,
            y: data.y
        };
        return diagonal({
            source: o,
            target: o
        });
    }).remove();

    var nodeUpdate = container.selectAll(".node").data(nodes,
    function(d) {
        return d.id;
    });
    var nodeEnter = nodeUpdate.enter();
    var nodeExit = nodeUpdate.exit();
    var enterNodes = nodeEnter.append("g").attr("class",
    function(d) {
        return "node";
    }).attr("transform",
    function(d) {
        return "translate(" + project(data.x0, data.y0) + ")";
    });
    enterNodes.append("circle").attr("r", 8).attr("fill",
    function(d) {
        if (d.Category == 1) {
            return "#be34fc";
        }
        for (var e = 0; e < judicialList.length; e++) {
            if (d.name == judicialList[e].companyName && (judicialList[e].score == -1 || judicialList[e].level == 3)) {
                return "red";
            }
        }
        if (d.Category == 2) {
            return "#0054ff";
        }
        if (d.Category == 3) {
            /*判断股东是否是自然人股东*/
            if (d.depth == 2 && d.Category == 3 && d.invType == 0) {
                return "#fff";
            }
            return "#29cee1";
        }
        if (d.Category == 4) {
            return "#65d289";
        }
        if (d.Category == 5) {
            return "#bd73e7";
        }
        if (d.Category == 6) {
            return "#ee7698";
        }
        if (d.Category == 7) {
            return "#f59c28";
        }
        if (d.Category == 8) {
            return "#79a3f1";
        }
        if (d.Category == 9) {
            return "#3dc9f7";
        }
        return "#be34fc";
    }).attr("stroke",
    function(d) {
        if (d.depth == 0) {
            return "#be34fc";
        }
        if (d.depth == 1) {
            if (d.Category == 1) {
                return "#be34fc";
            }
            if (d.Category == 2) {
                return "#0054ff";
            }
            if (d.Category == 3) {
                return "#29cee1";
            }
            if (d.Category == 4) {
                return "#65d289";
            }
            if (d.Category == 5) {
                return "#bd73e7";
            }
            if (d.Category == 6) {
                return "#ee7698";
            }
            if (d.Category == 7) {
                return "#f59c28";
            }
            if (d.Category == 8) {
                return "#79a3f1";
            }
            if (d.Category == 9) {
                return "#3dc9f7";
            }
        }
        if (d.depth == 2) {
            /*判断股东是否是自然人股东*/
            if (d.Category == 3 && d.invType == 0) {
                return "#29cee1";
            }
        }
        return null;
    }).attr("stroke-opacity",
    function(d) {
        /*判断股东是否是自然人股东*/
        if (d.Category == 3 && d.invType == 0) {
            return 1;
        }
        return 0.5;
    }).attr("stroke-width",
    function(d) {
        if (d.depth == 0) {
            return 10;
        }
        if (d.depth == 1) {
            return 6;
        }
        return 2;
    }).on("click",
    function(d) {
        if (d.depth > 0) {
            toggle(d);
            drawTree(d);
        }
    });

    enterNodes.append("path").attr("d",
    function(d) {
        if (d.depth > 0 && d._children) {
            return "M-6 -1 H-1 V-6 H1 V-1 H6 V1 H1 V6 H-1 V1 H-6 Z"
        } else if (d.depth > 0 && d.children) {
            return "M-6 -1 H6 V1 H-6 Z"
        }
    }).attr("fill", "#ffffff").attr("stroke", "#ffffff").attr("stroke-width", "0.2").on("click",
    function(d) {
        if (d.depth > 0) {
            toggle(d);
            drawTree(d);
        }
    });
    enterNodes.append("text").attr("dy",
    function(d) {
        if (d.depth == 0) {
            return "-1.5em";
        }
        return "0.31em";
    }).attr("x",
    function(d) {
        if (d.depth == 0) {
            return d.name.length * 8
        }
        return d.x < 180 ? 15 : -15;
    }).text(function(d) {
        return d.name;
    }).style("text-anchor",
    function(d) {
        if (d.depth == 0) {
            return "end";
        }
        return d.x < 180 ? "start": "end";
    }).style("fill-opacity", 0).attr("transform",
    function(d) {
        if (d.depth > 0) {
            return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        } else {
            return "rotate(0)";
        }
    }).style("font-size",
    function(d) {
        if (d.depth == 0) {
            return "20px";
        }
        return "18px";
    }).style("font-weight",
    function(d) {
        if (d.depth == 0) {
            return 800;
        }
        if (d.depth == 1) {
            if (d.Category == 2) {
                return 800;
            }

            if (d.Category == 3) {
                return 800;
            }
        }
        return 400;
    }).attr("fill",
    function(d) {
        if (d.depth == 0) {
            return "#be34fc";
        }
        if (d.depth == 1) {
            if (d.Category == 2) {
                return "#0054ff";
            }

            if (d.Category == 3) {
                return "#29cee1";
            }
        }
        return "#333";
    }).attr("onclick",
    function(d) {
        if (d.depth != 0 && d.depth != 1 && d.invType == 1) {
            return "nextReport('" + d.name + "');";
        }
    }).style("cursor",
    function(d) {
        if (d.depth != 0 && d.depth != 1 && d.invType == 1) {
            return "pointer";
        }
    });
    enterNodes.append("text").attr("x",
    function(d) {
        return d.x < 180 ? -8 : 8;
    }).attr("y", "6").text(function(d) {
        for (var e = 0; e < judicialList.length; e++) {
            if (d.name == judicialList[e].companyName && (judicialList[e].score == -1 || judicialList[e].level == 3)) {
                return "高";
            }
        }
    }).style("text-anchor",
    function(d) {
        if (d.depth == 0) {
            return "end";
        }
        return d.x < 180 ? "start": "end";
    }).attr("transform",
    function(d) {
        if (d.depth > 0) {
            return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        } else {
            return "rotate(0)";
        }
    }).style("font-size", "16px").style("font-weight", "800").attr("fill", "#fff").attr("onmouseover",
    function(d) {
        for (var e = 0; e < judicialList.length; e++) {
            if (d.name == judicialList[e].companyName) {
                return "tipclick(this," + judicialList[e].count + ")";
            }
        }
    }).attr("onmouseout", "closeTipclick()");
    enterNodes.append("text").attr("class", "stock-percent").attr("dy",
    function(d) {
        return "-0em";
    }).attr("x",
    function(d) {
        var x = 80;
        if (d.FundedRate) {
            x = 6 * d.FundedRate.toString().length + 20;
        }
        return d.x < 180 ? -x: x;
    }).text(function(d) {
        return d.FundedRate;
    }).style("text-anchor",
    function(d) {
        if (d.depth == 0) {
            return "end";
        }
        return d.x < 180 ? "start": "end";
    }).style("fill-opacity", 0).attr("transform",
    function(d) {
        if (d.depth > 0) {
            return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        } else {
            return "rotate(0)";
        }
    }).style("font-size",
    function(d) {
        return "12px";
    }).attr("fill",
    function(d) {
        return "#333";
    });

    var updateNodes = nodeUpdate.transition().duration(500).attr("transform",
    function(d) {
        return "translate(" + project(d.x, d.y) + ")";
    });
    updateNodes.select("text").style("fill-opacity", 1).attr("transform",
    function(d) {
        if (d.depth > 0) {
            return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        } else {
            return "rotate(0)";
        }
    }).attr("x",
    function(d) {
        if (d.depth == 0) {
            return d.name.length * 8
        }
        return d.x < 180 ? 15 : -15;
    }).attr("fill",
    function(d) {
        if (d.depth == 0) {
            return "#be34fc";
        }
        if (d.depth == 1) {
            if (d.Category == 2) {
                return "#0054ff";
            }

            if (d.Category == 3) {
                return "#29cee1";
            }
        }
        if (d.depth != 0 && d.depth != 1 && d.invType == 1) {
            return "#1366b1";
        }
        return "#333";
    }).style("text-anchor",
    function(d) {
        if (d.depth == 0) {
            return "end";
        }
        return d.x < 180 ? "start": "end";
    });

    updateNodes.select(".stock-percent").style("fill-opacity", 1).attr("transform",
    function(d) {
        if (d.depth > 0) {
            return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        } else {
            return "rotate(0)";
        }
    }).attr("x",
    function(d) {
        var x = 80;
        if (d.FundedRate) {
            x = 6 * d.FundedRate.toString().length + 20;
        }
        return d.x < 180 ? -x: x;
    }).attr("fill",
    function(d) {
        return "#be34fc";
    }).style("text-anchor",
    function(d) {
        if (d.depth == 0) {
            return "end";
        }
        return d.x < 180 ? "start": "end";
    });

    updateNodes.select("circle").attr("r",
    function(d) {
        if (d.depth == 0) {
            return 12;
        }
        if (d.depth == 1) {
            return 10;
        }
        for (var e = 0; e < judicialList.length; e++) {
            if (d.name == judicialList[e].companyName && (judicialList[e].score == -1 || judicialList[e].level == 3)) {
                return 15;
            }
        }
        return 9;
    });
    updateNodes.select("path").attr("d",
    function(d) {
        if (d.depth > 0 && d._children) {
            return "M-6 -1 H-1 V-6 H1 V-1 H6 V1 H1 V6 H-1 V1 H-6 Z"
        } else if (d.depth > 0 && d.children) {
            return "M-6 -1 H6 V1 H-6 Z"
        }
    });

    var exitNodes = nodeExit.transition().duration(500).attr("transform",
    function(d) {
        return "translate(" + project(data.x, data.y) + ")";
    }).remove();
    exitNodes.select("circle").attr("r", 0);

    exitNodes.select("text").style("fill-opacity", 0);

    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

}

function toggle(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
}

function project(x, y) {
    var angle = (x - 90) / 180 * Math.PI,
    radius = y;
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

function drawLegend(svg) {
    var legendGudong = svg.append('g').attr("transform", "translate(" + ($(window).width() - 275) + ",80)");
    legendGudong.append('rect').attr("width", "14").attr("height", "14").attr("rx", "3").attr("ry", "3").attr("y", "6").attr('fill', "#4aceb1").attr("z-index", "10");
    legendGudong.append('text').attr("x", '20').attr("y", "18").text("对外投资").attr("font-size", "16px");

    var legendTouzi = svg.append("g").attr("transform", "translate(" + ($(window).width() - 275) + ",100)");
    legendTouzi.append('rect').attr("width", "14").attr("height", "14").attr("rx", "3").attr("ry", "3").attr("y", "6").attr('fill', "#7985f3");
    legendTouzi.append('text').attr("x", "20").attr("y", "18").text("股东").attr("font-size", "16px");
}

function traverseTree(node) {
    if (node._children) {
        node.children = node._children;
        node._children = null;
    }

    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            traverseTree(node.children[i]);
        }
    }
}

function traverseTreeId(node) {
    var id = 1;
    trId(node);
    function trId(node) {
        if (!node.id) {
            node.id = id;
            id++;
        }
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                trId(node.children[i]);
            }
        }
    }
}

function traverseLevel(node, level, type) {
    /*type=2投资, =3股东*/
    if (node.depth <= level) {
        if (node.Category == type) {
            if (node._children) {
                node.children = node._children;
                node._children = null;
            }
        }
    } else {
        if (node.Category == type) {
            if (node.children) {
                node._children = node.children;
                node.children = null;
            }
        }
    }

    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            traverseLevel(node.children[i], level, type);
        }
    }

    if (node._children) {
        for (var i = 0; i < node._children.length; i++) {
            traverseLevel(node._children[i], level, type);
        }
    }
}

function resizeScreen() {
    if (document.body.clientHeight > 700) {
        $('#screenArea').height(document.body.clientHeight - 66);
    } else {
        $('#screenArea').height(740);
    }
}

var larerTips;
function tipclick(evt, count) {
    larerTips = layer.tips('<div id="red">风险高<br/>涉案数：' + count, evt, {
        tips: [2, '#f6f2f2'],
        time: 3000
    });

}

function closeTipclick() {
    layer.close(larerTips);
}