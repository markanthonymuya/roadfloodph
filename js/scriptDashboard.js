var smsUpdateLogs;

$(document).ready(function () {

  var getCurrentDate = new Date();
  var timeFrame = "day";
  var smsLogsJson;
  var dayDifference = 86400;
  var currentMonth = getCurrentDate.getMonth();
  var currentYear = getCurrentDate.getFullYear();
  var currentDateTimestamp;
  var nextDateTimestamp;
  var currentDate;
  var nextDate;
  var getDay = {};
  var getMonth = {};

  $("#timelineNav").hide();
  $(".dashboardNav").hide();


  //converts the currentDate and nextDate Timestamp into a human readable date
  var getNextDate = function(){
    $.get("http://roadfloodph.cloudapp.net/roadfloodph/getDate.php",{currentDateTs: currentDateTimestamp, nextDateTs: nextDateTimestamp}, function (json) {
      currentDate = json.currentDate['year']+"/"+json.currentDate['mon']+"/"+json.currentDate['mday'];
      nextDate = json.nextDate['year']+"/"+json.nextDate['mon']+"/"+json.nextDate['mday'];
      // console.log(smsLogsJson['timestamp1']);
      console.log("currentDateTimestamp: " + currentDateTimestamp);
      // console.log(smsLogsJson['timestamp'+smsLogsJson['generalCounter']]);
      chartTimeline();
    });
  }

  //gets timestamp of current view day and 1-day span of reference
  var getNextDay = function(){
    $.get("http://roadfloodph.cloudapp.net/roadfloodph/getDay.php", function (json) {
      getDay = json;
      currentDateTimestamp = getDay.today;
      nextDateTimestamp = getDay.tomorrow;
      getNextDate();
    });
  }

  //get timestamp of current month and has a 1 month span of reference
  var getNextMonth = function(){
    $.get("http://roadfloodph.cloudapp.net/roadfloodph/getMonth.php",{year: currentYear, month: currentMonth}, function (json) {
      getMonth = json;
      currentDateTimestamp = getMonth.currentMonth;
      nextDateTimestamp = getMonth.nextMonth;
      getNextDate();
    });
  }

  //triggered upon change in database
  smsUpdateLogs = function(manageUnitSimNumber){
    currentUnitSimNumber = manageUnitSimNumber;
    $.get("http://roadfloodph.cloudapp.net/roadfloodph/smsLogs.php",{unitSimNumber: currentUnitSimNumber}, function (json) {
      smsLogsJson = json;
      $(".dashboardNav").show();
      $("#timelineNav").show();
      $("#loadingImage").hide();
      $('#manageModal').attr("style", "width: 1100px;");
      $("#myChart").show("slow");
      if(timeFrame == "day"){
        getNextDay();
      }
      else if(timeFrame == "month"){
        getNextMonth();
      }
    });
  };

  $("#driveLeft").click(function(){
    // console.log(currentDateTimestamp);
    if(currentDateTimestamp>=smsLogsJson['timestamp1']){
      if(timeFrame == "day"){
        currentDateTimestamp = currentDateTimestamp - dayDifference;
        nextDateTimestamp = nextDateTimestamp - dayDifference;
        getNextDate();
      }
      else if(timeFrame == "month"){
        currentMonth--;
        if(currentMonth == -1){
          currentMonth = 11;
          currentYear--;
        }
        console.log("currentMonth: " + currentMonth);
        getNextMonth();
      }
      else if(timeFrame == "semiannual"){

      }
      else if(timeFrame == "annual"){
        
      }
    }
  });

  $("#driveRight").click(function(){
    if(nextDateTimestamp < getDay.tomorrow){
      if(timeFrame == "day"){
        currentDateTimestamp = currentDateTimestamp + dayDifference;
        nextDateTimestamp = nextDateTimestamp + dayDifference;
        getNextDate();
      }
      else if(timeFrame == "month"){
        currentMonth++;
        if(currentMonth == 12){
          currentMonth = 0;
          currentYear++;
        }
        getNextMonth();
      }
      else if(timeFrame == "semiannual"){

      }
      else if(timeFrame == "annual"){
        
      }
    }
  });

  var chartTimeline = function(){
    var hourDataValues = new Array();
    var hourLabelValues = new Array();
    var dataLength = smsLogsJson["generalCounter"];
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    var dataSetQueue = 1;

      for (var j = 1; j <= dataLength; j++) {

        if(smsLogsJson["timestamp"+j] >= currentDateTimestamp && smsLogsJson["timestamp"+j] <= nextDateTimestamp){
          
          if(dataSetQueue == 1){
            //get previous reading
            if(smsLogsJson["reportedFloodLevel"+(j-1)] == undefined){
              hourDataValues[0] = 0;
            }
            else{
              hourDataValues[0] = parseFloat(smsLogsJson["reportedFloodLevel"+(j-1)]);
            }
            if(timeFrame == "day"){
              hourLabelValues[0] = currentDate;
            }
            else if(timeFrame == "month"){
              hourLabelValues[0] = months[currentMonth];
            }
          }

          hourDataValues[dataSetQueue] = parseFloat(smsLogsJson["reportedFloodLevel"+(j)]);

          if(timeFrame == "day"){
            hourLabelValues[dataSetQueue] = smsLogsJson["receivedTime"+(j)];
          }
          else if(timeFrame == "month"){
            hourLabelValues[dataSetQueue] = "D-" + smsLogsJson["receivedDate"+(j)].slice(8,10) + "   " + smsLogsJson["receivedTime"+(j)];
          }
          dataSetQueue++;
          
          // it is always replaced by a newer value if it still has a next value
          // else, if it is the last value, then it will be preserved as the last value to be displayed
          // with respect to the end of the chosen time.
          if(nextDateTimestamp != getDay.tomorrow && nextDateTimestamp < getDay.tomorrow){
            hourDataValues[dataSetQueue] = parseFloat(smsLogsJson["reportedFloodLevel"+(j)]);
          }
          if(timeFrame == "day"){
            hourLabelValues[dataSetQueue] = nextDate;
          }
          else if(timeFrame == "month"){
            var nextMonth = currentMonth + 1;
            if(nextMonth == 12){
              nextMonth = 0;
            }
            hourLabelValues[dataSetQueue] = months[nextMonth];
          }
        }
        else if(dataSetQueue == 1 && hourDataValues[0] == null){
          hourDataValues[0] = 0;
          hourLabelValues[0] = currentDate;
          hourDataValues[1] = 0;
          hourLabelValues[1] = "No Data To Display";
          hourDataValues[2] = 0;
          hourLabelValues[2] = nextDate;
        }
      }
    
    $("#manageTitle").text(hourLabelValues[0]);

    data.datasets[0].data = hourDataValues;
    data.labels = hourLabelValues;
   /* console.log(hourDataValues);
    console.log(hourLabelValues);*/

    var myNewChart = new Chart(ctx).Line(data,options);
  };

  $(".timeFrameBtn").click(function(){
    timeFrame = this.getAttribute('data-rf');
    $(".timeFrameBtn").attr("class", "btn btn-default timeFrameBtn");
    $(this).attr("class", "btn btn-primary timeFrameBtn");
    if(timeFrame == "day"){
      getNextDay();
    }
    else if(timeFrame == "month"){
      currentMonth = getCurrentDate.getMonth();
      currentYear = getCurrentDate.getFullYear();
      getNextMonth(); 
    }
    smsUpdateLogs(currentUnitSimNumber);
  });

});
//////////////////////////////////////////////////////////////////////////////////////////////

    //Get the context of the canvas element we want to select
    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
      labels : ["January","February","March","April","May","June","July"],
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [28,48,40,19,96,27,100]
        }
      ]
    };

    var options = {
      //Boolean - If we show the scale above the chart data     
      scaleOverlay : false,
      
      //Boolean - If we want to override with a hard coded scale
      scaleOverride : false,
      
      //** Required if scaleOverride is true **
      //Number - The number of steps in a hard coded scale
      scaleSteps : null,
      //Number - The value jump in the hard coded scale
      scaleStepWidth : null,
      //Number - The scale starting value
      scaleStartValue : null,

      //String - Colour of the scale line 
      scaleLineColor : "rgba(0,0,0,.1)",
      
      //Number - Pixel width of the scale line  
      scaleLineWidth : 1,

      //Boolean - Whether to show labels on the scale 
      scaleShowLabels : true,
      
      //Interpolated JS string - can access value
      scaleLabel : "<%=value%>",
      
      //String - Scale label font declaration for the scale label
      scaleFontFamily : "'Arial'",
      
      //Number - Scale label font size in pixels  
      scaleFontSize : 12,
      
      //String - Scale label font weight style  
      scaleFontStyle : "normal",
      
      //String - Scale label font colour  
      scaleFontColor : "#666",  
      
      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,
      
      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",
      
      //Number - Width of the grid lines
      scaleGridLineWidth : 1, 
      
      //Boolean - Whether the line is curved between points
      bezierCurve : true,
      
      //Boolean - Whether to show a dot for each point
      pointDot : true,
      
      //Number - Radius of each point dot in pixels
      pointDotRadius : 4,
      
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,
      
      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,
      
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,
      
      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,
      
      //Boolean - Whether to animate the chart
      animation : false,

      //Number - Number of animation steps
      animationSteps : 60,
      
      //String - Animation easing effect
      animationEasing : "easeOutQuad",

      //Function - Fires when the animation is complete
      onAnimationComplete : null
    };

    var myNewChart = new Chart(ctx).Line(data,options);