var smsUpdateLogs;

$(document).ready(function () {

  var getCurrentDate = new Date();
  var timeFrame = "hour";
  var smsLogsJson;
  var dayDifference;
  var currentDayDisplayed;
  var nextDate;
  var timelineReference = {};


  $("#timelineNav").hide();

  var getNextDate = function(){
    $.get("http://roadfloodph.cloudapp.net/roadfloodph/getDate.php",{timestamp: timelineReference.tomorrow}, function (json) {
      nextDate = json['year']+"/"+json['mon']+"/"+json['mday'];
      dayTimeline(currentDayDisplayed);
    });
  }

  smsUpdateLogs = function(){
    $.post("http://roadfloodph.cloudapp.net/roadfloodph/smsLogs.php",{unitSimNumber: "9275628107"}, function (json) {
      smsLogsJson = json;
      // console.log(smsLogsJson);
      $.get("http://roadfloodph.cloudapp.net/roadfloodph/timeStamp.php",{year: getCurrentDate.getFullYear()}, function (json) {
        timelineReference = json;
        // console.log(timelineReference);
        dayDifference = timelineReference.tomorrow - timelineReference.today;
        currentDayDisplayed = timelineReference.today;
        getNextDate();
      });

    });
  };

  $("#driveRight").click(function(){
      currentDayDisplayed = currentDayDisplayed + dayDifference;
      dayTimeline(currentDayDisplayed);
  });

  $("#driveLeft").click(function(){
      currentDayDisplayed = currentDayDisplayed - dayDifference;
      dayTimeline(currentDayDisplayed);
  });

  var dayTimeline = function(hours){
    var currentDay = timelineReference.today;
    var referenceEndpoint = timelineReference.tomorrow;
    var hourDataValues = new Array();
    var hourLabelValues = new Array();
    var dataLength = smsLogsJson["generalCounter"];

    console.log("currentDay: " + currentDay);
    console.log("referenceEndpoint: " + referenceEndpoint);

    var dataSetQueue = 1;

      for (var j = 1; j <= dataLength; j++) {

        // console.log(smsLogsJson["timestamp"+j] >= currentDay);
        // console.log(smsLogsJson["timestamp"+j] <= referenceEndpoint);

        if(smsLogsJson["timestamp"+j] >= currentDay && smsLogsJson["timestamp"+j] <= referenceEndpoint){
          
          if(dataSetQueue == 1){
            //get previous reading
            if(smsLogsJson["reportedFloodLevel"+(j-1)] == undefined){
              hourDataValues[0] = 0;
            }
            else{
              hourDataValues[0] = parseFloat(smsLogsJson["reportedFloodLevel"+(j-1)]);
            }
            hourLabelValues[0] = smsLogsJson["receivedDate"+j];
          }

          hourDataValues[dataSetQueue] = parseFloat(smsLogsJson["reportedFloodLevel"+(j)]);
          hourLabelValues[dataSetQueue] = smsLogsJson["receivedTime"+(j)];
          dataSetQueue++;
          
          // it is always replaced by a newer value if it still has a next value
          // else, if it is the last value, then it will be preserved as the last value to be displayed
          // with respect to the end of the chosen time.
          
          hourLabelValues[dataSetQueue] = nextDate;
        }
      }

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
  });

});


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
      pointDotRadius : 3,
      
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
      animationEasing : "easeOutQuint",

      //Function - Fires when the animation is complete
      onAnimationComplete : null
    };

    var myNewChart = new Chart(ctx).Line(data,options);