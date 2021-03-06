var currentWaterLevel = 0;
var getUnitLocation;
var currentUnitSimNumber = "";
var getUpdatedData;
var currentURL = location.href;


if(currentURL.indexOf("http://www.roadflood.ph/") == -1 && currentURL.indexOf("admin") == -1){
    window.location.assign("http://www.roadflood.ph/");
}
else if(currentURL.indexOf("http://www.roadflood.ph/") == -1 && currentURL.indexOf("admin") > -1){
    window.location.assign("http://www.roadflood.ph/admin");
}

$(document).ready(function () {

    function getCookie(c_name)
    {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++){
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name){
                return unescape(y);
            }
        }
    }

    var lastIndexLastRow = 0;
    var becomesOffline = false;
    var currentLocationSelected = 1;

    $("#selectButton").hide();
    $("#updateAsOf").hide();
    $("#locationNameSelected").hide();

    //global function that can request for new updated data from the server
    getUpdatedData = function(){
        var usersEmailAddress = getCookie("username");
        //get all units related to the owner
        if(usersEmailAddress == "" || usersEmailAddress == undefined || usersEmailAddress == null){
            usersEmailAddress = "public";
        }

        $.post("/roadfloodph/selectAllData.php", {emailAddress: usersEmailAddress},function (json) {
            $(".unitOptions").remove();
            for (var i = 1; i <= json['generalCounter']; i++) {
                $("#selectButton").append("<option class='unitOptions' value=" + i + ">" + json['unitName' + i] + "</option>");
            }
            
            $("#unitRegion").text(json["unitRegion" + currentLocationSelected].toUpperCase());
            $("#updateAsOf").text("As of: " + json["asOf" + currentLocationSelected]);
            
            $("#selectButton").val(currentLocationSelected);
            $("#locationNameSelected").text($("#selectButton option:selected").text());
            $("#locationNameSelected").show("slow");
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
            $.get("/roadfloodph/lastRow.php", function (json, status) {
                currentIndexLastRow = json.floodUpdate;
                if (currentIndexLastRow != lastIndexLastRow && status == "success" || becomesOffline) {
                    lastIndexLastRow = currentIndexLastRow;
                    getUpdatedData();
                    if(currentUnitSimNumber != null && currentUnitSimNumber != "" && currentUnitSimNumber != 0){
                        smsUpdateLogs();
                    }
                    becomesOffline = false;
                }
                $("#connectToInternet").text("");
                $("#connectToInternet").hide();
            });
        }
        else {
            becomesOffline = true;
            $("#selectButton").hide();
            $("#connectToInternet").text("To receive road flood updates, please connect to the internet.");
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
        $("#locationNameSelected").text("");
        $("#locationNameSelected").hide();
        $("#selectButton").show();
        getUpdatedData();
    });


    var logosAreShown = false;

    $("#logosContainer").click(function(){
        if(logosAreShown){
            $("#logosContainer").attr("style", "width: 30px; padding-top: 10px; z-index: 3; position: fixed; height: 350px; top: 150px; right: 0px; background-color:#222222; border-top-left-radius:10px; border-bottom-left-radius:10px;");
            $("#logosDiv").attr("style", "width: 0px; position: relative; right: 0px;");
            logosAreShown = false;
        }
        else{
            $("#logosContainer").attr("style", "width: 150px; padding-top: 10px; z-index: 3; position: fixed; height: 350px; top: 150px; right: 0px; background-color:#222222; border-top-left-radius:10px; border-bottom-left-radius:10px;");
            $("#logosDiv").attr("style", "width: 110px; position: relative; right: 0px;");
            logosAreShown = true;
        }
    });


});