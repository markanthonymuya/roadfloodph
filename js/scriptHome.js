var currentWaterLevel = 0;
var getUnitLocation;
var currentUnitSimNumber = "";
var getUpdatedData;


$(document).ready(function () {
    var lastIndexLastRow = 0;
    var becomesOffline = false;
    var currentLocationSelected = 1;

    $("#selectButton").hide();
    $("#updateAsOf").hide();

    //global function that can request for new updated data from the server
    getUpdatedData = function(){

        $.post("http://roadfloodph.cloudapp.net/roadfloodph/selectAllData.php", function (json) {
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

    //This function will help us to determine if there is an update into database
    //through getting the last row of the table "smsUpdateLogs"(new sms activity).
    //For example, current last row is 48. When there is an update, a new row
    //will be inserted on that table and will turn the current last row into 49.
    //Upon knowing programmatically that there is a change in DB, it will request
    //new updated data using the "getUpdatedData()" function to update and refresh
    //the currentdata displayed in the page.
    var getLastTableRow = function() {
        
        var online = navigator.onLine;

        if(true){
            $.get("http://roadfloodph.cloudapp.net/roadfloodph/lastRow.php", function (json, status) {
                currentIndexLastRow = json;
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
            $("#selectButton").hide();
            $("#connectToInternet").show();
            $("#unitName").text("");
            $("#unitRegion").text("");
            $("#unitStatus").text("");
            $("#updateAsOf").text("");
            $(".unitOptions").remove();
        }

    }

    //it sets to run the getLastTableRow function every 2 seconds
    setInterval(function () { getLastTableRow() }, 2000);
    
    //Upon change of value in select button, it will request to new updated
    //data with respect to the selected value.
    $("#selectButton").change(function () {
        currentLocationSelected = $("#selectButton").val();
        $("#selectButton").show();
        getUpdatedData();
    });

});