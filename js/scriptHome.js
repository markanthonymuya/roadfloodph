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


    getUpdatedData = function(){

        $.post("http://roadfloodph.cloudapp.net/roadfloodph/selectAllData.php", function (json) {
            currentData = json;

            $(".unitOptions").remove();
            for (var i = 1; i <= json['generalCounter']; i++) {
                $("#selectButton").append("<option class='unitOptions' value=" + i + ">" + json['unitName' + i] + "</option>");
            }
            
            $("#unitRegion").text(json["unitRegion" + currentLocationSelected].toUpperCase());
            $("#updateAsOf").text("As of: " + json["asOf" + currentLocationSelected]);
            
            $("#selectButton").val(currentLocationSelected);
            $("#selectButton").show("slow");
            $("#updateAsOf").show("slow");

            currentWaterLevel = json['roadFloodLevel' + currentLocationSelected];
            bodyWaterLevel();
            gaugeWaterLevel();
            checkVehiclePassability();
        });
    }

    var getLastTableRow = function() {
        
        var online = navigator.onLine;

        if(true){
            $.get("http://roadfloodph.cloudapp.net/roadfloodph/lastRow.php", function (json, status) {
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