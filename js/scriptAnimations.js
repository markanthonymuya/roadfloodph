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