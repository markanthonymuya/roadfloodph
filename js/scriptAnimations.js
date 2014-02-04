var carsCategory = new Array('light', 'light', 'medium', 'heavy', 'medium', 'light', 'medium', 'light', 'light', 'medium', 'heavy', 'heavy', 'heavy', 'heavy', 'heavy', 'heavy', 'heavy', 'light', 'medium');
var currentImageIndex = 0;

var srcGifImage = "assets/gif/";
if(location.href == "http://roadfloodph.cloudapp.net/admin/" || location.href == "http://roadfloodph.cloudapp.net/references/"){
        srcGifImage = '../assets/gif/';
}

    //A function that checks the passability of a vehicle in certain road flood level.
    //This is the function that sets/changes the displayed passability/impassability label on vehicles pane
    var checkVehiclePassability = function() {
        var passable = function() {
            $("#passability").attr("style", "background-color:#008803; width: 500px; height: 45px; position: relative; z-index: 2; font-family:'Comic Sans MS'; font-size: 20pt; text-align: center; margin: 0px;");
            $("#passability").text("PASSABLE");
        }

        var impassable = function() {
        $("#passability").attr("style", "background-color:#d40000; width: 500px; height: 45px; position: relative; z-index: 2; font-family:'Comic Sans MS'; font-size: 20pt; text-align: center; margin: 0px;");
        $("#passability").text("NOT PASSABLE");
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

    //this is the function that changes the height of the waves.gif in body pane according to the currentWaterLevel
    var bodyWaterLevel = function(){
        //for body pane
            if (currentWaterLevel != undefined || currentWaterLevel != null || currentWaterLevel != "") {
                if (currentWaterLevel == 0) {
                    $("#bodyWaves").attr("style", "height: 0px; width: 250px; top: -20px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "happy.gif");
                }
                else if (currentWaterLevel > 0 && currentWaterLevel <= 2.5) {
                    //manual adjustment has been required to this water level graphical display
                    //due to its inconsistency of direct proportionality between height and top attributes
                    var floodLevelInPixel = currentWaterLevel*13;
                    if(currentWaterLevel == 0.5){
                        $("#bodyWaves").attr("style", "height: " + (floodLevelInPixel-1) + "px; width: 250px; top: -14px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 1){
                        $("#bodyWaves").attr("style", "height: " + (floodLevelInPixel-2) + "px; width: 250px; top: -17px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 1.5){
                        $("#bodyWaves").attr("style", "height: " + (floodLevelInPixel-5) + "px; width: 250px; top: -19px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 2){
                        $("#bodyWaves").attr("style", "height: " + (floodLevelInPixel-4) + "px; width: 250px; top: -22px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 2.5){
                        $("#bodyWaves").attr("style", "height: " + (floodLevelInPixel-7) + "px; width: 250px; top: -26px; position: relative; left: 0px;");
                    }
                    $("#happyBoy").attr("src", srcGifImage + "happy.gif");
                }
                else if (currentWaterLevel==3) {
                    var floodLevelInPixel = currentWaterLevel * 11;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "happy.gif");
                }
                else if (currentWaterLevel > 3  && currentWaterLevel <= 10) {
                    if(currentWaterLevel == 8){
                      //  $.get("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is GUTTER DEEP (8 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is GUTTER DEEP (8 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 10){
                      //  $.get("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF KNEE DEEP (10 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF KNEE DEEP (10 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 8;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "sad.gif");
                }
                else if (currentWaterLevel > 10 && currentWaterLevel <= 19) {
                    if(currentWaterLevel == 12){
                       // $.get("/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (12 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (12 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 18){
                        //$.get("/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all MEDIUM vehicles (18 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                        //console.log("/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (18 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    
                    if(currentWaterLevel == 13){
                       // $.get("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (13 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (13 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 19){
                       // $.get("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (19 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is HALF TIRE DEEP (19 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 6.11;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "sad.gif");
                }
                else if (currentWaterLevel > 19 && currentWaterLevel <= 37) {
                    if(currentWaterLevel == 36){
                        //$.get("/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to ALL TYPES of vehicles (36 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    //    console.log("/send/ROADFLOODPH: "+unitNames["unitName" + currentLocationSelected]+ "is not passable to all LIGHT vehicles (36 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }

                    if(currentWaterLevel == 26){
                     //   $.get("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is TIRE DEEP (26 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                     //   console.log("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is TIRE DEEP (26 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    else if(currentWaterLevel == 37){
                       // $.get("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is WAIST DEEP (37 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is WAIST DEEP (37 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 4.70;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "straight.gif");
                }
                else if (currentWaterLevel > 37 && currentWaterLevel <= 45) {
                    if(currentWaterLevel == 45){
                     //   $.get("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is CHEST DEEP (45 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                      //  console.log("/send/ROADFLOODPH: Flood level at "+unitNames["unitName" + currentLocationSelected]+ " is CHEST DEEP (45 in). Update as of " + currentData["asOf" + currentLocationSelected]);
                    }
                    var floodLevelInPixel = currentWaterLevel * 5.16;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "nervous.gif");
                }
                else if (currentWaterLevel > 45 && currentWaterLevel < 52) {
                    var floodLevelInPixel = currentWaterLevel * 5.92;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "nervous.gif");
                }
                else if (currentWaterLevel > 51) {
                    var floodLevelInPixel = 51 * 6.8;
                    $("#bodyWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                    $("#happyBoy").attr("src", srcGifImage + "nervous.gif");
                }
            }
            else {
                getUpdatedData();
            }
    };

    //this is the function that changes the height of the waves.gif in mmda gauge pane according to the currentWaterLevel
    var gaugeWaterLevel = function(){
         //for gauge pane
            if (currentWaterLevel != undefined || currentWaterLevel != null || currentWaterLevel != "") {
                if (currentWaterLevel == 0) {
                    $("#gaugeWaves").attr("style", "height: 0px; width: 250px; top: -20px; position: relative; left: 0px;");
                }
                else if (currentWaterLevel > 0 && currentWaterLevel <= 2.5) {
                    //manual adjustment has been required to this water level graphical display
                    //due to its inconsistency of direct proportionality between height and top attributes
                    var floodLevelInPixel = currentWaterLevel*10;
                    if(currentWaterLevel == 0.5){
                        $("#gaugeWaves").attr("style", "height: " + (floodLevelInPixel-2) + "px; width: 250px; top: -13px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 1){
                        $("#gaugeWaves").attr("style", "height: " + (floodLevelInPixel-2) + "px; width: 250px; top: -15px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 1.5){
                        $("#gaugeWaves").attr("style", "height: " + (floodLevelInPixel-4) + "px; width: 250px; top: -17px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 2){
                        $("#gaugeWaves").attr("style", "height: " + (floodLevelInPixel-6) + "px; width: 250px; top: -18px; position: relative; left: 0px;");
                    }
                    else if(currentWaterLevel == 2.5){
                        $("#gaugeWaves").attr("style", "height: " + (floodLevelInPixel-8) + "px; width: 250px; top: -20px; position: relative; left: 0px;");
                    }
                }
                else if (currentWaterLevel > 2.5 && currentWaterLevel <= 6) {
                    var floodLevelInPixel = currentWaterLevel * 6.7;
                    $("#gaugeWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                }
                else if (currentWaterLevel > 6 && currentWaterLevel <= 51) {
                    var floodLevelInPixel = currentWaterLevel * 6.8;
                    $("#gaugeWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                }
                else if (currentWaterLevel > 51) {
                    var floodLevelInPixel = 51 * 6.8;
                    $("#gaugeWaves").attr("style", "height: " + floodLevelInPixel + "px; width: 250px; top: -" + floodLevelInPixel + "px; position: relative; left: 0px;");
                }
            }
            else {
                getUpdatedData();
            }
    };


$(document).ready(function () {

    var imageNames = new Array('Motorbike', 'Car', 'Cargo Van', 'City Bus', 'Ambulance', 'Bicycle', 'Jeepney', 'Pickup Car', 'Police Car', 'Van', 'School Bus', 'Concrete Mixer', 'Delivery Truck', 'Dump Truck', 'Fire Truck', 'Tipper Truck', 'Trailer Truck', 'Wagon', 'Wrecker');
    var imageNamesId = new Array('Motorbike', 'Car', 'CargoVan', 'CityBus', 'Ambulance', 'Bicycle', 'Jeepney', 'PickupCar', 'PoliceCar', 'Van', 'SchoolBus', 'ConcreteMixer', 'DeliveryTruck', 'DumpTruck', 'FireTruck', 'TipperTruck', 'TrailerTruck', 'Wagon', 'Wrecker');
    
    var imageNamesLength = imageNames.length;
    var mousedOver = false;
    var previousImageIndex;

    $("#connectToInternet").hide();
    $(".vehicleNavigation").hide();
    $("#showInProgress").hide();

    var srcImages = 'src="assets/images/';
    if(location.href == "http://roadfloodph.cloudapp.net/admin/" || location.href == "http://roadfloodph.cloudapp.net/references/"){
        srcImages = 'src="../assets/images/';
    }

    for(var i = 1; i < imageNamesLength; i++){
        $("#vehicleImages").prepend('<img id="'+imageNamesId[i]+'" class="vehicleImageCss" '+srcImages+imageNames[i]+'.jpg" />');
        $("#"+imageNamesId[i]).hide();
    }
            
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

        if (previousImageIndex == imageNamesLength) {
            previousImageIndex = 0;
        }
        else if (previousImageIndex == -1) {
            previousImageIndex = imageNamesLength - 1;
        }

        $("#"+imageNamesId[previousImageIndex]).hide();
        $("#"+imageNamesId[currentImageIndex]).show();
        $("#vehicleName").text(imageNames[currentImageIndex]);
        checkVehiclePassability();
    }
  
    $("#moveLeft").click(function () {
        previousImageIndex = currentImageIndex;
        currentImageIndex--;
        showVehicleImage();
    });

    $("#moveRight").click(function () {
        previousImageIndex = currentImageIndex;
        currentImageIndex++;
        showVehicleImage();
    });

});