var carsCategory = new Array('medium', 'light', 'light', 'medium', 'heavy', 'heavy', 'heavy', 'heavy', 'heavy', 'medium', 'light', 'light', 'light', 'heavy', 'heavy', 'heavy', 'medium', 'light', 'medium');
var currentImageIndex = 10;

    var checkVehiclePassability = function() {
        var passable = function() {
            $("#passability").attr("style", "background-color:#009e0f; width: 500px; height: 45px; position: relative; z-index: 2; font-family:'Comic Sans MS'; font-size: 20pt; text-align: center; margin: 0px;");
            $("#passability").text("PASSABLE");
        }

        var impassable = function() {
        $("#passability").attr("style", "background-color:#cc0000; width: 500px; height: 45px; position: relative; z-index: 2; font-family:'Comic Sans MS'; font-size: 20pt; text-align: center; margin: 0px;");
        $("#passability").text("IMPASSABLE");
        } 

        if (carsCategory[currentImageIndex] == 'light' && currentWaterLevel >= 0 && currentWaterLevel <= 11) {
            passable();
        }
        else if (carsCategory[currentImageIndex] == 'light' && currentWaterLevel >= 12) {
            
            impassable();
        }
        else if (carsCategory[currentImageIndex] == 'medium' && currentWaterLevel >= 0 && currentWaterLevel < 18) {
            passable();
        }
        else if (carsCategory[currentImageIndex] == 'medium' && currentWaterLevel >= 18) {
            
            impassable();
        }
        else if (carsCategory[currentImageIndex] == 'heavy' && currentWaterLevel >= 0 && currentWaterLevel < 36) {
            passable();
        }
        else if (carsCategory[currentImageIndex] == 'heavy' && currentWaterLevel >= 36) {
            
            impassable();
        }
        $("#showInProgress").hide();
    }

    var bodyWaterLevel = function(){
        //for body pane
            if (currentWaterLevel != undefined || currentWaterLevel != null || currentWaterLevel != "") {
                if (currentWaterLevel == 0) {
                    $("#bodyWaves").attr("style", "height: 0px; width: 250px; top: -20px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "assets/gif/happy.gif");
                }
                else if (currentWaterLevel > 0 && currentWaterLevel <=3) {
                    var floodLevelInPixel = currentWaterLevel * 11;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "assets/gif/happy.gif");
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
                    $("#happyBoy").attr("src", "assets/gif/sad.gif");
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
                    $("#happyBoy").attr("src", "assets/gif/sad.gif");
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
                    $("#happyBoy").attr("src", "assets/gif/straight.gif");
                }
                else if (currentWaterLevel > 37 && currentWaterLevel <= 45) {
                    if(currentWaterLevel == 45){
                     //   $.get("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is CHEST DEEP (45 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("http://roadfloodph.cloudapp.net/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is CHEST DEEP (45 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 5.16;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "assets/gif/nervous.gif");
                }
                else if (currentWaterLevel > 45 && currentWaterLevel <= 60) {
                    var floodLevelInPixel = currentWaterLevel * 5.92;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", "assets/gif/nervous.gif");
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
    };


$(document).ready(function () {

    var imageNames = new Array('Ambulance', 'Bicycle', 'Car', 'Cargo Van', 'City Bus', 'Concrete Mixer', 'Delivery Truck', 'Dump Truck', 'Fire Truck', 'Jeepney', 'Motorbike', 'Pickup Car', 'Police Car', 'School Bus', 'Tipper Truck', 'Trailer Truck', 'Van', 'Wagon', 'Wrecker');
    
    var imageNamesLength = imageNames.length;
    var mousedOver = false;

    $("#connectToInternet").hide();
    $(".vehicleNavigation").hide();
    $("#showInProgress").hide();
            
    $("#carsPane").mouseenter(function () {
        $(".vehicleNavigation").fadeIn("slow");
    });

    $("#carsPane").mouseleave(function () {
        $(".vehicleNavigation").fadeOut("slow");
    });

    var showVehicleImage = function() {
        if (currentImageIndex == imageNamesLength) {
            currentImageIndex = 0;
        }
        else if (currentImageIndex == -1) {
            currentImageIndex = imageNamesLength - 1;
        }
        $("#vehicleImage").attr("src", "assets/images/" + imageNames[currentImageIndex] + ".png");
        $("#vehicleName").text(imageNames[currentImageIndex]);
        checkVehiclePassability();
    }
  
    $("#moveLeft").click(function () {
        currentImageIndex--;
        showVehicleImage();
    });

    $("#moveRight").click(function () {
        currentImageIndex++;
        showVehicleImage();
    });

});