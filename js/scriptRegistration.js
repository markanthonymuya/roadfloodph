$(document).ready(function () {
	
	var units = {};

	var getUnits = function(service){
		//get all units related to the owner
		$.post("http://roadfloodph.cloudapp.net/roadfloodph/searchUnit.php", {ownerId: "1"}, function (result) {
			units = result;
			console.log(units);
			
			if(service='manageUnit'){
				$("#loadingImage").hide();
				if(units['generalCounter']>0){
					for(var i = 1; i <= units['generalCounter']; i++){
						$("#manageBody").append('<p class="appendedBodyMsg"><span id="unitName'+i+'">'+units['unitName'+i]+'</span><button id="dashboardBtn'+i+'" style="margin-left: 10px;" class="btn btn-primary pull-right">Dashboard</button><button id="activateBtn'+i+'" style="margin-left: 10px;" class="btn btn-warning pull-right">Activate</button><button id="editBtn'+i+'" class="btn btn-default pull-right">Edit</button></p><br class="appendedBodyMsg">');
						
						var status = units['unitStatus'+i];
						if(status=='not activated'){
							$("#dashboardBtn"+i).hide();
							$("#editBtn"+i).hide();
						}
						else if(status=='activated'){
							$("#activateBtn"+i).hide();
						}
					}
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

	$("#registerNewUnit").click(function(){
		var data = {unitCode: $("#unitCode").val(), unitNumber: $("#unitNumber").val(), unitViewing: $("#unitViewing").val(), unitRegion: $("#unitRegionForm").val(), unitName: $("#unitNameForm").val(), ownerId: "1"};
		$.post("http://roadfloodph.cloudapp.net/roadfloodph/registerUnit.php", data, function (result) {
			alert("You've successfully registered your unit.")
			$("#registerUnit").modal('hide');
			console.log(data);
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
	});

	$("#editBtn").click(function(){
		$("#manageUnit").modal('hide');
		$("#registerUnit").modal('show');
	});

	$("#editSubmitBtn").click(function(){
		$.post("http://roadfloodph.cloudapp.net/roadfloodph/registerUnit.php", {unitCode: $("#unitCode").val(), unitNumber: $("#unitNumber").val(), unitViewing: $("#unitViewing").val(), unitRegion: $("#unitRegionForm").val(), unitName: $("#unitNameForm").val()}, function (result) {
			alert("You've successfully registered your unit.")
			$("#registerUnit").modal('hide');
	    });
	});
});