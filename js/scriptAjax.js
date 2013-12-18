var currentWaterLevel = 0;
var getUnitLocation;

$(document).ready(function () {
    var lastIndexLastRow = 0;
    var becomesOffline = false;
    var unitNames = {};
    var currentData = {};
    var unitLocationDetails = {};
    var currentLocationSelected = 1;

    getUnitLocation = function() {
        $.post("http://roadfloodph.cloudapp.net/roadfloodph/getUnitLocation.php", function (json) {
            unitLocationDetails = json;
           /* console.log(unitLocationDetails);
            console.log(currentLocationSelected);
            console.log(unitLocationDetails["unitBarangay" + currentLocationSelected]);*/
            if (unitLocationDetails["unitStatus" + currentLocationSelected] != undefined || unitLocationDetails["unitStatus" + currentLocationSelected] != null || unitLocationDetails["unitStatus" + currentLocationSelected] != "") {
                $("#unitLocation").text(" " + unitLocationDetails["unitName" + currentLocationSelected]);
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
  //            $(".onProgress").hide();
                /*$(".unitOptions").remove();
                for (var i = 1; i <= json['generalCounter']; i++) {
                    $("#selectButton").append("<option class='unitOptions' value=" + i + ">" + json['unitName' + i] + "</option>");
                }
                $("#selectButton").val(currentLocationSelected);*/
                $("#unitName").text(unitNames["unitName" + currentLocationSelected]);
            });

            currentWaterLevel = json['roadFloodLevel' + currentLocationSelected];
            $("#updateAsOf").text(json["asOf" + currentLocationSelected]);

            bodyWaterLevel();
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
    
    currentLocationSelected = 1;
   /* $("#selectButton").change(function () {
        currentLocationSelected = $("#selectButton").val();
        $("#showInProgress").show();
        getUpdatedData();
    });*/

});