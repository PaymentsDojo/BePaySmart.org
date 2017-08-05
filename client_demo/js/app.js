(function() {

    //Varibles to keep track of everything
    var spinner;
    var node;
    var transferInProgress;
    var currentDataId;
    var currentAddressBalances;
    var transactionSource;
    var transactionTarget;
    var dimensions = [$("#d3Nodes").width(), $("#d3Nodes").height()];

    $(document).ready(function() {
        //Put up loading icon
        var opts = {lines:13,length:28,width:14,radius:42,scale:1,corners:1,color:'#000',opacity:0.25,rotate:0,direction:1,speed:1,trail:60,fps:20,zIndex:2e9,className:'spinner',top:'50%',left:'50%',shadow:false,hwaccel:false,position:'absolute'}
        spinner = new Spinner(opts).spin(document.body);


        //Load graph for the first time
        loadGraph();

        //Modal button click handlers
        $("#giveAssetButton").click(function(e) {
            $("#assetModal").modal("toggle");
            //Load existing assets
            $.getJSON("/api/getAssets", function(assets) {
                console.log(assets);
                $("#assetSelector").empty();

                var options = $("#assetSelector");
                $.each(assets, function() {
                    options.append($("<option />").val(this.name).text(this.name));
                });
            });
        });

        $("#giveAssetActionButton").click(function(e) {
            var assetName = $("input[name=assetType]:checked").val() == "existing" ? $("#assetSelector").val() : $("#newAssetName").val();
            $.get("/api/issueAsset/" + assetName + "/" + $("#newAssetQuan").val() + "/" + currentDataId, function(id) {
                console.log(id);
                $("#assetModal").modal("toggle");
                $("#myModal").modal("toggle");
            });
        });

        $("#newAddressButton").click(function(e) {
            $.getJSON("/api/newAddr", function(address) {
                //Reload graph
                loadGraph();
            });
        });

        //Transfer button
        $("#transferButton").click(function(e) {

            $("#myModal").modal("toggle");

            //Start transfer
            //Id should be already saved, so just a flag
            transferInProgress = true;
            //REMEMBER TO SET THAT TO FALSE LATER!!

            $("#overlay h1").text("Choose address to transfer to");

            //Set source node to green
            $("svg circle[data-id=" + currentDataId + "]").attr("fill", "green");

            //Reset click event
            node.on("dblclick", function(e) {
                if (!(currentDataId == $(this).attr("data-id"))) {
                    doTransfer(currentDataId, $(this).attr("data-id"));
                }
            });
        });

        //Transfer window handlers
        $("#transferAssetSelector").change(function(e) {
            var currentVal = $("#transferAssetSelector").val();
            $("#transferMax").text(currentAddressBalances.filter(function(b) {
                return b.name == currentVal;
            })[0].qty);

            $("#transferQty").attr("max", currentAddressBalances.filter(function(b) {
                return b.name == currentVal;
            })[0].qty);
        });

        $("#transferForm").submit(function(e) {
            e.preventDefault();

            //Yay! Now we have everything we need
            //Lets transfer this asset!
            $.get("/api/transfer/" + transactionSource + "/" + transactionTarget + "/" + $("#transferAssetSelector").val() + "/" + $("#transferQty").val(), function(txid) {
                //Hide modal once done
                $("#transferModal").modal("toggle");
            });
        });

        $("#changeFriendlyName").click( function () {
           $.get("/api/setFriendlyName/" + currentDataId + "/" + encodeURIComponent(prompt("New name:"))); 
           $("#myModal").modal("toggle");
        });

    });


    //Util functions

    function setPopoverTimeout(element){
        setTimeout(function () {
            console.log(element.is(":hover"))
            if(element.is(":hover")){
                //Show popover window
                getCurrentElementBalancesHtml(element.attr("data-id"),function (a) {
                    //element.popover("destory");
                    element.popover({title:"Balances", content:a, container:"body",html:true});

                    element.data('bs.popover').options.content = a;

                    element.popover("toggle");
                })
                
            }
        },1000);
    }


    function getCurrentElementBalancesHtml(id,cb) {
        $.getJSON("/api/getAddressBalances/" + id, function(balances) {
            $("#balTable table").empty();
            balances.forEach(function(balance) {
                var newRow = $("<tr></tr>");
                $("<td></td>").text(balance.name).appendTo(newRow);
                $("<td></td>").text(balance.qty).appendTo(newRow);
                $("#balTable table").append(newRow);

                return cb("<table class='table'>" + $("#balTable table").html() + "</table>");
            });
        });

    }

    window.loadGraph = function () {

        //Get nodes
        $.getJSON("/api/listAddresses", function(nodes) {
            var links = processLinks(linkNodes(nodes), nodes);
            console.log(links);

            var nodes = processNodes(nodes);

            spinner.stop();

            //Make svg
            $("#d3Nodes").empty();
            var svg = d3.select("#d3Nodes")
                .append("svg")
                .attr("width", $("#d3Nodes").width())
                .attr("height", $("#d3Nodes").height());

            //Make graph
            var force = d3.layout.force()
                .size([$("#d3Nodes").width(), $("#d3Nodes").height()])
                .nodes(nodes)
                .links(links)
                .linkDistance(300)
                .charge(-100);

            node = svg.selectAll("circle")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("r", 20)
                .attr("fill", "#1f77b4")
                .attr("data-id", function(d) {
                    return d.name;
                })
                .on("mouseover", function(e) {  
                    var name = $(this).attr("data-id");

                    $.getJSON("/api/getAddressFriendlyName/" + $(this).attr("data-id"), function (a) {
                        $("#overlay h1").text(a || name);
                     } );                    

                    if (!(transferInProgress && currentDataId == $(this).attr("data-id"))) {
                        $(this).attr("fill", "red")
                    }

                    setPopoverTimeout($(this))
                })
                .on("mouseout", function(e) {
                    $("#overlay h1").text("");

                    $(this).popover("hide");

                    if (!(transferInProgress && currentDataId == $(this).attr("data-id"))) {
                        $(this).attr("fill", "#1f77b4")
                    }
                })
                .on("dblclick", nodeNormalClick)
                .call(force.drag);

            var link = svg.selectAll("line")
                .data(links)
                .enter()
                .append("line")
                .attr("stroke", "#ccc");

            force.start();
            
            force.on("tick", function() {

            node.attr("cx", function(d) {
                return d.x = Math.max(20, Math.min(dimensions[0] - 20, d.x));
            })
            .attr("cy", function(d) {
                return d.y = Math.max(20, Math.min(dimensions[1] - 20, d.y));
            });

                link.attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });
            });

        });

    }


    //Linking algorithm: Links all nodes in an array together
    function linkNodes(nodes) {
        var nodesCopy = nodes.slice(0);
        var outArray = [];
        nodes.forEach(function(node) {
            var currentNode = nodesCopy.shift();
            nodesCopy.forEach(function(nodeCopy) {
                outArray.push({
                    "source": currentNode,
                    "target": nodeCopy
                });
            });
        });
        return outArray;
    };

    //Turn array into something we can use in a force layout
    function processNodes(nodes) {
        var out = [];
        nodes.forEach(function(node) {
            out.push({
                name: node
            });
        });
        return out;
    }

    function processLinks(links, nodes) {
        var out = [];
        links.forEach(function(link) {
            out.push({
                source: nodes.indexOf(link.source),
                target: nodes.indexOf(link.target)
            });
        });
        return out;
    };

    function nodeNormalClick(e) {

        currentDataId = $(this).attr("data-id");

        $("#nodeId").text($(this).attr("data-id"));

        $("#nodeName").text("");

        $.getJSON("/api/getAddressFriendlyName/" + $(this).attr("data-id"), function (a) {
                
                if(a != ""){
                    $("#nodeName").text(a);
                }

                $("#nodeId").text("(" + $("#nodeId").text() + ")");
        } );


        $("#myModal").modal("toggle");

        $("#balTable table").empty();
        $("#balTable table").append("<tr><th>Asset name</th><th>Quantity</th></tr>")

        $.getJSON("/api/getAddressBalances/" + $(this).attr("data-id"), function(balances) {
            balances.forEach(function(balance) {
                var newRow = $("<tr></tr>");
                $("<td></td>").text(balance.name).appendTo(newRow);
                $("<td></td>").text(balance.qty).appendTo(newRow);
                $("#balTable table").append(newRow);
            });
        });

    }

    function doTransfer(source, target) {

        //Set vars 
        transactionSource = source;
        transactionTarget = target;

        //Open transfer window		
        $.getJSON("/api/getAddressBalances/" + source, function(balances) {
            currentAddressBalances = balances;
            if (balances.length == 0) {
                alert("Nothing to transfer");
                return;
            }
            var options = $("#transferAssetSelector");
            $.each(balances, function() {
                options.append($("<option />").val(this.name).text(this.name));
            });

            var currentVal = $("#transferAssetSelector").val();
            $("#transferMax").text(currentAddressBalances.filter(function(b) {
                return b.name == currentVal;
            })[0].qty);

            $("#transferQty").attr("max", currentAddressBalances.filter(function(b) {
                return b.name == currentVal;
            })[0].qty);

            $("#transferModal").modal("toggle");
        });

        //Reset back to normal
        transferInProgress = false;
        $("svg circle[data-id=" + currentDataId + "]").attr("fill", "#1f77b4");
        node.on("dblclick", nodeNormalClick);
    }
})()