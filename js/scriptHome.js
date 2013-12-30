var currentWaterLevel = 0;
var getUnitLocation;
var currentUnitSimNumber = "";
var getUpdatedData;


$(document).ready(function () {
    var lastIndexLastRow = 0;
    var becomesOffline = false;
    var unitNames = {};
    var currentData = {};
    var unitLocationDetails = {};
    var currentLocationSelected = 1;

    $("#selectButton").hide();
    $("#updateAsOf").hide();


    getUnitLocation = function() {
        $.post("http://roadfloodph.cloudapp.net/roadfloodph/getUnitLocation.php", function (json) {
            unitLocationDetails = json;
           
            if (unitLocationDetails["unitStatus" + currentLocationSelected] != undefined || unitLocationDetails["unitStatus" + currentLocationSelected] != null || unitLocationDetails["unitStatus" + currentLocationSelected] != "") {
                $("#unitRegion").text(unitLocationDetails["unitRegion" + currentLocationSelected].toUpperCase());
                checkVehiclePassability();
            }
            else {
                getUnitLocation();
            }
        });
    }

    getUpdatedData = function(){

        $.post("http://roadfloodph.cloudapp.net/roadfloodph/selectAllData.php", function (json) {
            currentData = json;
            console.log(currentData);

            $.post("http://roadfloodph.cloudapp.net/roadfloodph/getUnitNames.php", function (json) {
                unitNames = json;
                $(".unitOptions").remove();
                for (var i = 1; i <= json['generalCounter']; i++) {
                    $("#selectButton").append("<option class='unitOptions' value=" + i + ">" + json['unitName' + i] + "</option>");
                }
                $("#selectButton").val(currentLocationSelected);
                $("#selectButton").show("slow");
                $("#updateAsOf").show("slow");
            });

            $("#updateAsOf").text("As of: " + json["asOf" + currentLocationSelected]);
            currentWaterLevel = json['roadFloodLevel' + currentLocationSelected];
            bodyWaterLevel();
            gaugeWaterLevel();
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
                    if(currentUnitSimNumber != null && currentUnitSimNumber != "" && currentUnitSimNumber != 0){
                        smsUpdateLogs(currentUnitSimNumber);
                    }
                    becomesOffline = false;
                }
                $("#connectToInternet").hide();
            });
        }
        else {
            becomesOffline = true;
            $("#connectToInternet").show();
            $("#unitName").text("");
            $("#unitRegion").text("");
            $("#unitStatus").text("");
            $("#updateAsOf").text("");
            $(".unitOptions").remove();
        }

    }

    setInterval(function () { getLastTableRow() }, 2000);
    
    $("#selectButton").change(function () {
        console.log(currentLocationSelected);
        currentLocationSelected = $("#selectButton").val();
        $("#selectButton").show();
        getUpdatedData();
    });

});