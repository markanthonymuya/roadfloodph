$(document).ready(function () {
	
	var units = {};
	var parentId = 0;
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

	var setRegistrationInput = function(parentId){
		$("#unitCodeUpdate").val(units['unitId'+parentId]);
		$("#unitNumberUpdate").val(units['unitSimNumber'+parentId]);
		$("#unitViewingUpdate").val(units['unitViewing'+parentId]);
		$("#unitRegionFormUpdate").val(units['unitRegion'+parentId]);
		$("#unitNameFormUpdate").val(units['unitName'+parentId]);
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
					  		setRegistrationInput(parentId);
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
								//be visible
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
	});

	$("#updateUnitBtn").click(function(){
			var data = {unitCode: units['unitId'+parentId], unitNumber: $("#unitNumberUpdate").val(), unitViewing: $("#unitViewingUpdate").val(), unitRegion: $("#unitRegionFormUpdate").val(), unitName: $("#unitNameFormUpdate").val()};
			$.post("http://roadfloodph.cloudapp.net/roadfloodph/updateUnit.php", data, function (result) {
			alert("You've successfully registered your unit.")
			$("#updateUnit").modal('hide');
			clearUpdateInput();
	    });
	});

});