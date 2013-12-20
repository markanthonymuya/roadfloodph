$(document).ready(function () {
	
	var units = {};
	var parentId = 0;
	var frequency = 0.5;
	var smsNotif = "activated";

	$("#myChart").hide();

	var clearRegistrationInput = function(){
		$("#unitCode").val("");
		$("#unitNumber").val("");
		$("#unitViewing").val("");
		$("#unitRegionForm").val("");
		$("#unitNameForm").val("");
	}

	var clearUpdateInput = function(){
		$("#unitCodeUpdate").val("");
		$("#unitNumberUpdate").val("");
		$("#unitViewingUpdate").val("");
		$("#unitRegionFormUpdate").val("");
		$("#unitNameFormUpdate").val("");
	}

	var setUpdateInfoInput = function(parentId){
		$("#unitCodeUpdate").val(units['unitId'+parentId]);
		$("#unitNumberUpdate").val(units['unitSimNumber'+parentId]);
		$("#unitViewingUpdate").val(units['unitViewing'+parentId]);
		$("#unitRegionFormUpdate").val(units['unitRegion'+parentId]);
		$("#unitNameFormUpdate").val(units['unitName'+parentId]);
		frequency = units['unitFreq'+parentId];
		console.log(frequency);
		for(var k = 1; k <= 10; k++){
			if(frequency == $("#freqId"+k).attr('data-rf')){
				$(".frequencyBtn").attr("class", "btn btn-default frequencyBtn");
				$("#freqId"+k).attr("class", "btn btn-primary frequencyBtn");
			}
		}
		smsNotif = units['unitStatus'+parentId];
		console.log(smsNotif);
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
		//get all units related to the owner
		$.post("http://roadfloodph.cloudapp.net/roadfloodph/searchUnit.php", {ownerId: "1"}, function (result) {
			units = result;
			console.log(units);
			
			if(service='manageUnit'){
				$("#loadingImage").hide();
				if(units['generalCounter']>0){
					for(var i = 1; i <= units['generalCounter']; i++){
						$("#manageBody").append('<p class="appendedBodyMsg" id="appended'+i+'"><span data-rf="'+i+'" id="unitName'+i+'">'+units['unitName'+i]+'<button id="dashboardBtn'+i+'" style="margin-left: 10px;" class="btn btn-primary pull-right dashboardBtn">Dashboard</button><button id="activateBtn'+i+'" style="margin-left: 10px;" class="btn btn-warning pull-right activateBtn">Activate</button><button id="editBtn'+i+'" class="btn btn-default pull-right editBtn"><span class="glyphicon glyphicon-wrench"></span></button></p></span><br class="appendedBodyMsg">');
						
						var status = units['unitAT'+i];
						if(status=='' || status == null){
							$("#dashboardBtn"+i).hide();
							$("#editBtn"+i).hide();
						}
						else{
							$("#activateBtn"+i).hide();
						}
					}

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
						for(var j = 1; j <= units['generalCounter']; j++){
							if (j == unitDashboardValue) {
								$("#timelineNav").show();
							}
							else{
								$("#appended"+j).hide();
							}
						}
						$('#manageModal').attr("style", "width: 900px;");
						$("#myChart").show("slow");
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

	$("#registerUnit").on('shown.bs.modal', function (){
		$("#registerNewUnit").click(function(){
			var data = {unitCode: $("#unitCode").val(), unitNumber: $("#unitNumber").val(), unitViewing: $("#unitViewing").val(), unitRegion: $("#unitRegionForm").val(), unitName: $("#unitNameForm").val(), ownerId: "1"};
			$.post("http://roadfloodph.cloudapp.net/roadfloodph/registerUnit.php", data, function (result) {
				alert("You've successfully registered your unit.")
				$("#registerUnit").modal('hide');
				clearRegistrationInput();
		    });
		});
	});

	$("#manageUnit").on('show.bs.modal', function () {
		getUnits('manageUnit');
	});

	$("#manageUnit").on('shown.bs.modal', function () {
		
	});

	$("#manageUnit").on('hidden.bs.modal', function () {
		$(".appendedBodyMsg").remove();
		$("#loadingImage").show();
		$("#myChart").hide();
		$('#manageModal').attr("style", "");
		$("#timelineNav").hide();		
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

	$("#updateUnitBtn").click(function(){
		var data = {unitCode: units['unitId'+parentId], unitNumber: $("#unitNumberUpdate").val(), unitViewing: $("#unitViewingUpdate").val(), unitRegion: $("#unitRegionFormUpdate").val(), unitName: $("#unitNameFormUpdate").val(), unitStatus: smsNotif, unitFrequency: frequency};
		$.post("http://roadfloodph.cloudapp.net/roadfloodph/updateUnit.php", data, function (result, status) {
			if(status == "success"){
				alert("You've successfully updated your roadflood unit settings.");
				$("#updateUnit").modal('hide');
				clearUpdateInput();
			}
			else{
				alert("There's a problem submitting your info update. It might be a network problem or system maintenance. Please try it again later.");
			}
		});
	});

});