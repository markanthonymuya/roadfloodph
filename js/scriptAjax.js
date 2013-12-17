var currentWaterLevel = 0;

$(document).ready(function () {
    var lastIndexLastRow = 0;
    var becomesOffline = false;
    var unitNames = {};
    var currentData = {};
    var unitLocationDetails = {};
    var currentLocationSelected = 3;

    var getUnitLocation = function() {
        $.post("http://roadfloodph.cloudapp.net/roadfloodph/getUnitLocation.php", function (json) {
            unitLocationDetails = json;
           /* console.log(unitLocationDetails);
            console.log(currentLocationSelected);
            console.log(unitLocationDetails["unitBarangay" + currentLocationSelected]);*/
            if (unitLocationDetails["unitStatus" + currentLocationSelected] != undefined || unitLocationDetails["unitStatus" + currentLocationSelected] != null || unitLocationDetails["unitStatus" + currentLocationSelected] != "") {
                $("#unitLocation").text(" " + unitLocationDetails["unitBarangay" + currentLocationSelected] + " " + unitLocationDetails["unitCity" + currentLocationSelected]);
                $("#unitRegion").text(" " + unitLocationDetails["unitRegion" + currentLocationSelected]);
                $("#unitStatus").text(" " + unitLocationDetails["unitStatus" + currentLocationSelected]);
                checkVehiclePassability();
            }
            else {
                getUnitLocation();
            }
        });
    }

    var getUpdatedData = function(){

        $.post("http://roadfloodph.cloudapp.net/roadfloodph/selectAllData.php", function (json) {
            currentData = json;
            //console.log(currentData);

            $.post("http://roadfloodph.cloudapp.net/roadfloodph/getUnitNames.php", function (json) {
                unitNames = json;
                $(".onProgress").hide();
                $("#unitName").text(unitNames["unitName" + currentLocationSelected]);

                $(".unitOptions").remove();
                for (var i = 1; i <= json['generalCounter']; i++) {
                    $("#selectButton").append("<option class='unitOptions' value=" + i + ">" + json['unitName' + i] + "</option>");
                }
                $("#selectButton").val(currentLocationSelected);
                $("#unitName").text(unitNames["unitName" + currentLocationSelected]);
            });

            currentWaterLevel = json['roadFloodLevel' + currentLocationSelected];
            $("#updateAsOf").text(json["asOf" + currentLocationSelected]);

            //for body pane
            if (currentWaterLevel != undefined || currentWaterLevel != null || currentWaterLevel != "") {
                if (currentWaterLevel == 0) {
                    $("#bodyWaves").attr("style", "height: 0px; width: 250px; top: -20px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "/assets/gif/happy.gif");
                }
                else if (currentWaterLevel > 0 && currentWaterLevel <=3) {
                    var floodLevelInPixel = currentWaterLevel * 11;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "/assets/gif/happy.gif");
                }
                else if (currentWaterLevel > 3  && currentWaterLevel <= 10) {
                    if(currentWaterLevel == 8){
                      //  $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is GUTTER DEEP (8 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is GUTTER DEEP (8 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 10){
                      //  $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF KNEE DEEP (10 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF KNEE DEEP (10 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 8;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "/assets/gif/sad.gif");
                }
                else if (currentWaterLevel > 10 && currentWaterLevel <= 19) {
                    if(currentWaterLevel == 12){
                       // $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (12 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (12 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 18){
                        //$.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all MEDIUM vehicles (18 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                        //console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (18 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    
                    if(currentWaterLevel == 13){
                       // $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (13 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (13 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 19){
                       // $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (19 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (19 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 6.11;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "/assets/gif/sad.gif");
                }
                else if (currentWaterLevel > 19 && currentWaterLevel <= 37) {
                    if(currentWaterLevel == 36){
                        //$.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to ALL TYPES of vehicles (36 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (36 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }

                    if(currentWaterLevel == 26){
                     //   $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is TIRE DEEP (26 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                     //   console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is TIRE DEEP (26 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 37){
                       // $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is WAIST DEEP (37 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is WAIST DEEP (37 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 4.70;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "/assets/gif/straight.gif");
                }
                else if (currentWaterLevel > 37 && currentWaterLevel <= 45) {
                    if(currentWaterLevel == 45){
                     //   $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is CHEST DEEP (45 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is CHEST DEEP (45 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 5.16;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "/assets/gif/nervous.gif");
                }
                else if (currentWaterLevel > 45 && currentWaterLevel <= 60) {
                    var floodLevelInPixel = currentWaterLevel * 5.92;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "/assets/gif/nervous.gif");
                }

                //for gauge pane
                var floodLevelInPixel = currentWaterLevel * 6.8;
                if (currentWaterLevel == 0) {
                    $("#gaugeWaves").attr("style", "height: 0px; width: 250px; top: -20px; position: relative; left: 0px;");
                }
                else {
                    $("#gaugeWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                }

                getUnitLocation();
            }
            else {
                getUpdatedData();
            }
        });
    }

    var getLastTableRow = function() {
        
        var online = navigator.onLine;

        if(true){
            $.post("http://roadfloodph.cloudapp.net/roadfloodph/lastRow.php", function (json, status) {
                currentIndexLastRow = json;
              console.log(currentIndexLastRow);
                if (currentIndexLastRow != lastIndexLastRow && status == "success" || becomesOffline) {
                    lastIndexLastRow = currentIndexLastRow;
                    getUpdatedData();
                    becomesOffline = false;
                }
                $("#connectToInternet").hide();
            });
        }
        else {
            becomesOffline = true;
            $("#connectToInternet").show();
            $(".onProgress").show();
            $("#unitName").text("");
            $("#unitLocation").text("");
            $("#unitRegion").text("");
            $("#unitStatus").text("");
            $("#updateAsOf").text("");
            $(".unitOptions").remove();
        }

    }

    setInterval(function () { getLastTableRow() }, 2000);
    
    currentLocationSelected = 3;
   /* $("#selectButton").change(function () {
        currentLocationSelected = $("#selectButton").val();
        $("#showInProgress").show();
        getUpdatedData();
    });*/

});