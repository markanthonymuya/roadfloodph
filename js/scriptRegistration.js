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
	
	var units = {};
	var parentId = 0;
	var frequency = 0.5;
	var smsNotif = "activated";

	$("#myChart").hide();
	$("#registrationMsg").hide();
	$("#breakInChartUI").hide();


	var clearRegistrationInput = function(){
		$("#unitCode").val("");
		$("#unitNumber").val("");
		$("#unitViewing").val("public");
		$("#unitRegionForm").val("ncr");
		$("#unitNameForm").val("");
		$("#smsIdentification").val("");
	}

	var clearUpdateInput = function(){
		$("#unitCodeUpdate").val("");
		$("#unitNumberUpdate").val("");
		$("#unitViewingUpdate").val("public");
		$("#unitRegionFormUpdate").val("ncr");
		$("#unitNameFormUpdate").val("");
		$("#smsIdentificationUpdate").val("");
	}

	var setUpdateInfoInput = function(parentId){
		$("#unitCodeUpdate").val(units['unitCode'+parentId]);
		$("#unitNumberUpdate").val("+63"+units['unitSimNumber'+parentId]);
		$("#unitViewingUpdate").val(units['unitViewing'+parentId]);
		$("#unitRegionFormUpdate").val(units['unitRegion'+parentId]);
		$("#unitNameFormUpdate").val(units['unitName'+parentId]);
		$("#smsIdentificationUpdate").val(units['unitSmsCode'+parentId]);
		frequency = units['unitFreq'+parentId];
		for(var k = 1; k <= 10; k++){
			if(frequency == $("#freqId"+k).attr('data-rf')){
				$(".frequencyBtn").attr("class", "btn btn-default frequencyBtn");
				$("#freqId"+k).attr("class", "btn btn-primary frequencyBtn");
			}
		}
		smsNotif = units['unitSmsNotif'+parentId];
		if(smsNotif == "activated"){
			$("#smsNotifON").attr("class", "btn btn-primary smsNotifBtn");
			$("#smsNotifOFF").attr("class", "btn btn-default smsNotifBtn");
		}
		else if(smsNotif == "deactivated"){
			$("#smsNotifON").attr("class", "btn btn-default smsNotifBtn");
			$("#smsNotifOFF").attr("class", "btn btn-primary smsNotifBtn");
		}
	}

	var getUnits = function(service){
		var usersEmailAddress = getCookie("username");
		//get all units related to the owner
		if(usersEmailAddress == "" || usersEmailAddress == undefined || usersEmailAddress == null){
			usersEmailAddress = "public";
		}

		$.post("http://roadfloodph.cloudapp.net/roadfloodph/searchUnit.php", {emailAddress: usersEmailAddress}, function (result) {
			units = result;
			console.log(units);
			var stringSettings = "";
			if(location.href == "http://roadfloodph.cloudapp.net/admin/"){
				stringSettings = '<button id="editBtn'+i+'" class="btn btn-default pull-right editBtn"><span class="glyphicon glyphicon-wrench"></span></button>';
			}			
			if(service='manageUnit'){
				$("#loadingImage").hide();
				if(units['generalCounter']>0){
					for(var i = 1; i <= units['generalCounter']; i++){
						$("#manageBody").append('<p class="appendedBodyMsg" id="appended'+i+'"><span data-rf="'+i+'" id="unitName'+i+'">'+units['unitName'+i]+'<button id="dashboardBtn'+i+'" style="margin-left: 5px;" class="btn btn-primary pull-right dashboardBtn">Dashboard</button><button type="button" class="btn btn-default pull-right backButton" style="margin-left: 5px;"><span class="glyphicon glyphicon-backward"></span> Back<button id="activateBtn'+i+'" style="margin-left: 5px;" class="btn btn-warning pull-right activateBtn">Activate</button>'+stringSettings+'<span id="batteryId'+i+'" class="btn btn-default batteryLabel pull-right" style="margin-right: 5px;"><img class="batteryLabel" src="../assets/ico/battery.png" style="display: inline;" /><span class="batteryLabelText"> '+units["unitPowerLevel"+i]+'</span>%</span><span class="noticeDetails pull-right" style="margin-right: 200px;">Click chart to see detailed view</span></p></span><br class="appendedBodyMsg breaks">');
						$(".backButton").hide();
						$(".noticeDetails").hide();
						$(".batteryLabel").hide();
						var status = units['unitAT'+i];
						if(status=='' || status == null){
							$("#dashboardBtn"+i).hide();
							$("#editBtn"+i).hide();
						}
						else{
							$("#activateBtn"+i).hide();
						}
					}

					$(".backButton").click(function(){
						  resetTimelineToCurrent();
					      $(".backButton").hide();
      					  $(".dashboardNav").hide();
      					  $("#manageTitle").text("Manage");
					      $("#breakInChartUI").hide("slow");
					      $(".appendedBodyMsg").remove();
					      $("#loadingImage").show();
					      $("#myChart").hide("slow");
					      $('#manageModal').attr("style", "");
					      $("#timelineNav").hide();
					      getUnits('manageUnit');
					  });

					$(".editBtn").click(function(){
						parentId = this.parentNode.getAttribute('data-rf');
						$("#manageUnit").modal('hide');
						$("#updateUnit").on('shown.bs.modal', function (e) {
					  		setUpdateInfoInput(parentId);
						});					
						$("#updateUnit").modal('show');
					});

					$(".activateBtn").click(function(){
						window.location.assign("http://roadfloodph.cloudapp.net/redirect/");
					});

					$(".dashboardBtn").click(function(){
						var unitDashboardValue = this.parentNode.getAttribute('data-rf');

						//upon clicking dashboardBtn, update to smsLogsJson must be done to change
						//datasets with respect to the unitSimNumber
						smsUpdateLogs(units['unitSimNumber'+unitDashboardValue]);

						$(".breaks").hide();
						for(var j = 1; j <= units['generalCounter']; j++){
							if (j == unitDashboardValue) {
								//skips to hide the equivalent id number
							}
							else{
								$("#appended"+j).hide();
							}
						}
						$("#breakInChartUI").show("slow");
						$("#loadingImage").show();
      					$(".backButton").show();
      					$(".batteryLabel").show();
      					$(".dashboardBtn").hide();
					});
				}
				else{
					$("#manageBody").append('<center class="appendedBodyMsg"><p>Getting started?</p><button id="gettingStarted" class="btn btn-warning">Register New Unit</button></center>');
					$("#gettingStarted").click(function(){
						$('#manageUnit').modal('hide');
						$('#registerUnit').modal('show');
					});
				}
			}
		});
	};


	$("#manageUnit").on('show.bs.modal', function () {
		getUnits('manageUnit');
	});

	$("#manageUnit").on('hidden.bs.modal', function () {
		resetTimelineToCurrent();
		$("#manageTitle").text("Manage");
      	$(".dashboardNav").hide();
		$(".appendedBodyMsg").remove();
		$("#loadingImage").show();
		$("#myChart").hide();
		$('#manageModal').attr("style", "");
		$("#timelineNav").hide();
		detailed = false;		
	});

	$(".frequencyBtn").click(function(){
		frequency = this.getAttribute('data-rf');
		$(".frequencyBtn").attr("class", "btn btn-default frequencyBtn");
		$(this).attr("class", "btn btn-primary frequencyBtn");
	});

	$(".smsNotifBtn").click(function(){
		smsNotif = this.getAttribute('data-rf');
		$(".smsNotifBtn").attr("class", "btn btn-default smsNotifBtn");
		$(this).attr("class", "btn btn-primary smsNotifBtn");
	});

	$("#registerUnit").on('shown.bs.modal', function (){
		$("#unitCode").focus();
	});

	$("#registerNewUnit").click(function(){
		$("#registrationMsg").hide();
			
		if($("#unitCode").val() != "" && $("#unitNumber").val() != "" && $("#unitNameForm").val() != "" && $("#smsIdentification").val() != ""){
			$("#registerNewUnit").attr("disabled", true);
			var unitNumberForm = $("#unitNumber").val();
			var searchPosition = unitNumberForm.search(/.+639/);

			if(searchPosition == 0 && unitNumberForm.length == 13){
				unitNumberForm = unitNumberForm.replace("+63", "");
				var data = {unitCode: $("#unitCode").val(), unitNumber: unitNumberForm, unitViewing: $("#unitViewing").val(), unitRegion: $("#unitRegionForm").val(), unitName: $("#unitNameForm").val(), emailAddress: getCookie("username"), unitSmsKeyword: $("#smsIdentification").val()};

				$.post("http://roadfloodph.cloudapp.net/roadfloodph/registerUnit.php", data, function (response) {
					console.log(response);
					if(response == "successful"){
						getUpdatedData();
						alert("You've successfully registered your unit.");
						$("#registerUnit").modal('hide');
						clearRegistrationInput();
					}
					else if(response == "unit code unavailable"){
						$("#registrationMsg").text("Unit code is not available. Please try another code.");
						$("#registrationMsg").show();
						$("#unitCode").focus();
					}
					else if(response == "keyword unavailable"){
						$("#registrationMsg").text("Your SMS Identification code is already in use. Please try another desired code.");
						$("#registrationMsg").show();
						$("#unitNumber").focus();
					}
					else if(response == "cannot find your owner id"){
						$("#registrationMsg").text("Your current account is missing. Please contact us as soon as possible.");
						$("#registrationMsg").show();
						$("#unitCode").focus();
					}
					$("#registerNewUnit").attr("disabled", false);
			    });
			}
			else{
				$("#registrationMsg").text("It seems that your unit SIM number is not in desired format or incomplete.");
				$("#registrationMsg").show();
				$("#registerNewUnit").attr("disabled", false);					
			}
		}
		else{
			$("#registrationMsg").text("Please do not leave empty input boxes.");
			$("#registrationMsg").show();
		}
	});
	
	$("#updateUnitBtn").click(function(){
		$("#updateMsg").hide();
		
		if($("#unitNumberUpdate").val() != "" && $("#unitNameFormUpdate").val() != ""){
			$("#updateUnitBtn").attr("disabled", true);
			var unitNumberUpdate = $("#unitNumberUpdate").val();
			var searchPosition = unitNumberUpdate.search(/.+639/);

			if(searchPosition == 0 && unitNumberUpdate.length == 13){
				unitNumberUpdate = unitNumberUpdate.replace("+63", "");
				var data = {unitCode: $("#unitCodeUpdate").val(), unitNumber: unitNumberUpdate, unitViewing: $("#unitViewingUpdate").val(), unitRegion: $("#unitRegionFormUpdate").val(), unitName: $("#unitNameFormUpdate").val(), unitFrequency: frequency, unitSmsNotif: smsNotif};

				$.post("http://roadfloodph.cloudapp.net/roadfloodph/updateUnit.php", data, function (response) {
					if(response == "successful"){
						getUpdatedData();
						alert("You've successfully updated your unit profile.")
						$("#updateUnit").modal('hide');
						clearUpdateInput();
					}
					else{
						$("#updateMsg").text("Something went wrong during update of your unit profile. Please try again later.");
						$("#updateMsg").show();
					}
					$("#updateUnitBtn").attr("disabled", false);
			    });
			}
			else{
				$("#updateMsg").text("It seems that your unit SIM number is not in desired format or incomplete.");
				$("#updateMsg").show();
				$("#updateUnitBtn").attr("disabled", false);					
			}
		}
		else{
			$("#updateMsg").text("Please do not leave empty input boxes.");
			$("#updateMsg").show();
		}
	});

});