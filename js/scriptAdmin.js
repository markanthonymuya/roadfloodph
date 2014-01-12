$(document).ready(function(){
	function setCookie(c_name,value,exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

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

	function unsetCookies(){
		setCookie("email", "",3);
		setCookie("adminFullname", "",3);
		setCookie("adminLinks", "", 3);
		setCookie("username","",3);		
	}

	if(getCookie("email") == undefined || getCookie("adminLinks") == undefined || getCookie("adminFullname")== undefined || getCookie("email") == "" || getCookie("adminLinks") == "" || getCookie("adminFullname")== ""){
		var login = false;
		$("#adminLoginMsg").hide();
		$("#adminLogin").modal('show');
		
		$('#adminLogin').on('shown.bs.modal', function () {
			$("#adminUsername").focus();
		});

		$('#adminLogin').on('hidden.bs.modal', function () {
			if(login == false){
				location.href="/";
			}
			console.log(getCookie("username"));
		});

		$("#adminUserLogin").click(function(){
			var adminUsername = $("#adminUsername").val();
			var adminPassword = $("#adminPassword").val();
			$("#adminLoginMsg").hide();


			if(adminUsername != "" && adminPassword != ""){
				$.post("/roadfloodph/admin.php", {username: adminUsername, password: adminPassword}, function(json){
					if(json.query){
						$("#adminDropDown").prepend(json.adminLinks);
						$(".myUsername").text(json.username);
						$(".myUsername").append('<b class="caret">');
						$("#adminLogin").modal('hide');
						setCookie("email",adminUsername,3);
						setCookie("adminFullname",json.username,3);
						setCookie("adminLinks", json.adminLinks, 3);
						setCookie("username",adminUsername,3);
						$("#registerOwner").click(function(){
							$("#registerTitle").text("Register New Unit Owner");
							registrationType = "owner";
							$("#addNewAdmin").modal('show');
						});

						$("#registerAdmin").click(function(){
							$("#registerTitle").text("Register New Admin");
							registrationType = "admin";
							$("#addNewAdmin").modal('show');
						});
						login = true;
					}
					else{
						$("#adminLoginMsg").text("Your username and password is not found in the list of Admins.");
						$("#adminLoginMsg").show();
						$("#adminUsername").focus("");
						login = false;
					}
				});
			}
			else{
				$("#adminLoginMsg").show();
				$("#adminLoginMsg").text("Please do not leave any fields blank.");
			}
		});
	}
	else{
		$("#adminDropDown").prepend(getCookie("adminLinks"));
		$(".myUsername").text(getCookie("adminFullname"));
		$(".myUsername").append('<b class="caret">');
		
		$("#registerOwner").click(function(){
			$("#registerTitle").text("Register New Unit Owner");
			registrationType = "owner";
			$("#addNewAdmin").modal('show');
		});

		$("#registerAdmin").click(function(){
			$("#registerTitle").text("Register New Admin");
			registrationType = "admin";
			$("#addNewAdmin").modal('show');
		});
	}

	
	/////////////////////////////////Submitting New Amdmin User////////////////////////
	$("#registrationAdminMsg").hide();
	$("#signInBtn").hide();
	var registrationType;

	$("#registerNewAdmin").click(function(){
		var fullName = $("#newAdminFullName").val();
		var simNumber = $("#newAdminSimNumber").val();
		var desiredEmailAddress = $("#newAdminEmail").val();
		var password = $("#newAdminPassword").val();
		var retypePassword = $("#newAdminPasswordRetype").val();
		var confirmAdminPassword = $("#confirmAdminPasswordNewAdmin").val();

		if(fullName != "" && simNumber != "" && desiredEmailAddress != "" && password != "" && retypePassword != "" && confirmAdminPassword != ""){
			$("#registrationAdminMsg").hide();
			$("#registerNewAdmin").attr("disabled", true);
			var searchPosition = simNumber.search(/.+639/);

			if(password != retypePassword){
				$("#registrationAdminMsg").text("Your desired password does not match the retype.");
				$("#registrationAdminMsg").show();
				$("#registerNewAdmin").attr("disabled", false);					
			}
			else if(searchPosition == 0 && simNumber.length == 13){
				simNumber = simNumber.replace("+63", "");
				var data = {adminFullName: fullName, adminSimNumber: simNumber, adminEmail: desiredEmailAddress, desiredPassword: password, myAdminEmail: getCookie("email"), myAdminPassword: confirmAdminPassword, regType: registrationType};
				
				$.post("/roadfloodph/registerAdmin.php", data, function (response) {
					if(response == "successful"){
						getUpdatedData();
						alert("You've successfully registered new privilege user.");
						$("#addNewAdmin").modal('hide');
						clearAdminInput();
					}
					else if(response == "email existing"){
						$("#registrationAdminMsg").text("E-mail already in use.");
						$("#registrationAdminMsg").show();
						$("#unitCode").focus();
					}
					else if(response == "not valid admin password"){
						$("#confirmAdminPasswordNewAdmin").val("");
						$("#confirmAdminPasswordNewAdmin").focus();
						$("#registrationAdminMsg").text("Your current user password does not match our database.");
						$("#registrationAdminMsg").show();
						$("#unitNumber").focus();
					}
					$("#registerNewAdmin").attr("disabled", false);
			    });
			}
			else{
				$("#registrationAdminMsg").text("It seems that your contact number is not in desired format or incomplete.");
				$("#registrationAdminMsg").show();
				$("#registerNewAdmin").attr("disabled", false);					
			}
		}
		else{
			$("#registrationAdminMsg").text("Please do not leave empty input boxes.");
			$("#registrationAdminMsg").show();
		}
	});

	var clearAdminInput = function(){
		$("#newAdminFullName").val("");
		$("#newAdminSimNumber").val("");
		$("#newAdminEmail").val("");
		$("#newAdminPassword").val("");
		$("#newAdminPasswordRetype").val("");
		$("#confirmAdminPasswordNewAdmin").val("");
	}

	$("#signOut").click(function(){
		setCookie("email","",3);
		setCookie("adminFullname","",3);
		setCookie("adminLinks", "", 3);
	});

});