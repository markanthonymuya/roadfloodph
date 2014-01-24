var smsUpdateLogs;
var resetTimelineToCurrent;
var detailed = false;
var dashboardBtnIsClicked = false;


$(document).ready(function () {
/////////////////////////////variables///////////////////////////////////
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
  var currentQuarter;
  var currentSemiAnnual;
  var getDay = {};
  var getMonth = {};
  var getQuarter = {};
  var getSemiAnnual = {};
  var getAnnual = {};

/////////////////////////////initial animation///////////////////////////
  $("#timelineNav").hide();
  $(".dashboardNav").hide();

/////////////////////////////functions///////////////////////////////////
  var executeUpdate = function(){
    if(timeFrame == "day"){
      getNextDay();
    }
    else if(timeFrame == "month"){
      getNextMonth();
    }
    else if(timeFrame == "quarter"){
      getNextQuarter();
    }
    else if(timeFrame == "semiannual"){
      getNextSemiAnnual();
    }
    else if(timeFrame == "annual"){
      getNextAnnual();
    }
  };

  var evaluateCurrentQuarterByMonth = function(){
    if(currentMonth >= 0 && currentMonth <= 2){
      currentQuarter = 0;
    }
    else if(currentMonth >= 3 && currentMonth <= 5){
      currentQuarter = 1;
    }
    else if(currentMonth >= 6 && currentMonth <= 8){
      currentQuarter = 2;
    }
    else if(currentMonth >= 9 && currentMonth <= 11){
      currentQuarter = 3;
    }
  };

  var evaluateCurrentSemiAnnualByMonth = function(){
    if(currentMonth >= 0 && currentMonth <= 5){
      currentSemiAnnual = 0;
    }
    else if(currentMonth >= 6 && currentMonth <= 11){
      currentSemiAnnual = 1;
    }
  };

  evaluateCurrentQuarterByMonth();  //first call to set currentQuarter
  evaluateCurrentSemiAnnualByMonth(); //first call to set currentSemiAnnual

  resetTimelineToCurrent = function(){
    currentMonth = getCurrentDate.getMonth();
    currentYear = getCurrentDate.getFullYear();

    if(timeFrame == "day"){
      currentDateTimestamp = getDay.today;
      nextDateTimestamp = getDay.tomorrow;
    }
    else if(timeFrame == "month"){
      currentDateTimestamp = getMonth.currentMonth;
      nextDateTimestamp = getMonth.nextMonth;
    }
    else if(timeFrame == "quarter"){
      
      currentDateTimestamp = getQuarter.startPoint;
      nextDateTimestamp = getQuarter.endPoint;
      evaluateCurrentQuarterByMonth();
    }
    else if(timeFrame == "semiannual"){
      currentDateTimestamp = getSemiAnnual.startPoint;
      nextDateTimestamp = getSemiAnnual.endPoint;
      evaluateCurrentSemiAnnualByMonth();
    }
    else if(timeFrame == "annual"){
      currentDateTimestamp = getAnnual.startPoint;
      nextDateTimestamp = getAnnual.endPoint;
    }
  };

  //converts the currentDate and nextDate Timestamp into a human readable date
  var getNextDate = function(){
    $.get("/roadfloodph/getDate.php",{currentDateTs: currentDateTimestamp, nextDateTs: nextDateTimestamp}, function (json) {
      currentDate = json.currentDate['year']+"/"+json.currentDate['mon']+"/"+json.currentDate['mday'];
      nextDate = json.nextDate['year']+"/"+json.nextDate['mon']+"/"+json.nextDate['mday'];
      chartTimeline();
    });
  }

  //gets timestamp of current view day and 1-day span of reference
  var getNextDay = function(){
    $.get("/roadfloodph/getDay.php", function (json) {
      getDay = json;
      currentDateTimestamp = getDay.today;
      nextDateTimestamp = getDay.tomorrow;
      getNextDate();
    });
  }

  //get timestamp of current month and has a 1 month span of reference
  var getNextMonth = function(){
    $.get("/roadfloodph/getMonth.php",{year: currentYear, month: currentMonth}, function (json) {
      getMonth = json;
      currentDateTimestamp = getMonth.currentMonth;
      nextDateTimestamp = getMonth.nextMonth;
      getNextDate();
    });
  }
  
  //get timestamp of a quarter months, first loaded timestamp with respect to current month
  var getNextQuarter = function(){
    $.get("/roadfloodph/getQuarter.php",{year: currentYear, quarter: currentQuarter}, function (json) {
      getQuarter = json;
      currentDateTimestamp = getQuarter.startPoint;
      nextDateTimestamp = getQuarter.endPoint;
      getNextDate();
    });
  }

  //get timestamp of the first and second half of the year
  var getNextSemiAnnual = function(){
    $.get("/roadfloodph/getSemiannual.php",{year: currentYear, point: currentSemiAnnual}, function (json) {
      getSemiAnnual = json;
      currentDateTimestamp = getSemiAnnual.startPoint;
      nextDateTimestamp = getSemiAnnual.endPoint;
      getNextDate();
    });
  }

  //get timestamp of the year
  var getNextAnnual = function(){
    $.get("/roadfloodph/getAnnual.php",{year: currentYear}, function (json) {
      getAnnual = json;
      currentDateTimestamp = getAnnual.startPoint;
      nextDateTimestamp = getAnnual.endPoint;
      getNextDate();
    });
  }

  //triggered upon change in database and change of selected dashboard 
  smsUpdateLogs = function(){
    $.post("/roadfloodph/smsLogs.php",{unitSimNumber: currentUnitSimNumber}, function (json) {
      smsLogsJson = json;
      getUpdatedPowerData();
      $(".dashboardNav").show();
      $("#timelineNav").show();
      $("#loadingImage").hide();
      $('#manageModal').attr("style", "width: 1100px;");
      $("#myChart").show("slow");
      executeUpdate();
    });
  };

  var getUpdatedPowerData = function(){
    console.log("hellow");
    if(currentUnitSimNumber != "" && dashboardBtnIsClicked){
      $.post("/roadfloodph/searchPowerBySimNumber.php", {unitSimNumber: currentUnitSimNumber}, function (batteryPower) {
        $(".batteryLabelText").text(batteryPower);
        $(".batteryLabel").show("slow");
      });
    }
  };

/////////////////////////////drivers/////////////////////////////////////

  $("#driveLeft").click(function(){
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
        getNextMonth();
      }
      else if(timeFrame == "quarter"){
        currentQuarter--;
        if(currentQuarter == -1){
          currentQuarter = 3;
          currentYear--;
        }
        getNextQuarter();
      }
      else if(timeFrame == "semiannual"){
        currentSemiAnnual--;
        if(currentSemiAnnual == -1){
          currentSemiAnnual = 1;
          currentYear--;
        }
        getNextSemiAnnual();
      }
      else if(timeFrame == "annual"){
        currentYear--;
        getNextAnnual();
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
      else if(timeFrame == "quarter"){
        currentQuarter++;
        if(currentQuarter == 4){
          currentQuarter = 0;
          currentYear++;
        }
        getNextQuarter();
      }
      else if(timeFrame == "semiannual"){
        currentSemiAnnual++;
        if(currentSemiAnnual == 2){
          currentSemiAnnual =0;
          currentYear++;
        }
        getNextSemiAnnual();
      }
      else if(timeFrame == "annual"){
          currentYear++;
          getNextAnnual();
      }
    }
  });

/////////////////////////////chart animations////////////////////////////

  $("#myChart").mouseover(function(){
    if(data.datasets[0].data.length != 3 && data.labels.length != 3 && timeFrame != "day"){
      $(".noticeDetails").show("slow");
    }
  });

  $("#myChart").mouseout(function(){
    if(data.datasets[0].data.length != 3 && data.labels.length != 3  && timeFrame != "day"){
      $(".noticeDetails").hide("slow");
    }
  });

  $("#myChart").click(function(){
    if(data.datasets[0].data.length != 3 && data.labels.length != 3  && timeFrame != "day"){
      if(detailed){
        $(".noticeDetails").attr("style", "margin-right: 285px");
        $(".noticeDetails").text("Click chart to see detailed view");
        detailed = false;
      }
      else{
        $(".noticeDetails").attr("style", "margin-right: 265px");
        $(".noticeDetails").text("Click chart to return in minimal view");
        detailed = true;
      }
      chartTimeline();
    }
  });

/////////////////////////////chart function//////////////////////////////
  var chartTimeline = function(){
    var timeDataValues = new Array();
    var timeLabelValues = new Array();
    var dataLength = smsLogsJson["generalCounter"];
    var months = new Array("JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER");
    var unDetailedMonths = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
    var quarters = new Array("1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter");
    var annuals = new Array("1st Half", "2nd Half");

    var dataSetQueue = 1;
    var currentMonthQuarter;
    var currentDayQuarter;  

      for (var j = 1; j <= dataLength; j++) {

        if(smsLogsJson["timestamp"+j] >= currentDateTimestamp && smsLogsJson["timestamp"+j] <= nextDateTimestamp){
          
          if(dataSetQueue == 1){
            //get previous reading
            if(smsLogsJson["reportedFloodLevel"+(j-1)] == undefined){
              timeDataValues[0] = 0;
            }
            else{
              timeDataValues[0] = parseFloat(smsLogsJson["reportedFloodLevel"+(j-1)]);
            }

            if(timeFrame == "day"){
              timeLabelValues[0] = currentDate;
            }
            else if(timeFrame == "month"){
              if(detailed){
                timeLabelValues[0] = months[currentMonth];
              }
              else{
                timeLabelValues[0] = unDetailedMonths[currentMonth];
              }
              currentDayQuarter = parseInt(smsLogsJson["receivedDate"+(j)].slice(8,10)) - 1;
            }
            else if(timeFrame == "quarter" || timeFrame == "semiannual" || timeFrame == "annual"){
              currentDayQuarter = parseInt(smsLogsJson["receivedDate"+(j)].slice(8,10)) - 1;
              currentMonthQuarter = parseInt(smsLogsJson["receivedDate"+(j)].slice(5,7));
              if(detailed){
                timeLabelValues[0] = months[currentMonthQuarter-1];
              }
              else{
                timeLabelValues[0] = unDetailedMonths[currentMonthQuarter-1];
              }
            }
          }


          if(timeFrame == "day"){
            timeLabelValues[dataSetQueue] = smsLogsJson["receivedTime"+(j)];
          }
          else if(timeFrame == "month"){
            var dayInQuarter = parseInt(smsLogsJson["receivedDate"+(j)].slice(8,10));
            if(dayInQuarter > currentDayQuarter){
              currentDayQuarter = dayInQuarter;
              if(detailed){
                timeLabelValues[dataSetQueue] = smsLogsJson["receivedDate"+(j)].slice(8,10) + "   " + smsLogsJson["receivedTime"+(j)]; 
              }
              else{
                timeLabelValues[dataSetQueue] = smsLogsJson["receivedDate"+(j)].slice(8,10); 
              }
            }
            else{
              if(detailed){
                timeLabelValues[dataSetQueue] = smsLogsJson["receivedTime"+(j)];
              }
              else{
                timeLabelValues[dataSetQueue] = "...";
              }
            }
          }
          else if(timeFrame == "quarter" || timeFrame == "semiannual" || timeFrame == "annual"){
            var monthInQuarter = parseInt(smsLogsJson["receivedDate"+(j)].slice(5,7));
            var dayInQuarter = parseInt(smsLogsJson["receivedDate"+(j)].slice(8,10));

            if(monthInQuarter != currentMonthQuarter){
                currentMonthQuarter = monthInQuarter;
                if(detailed){
                  timeLabelValues[dataSetQueue] = months[monthInQuarter-1];
                }
                else{
                  timeLabelValues[dataSetQueue] = unDetailedMonths[monthInQuarter-1];
                }
                timeDataValues[dataSetQueue] = parseFloat(smsLogsJson["reportedFloodLevel"+(j-1)]);
                currentDayQuarter = 0;
                dataSetQueue++;
            }
            
            if(dayInQuarter != currentDayQuarter){
              currentDayQuarter = dayInQuarter;
              if(detailed){
                timeLabelValues[dataSetQueue] = smsLogsJson["receivedDate"+(j)].slice(8,10) + "   " + smsLogsJson["receivedTime"+(j)];
              }
              else{
                timeLabelValues[dataSetQueue] = smsLogsJson["receivedDate"+(j)].slice(8,10);
              }
            }
            else{
              if(detailed){
                timeLabelValues[dataSetQueue] = smsLogsJson["receivedTime"+(j)];
              }
              else{
                timeLabelValues[dataSetQueue] = "...";
              }
            }
          }
          
          timeDataValues[dataSetQueue] = parseFloat(smsLogsJson["reportedFloodLevel"+(j)]);

          dataSetQueue++;
          
          // it is always replaced by a newer value if it still has a next value
          // else, if it is the last value, then it will be preserved as the last value to be displayed
          // with respect to the end of the chosen time.
          if(nextDateTimestamp != getDay.tomorrow && nextDateTimestamp < getDay.tomorrow){
            timeDataValues[dataSetQueue] = parseFloat(smsLogsJson["reportedFloodLevel"+(j)]);
          }
          if(timeFrame == "day"){
            timeLabelValues[dataSetQueue] = nextDate;
          }
          else if(timeFrame == "month"){
            var nextMonth = currentMonth + 1;
            if(nextMonth == 12){
              nextMonth = 0;
            }
            if(detailed){
              timeLabelValues[dataSetQueue] = months[nextMonth];
            }
            else{
              timeLabelValues[dataSetQueue] = unDetailedMonths[nextMonth];
            }
          }
          else if(timeFrame == "quarter"){
            /*var nextQuarter = currentQuarter + 1;
            if(nextMonth == 4){
              nextMonth = 0;
            }
            timeLabelValues[dataSetQueue] = middleMonthsQuarter[currentQuarter] +"-  " + smsLogsJson["receivedTime"+(j)];*/
          }
        }
        else if(dataSetQueue == 1 && timeDataValues[0] == null){
          timeDataValues[0] = 0;
          timeLabelValues[0] = currentDate;
          timeDataValues[1] = 0;
          timeLabelValues[1] = "No Data To Display";
          timeDataValues[2] = 0;
          timeLabelValues[2] = nextDate;
        }
      }

    if(timeFrame == "month"){
      $("#manageTitle").text(months[currentMonth]+" "+currentYear);
    }
    else if(timeFrame == "quarter"){
      $("#manageTitle").text(quarters[currentQuarter]+" "+currentYear);
    }
    else if(timeFrame == "semiannual"){
      $("#manageTitle").text(annuals[currentSemiAnnual]+" "+currentYear);
    }
    else if(timeFrame == "annual"){
      $("#manageTitle").text(currentYear);
    }
    else{
      $("#manageTitle").text(timeLabelValues[0]);      
    }

    data.datasets[0].data = timeDataValues;
    data.labels = timeLabelValues;

    var myNewChart = new Chart(ctx).Line(data,options);
  };

  var getPowerDataRefresh;

  $("#manageUnit").on('shown.bs.modal', function () {
    getPowerDataRefresh = setInterval(function () { getUpdatedPowerData() }, 5000);
  });

  //clearing setInterval event of gettingUpdatedPowerData function upon closing of manage modal
  $("#manageUnit").on('hidden.bs.modal', function () {
    dashboardBtnIsClicked = false;
    clearInterval(getPowerDataRefresh);
  });

  $(".timeFrameBtn").click(function(){
    timeFrame = this.getAttribute('data-rf');
    $(".timeFrameBtn").attr("class", "btn btn-default timeFrameBtn");
    $(this).attr("class", "btn btn-primary timeFrameBtn");
    resetTimelineToCurrent();
    executeUpdate();
  });

});

///////////////////////init of chart diagram/////////////////////////////////////


    //Get the context of the canvas element we want to select
    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
      labels : [],
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : []
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
      animationEasing : "easeOutQuad",

      //Function - Fires when the animation is complete
      onAnimationComplete : null
    };

    var myNewChart = new Chart(ctx).Line(data,options);