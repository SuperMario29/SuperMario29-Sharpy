function PopulatePlan(plan,id,visible) {
    var strPlan = plan.getAttribute("title");
    var strID = id;
    var strV = visible;
    var cat = plan.getAttribute("itemprop");

    document.getElementById("planName").value = strPlan;
    document.getElementById("hiddenID").value = strID;

    var dd = document.getElementById("tocat");

    jQuery(function ($) {
        $(".chzn-select").chosen();
        $('option').prop('selected', false);
        if (cat != null && cat != "") {
            var item = cat.split(',');
            var length = item.length;
            for (var i = 0; i < length; i++) {
                $('#' + item[i]).attr('selected', true);
            }
        }
        
        $('#tocat').trigger("liszt:updated");
    })
    

    document.getElementById("planVis").options.value = visible;
    document.getElementById("isPremium").removeAttribute("checked");
    document.getElementById("isPremium").setAttribute("hidden", "hidden");
    document.getElementById("planLabelPre").setAttribute("hidden", "hidden");
    document.getElementById("planVis").removeAttribute("hidden");
    document.getElementById("planLabelVis").removeAttribute("hidden");

    return true;
}

function PopulatePrePlan(plan, id) {
    var strPlan = plan.getAttribute("title");
    var strID = id;
    var cat = plan.getAttribute("itemprop");

    jQuery(function ($) {
        $(".chzn-select").chosen();
        $('option').prop('selected', false);
        if (cat != null && cat != "") {
            var item = cat.split(',');
            var length = item.length;
            for (var i = 0; i < length; i++) {
                $('#' + item[i]).attr('selected', true);
            }
        }

        $('#tocat').trigger("liszt:updated");
    })

    document.getElementById("planName").value = strPlan;
    document.getElementById("hiddenID").value = strID;
    document.getElementById("planLabelPre").removeAttribute("hidden");
    document.getElementById("isPremium").removeAttribute("hidden");
    document.getElementById("isPremium").setAttribute("checked", "checked");
    document.getElementById("planVis").setAttribute("hidden", "hidden");
    document.getElementById("planLabelVis").setAttribute("hidden", "hidden");

    return true;
}

function PopulateCase(id, name) {
    var strPlan = name.getAttribute("title");
    var strID = id;

    document.getElementById("caseName").value = strPlan;
    document.getElementById("hiddenID").value = strID;

    document.forms["form1"].submit();
    return true;
}

function PopulateID(sel) {
    if (sel.options[sel.selectedIndex].value != null) {
        var value = sel.options[sel.selectedIndex].value;
        document.getElementById("hiddendisassignment").value = value;
    }
}

function PopulateClient(id, email) {
    var strID = id;
    var strEmail = email.getAttribute("title");

    document.getElementById("hiddenID").value = strID;
    document.getElementById("hiddenEmail").value = strEmail;
    document.getElementById("toplan").removeAttribute("disabled");
    document.forms["form1"].submit();
    return true;

}

function PopulateManage(id) {
    var strID = id;
    document.getElementById("hiddenID").value = strID;
    return true;

}

function PopulateExercise(exer, id) {
    var strExtra = exer.getAttribute("title");
    var strID = id;

    document.getElementById("exerciseName").value = strExtra;
    document.getElementById("hiddenID").value = strID;
    document.forms["form1"].submit();
    return true;
}

function PopulateClientExercise(exer, id) {
    var strExtra = exer.getAttribute("title");
    var strID = id;

    document.getElementById("exerciseName").value = strExtra;
    document.getElementById("hiddenID").value = strID;
    document.getElementById("updateForm").value = strID;
    document.forms["form1"].submit();
    return true;
}

function goToPeer(id) {
    document.location.href = "/Profile/Peerview/" + id;
}

function EncryptEmail(item) {
    if (item.checked) {
        document.getElementById("password").removeAttribute("hidden");
        document.getElementById("passwordLabel").removeAttribute("hidden");
    }
    else {
        document.getElementById("password").setAttribute("hidden", "hidden");
        document.getElementById("passwordLabel").setAttribute("hidden", "hidden");
    }
}

function TakePic() {
    document.getElementById("canvas").removeAttribute("hidden");
    return false;
}

function DisableAccount(id){
    $.jqDialog.confirm("Are you sure want to disable your account?",
	function () {
	    $.post('/Dynamic/disable/' + id); document.location.href = "/Account/Logout";
	},		// callback function for 'YES' button
	function () { }		// callback function for 'NO' button
);
    return false;
}

function DeleteAccount() {
    $.jqDialog.confirm("Are you sure want to delete your account?",
	function () {
	    $.post('/Dynamic/delete/'); document.location.href = "/Account/Logout";
	},		// callback function for 'YES' button
	function () { }		// callback function for 'NO' button
);
    return false;
}

function isChecked(item) {
    if (item.checked) {
        document.getElementById("planVis").setAttribute("hidden", "hidden");
        document.getElementById("planLabelVis").setAttribute("hidden", "hidden");
    }
    else {
        document.getElementById("planVis").removeAttribute("hidden");
        document.getElementById("planLabelVis").removeAttribute("hidden");
    }
}

function assignTherapist(sel, id) {
    if (sel.options[sel.selectedIndex].value != null) {
        var strID = id;

        var value = sel.options[sel.selectedIndex].value;
        document.getElementById("hiddenTherapist").value = value;
        document.getElementById("hiddenID").value = strID;
    }
    else {

    }
}


    function changeStatus(id,isbool) {
        var strID = id;
        var isCheck = isbool;

        document.getElementById("hiddenID").value = strID;
        document.getElementById("updateCheck").value = isCheck;
        document.forms["form1"].submit();
    }

    function RemovePlan(id) {
        document.getElementById("hiddenID").value = id;
        return true;
    }

    function RemoveExercise(id) {
        document.getElementById("hiddenID").value = id;
        return true;

    }

    function RemoveCase(id) {
        document.getElementById("hiddenID").value = id;
        return true;
    }

    
    function RemoveProduct(id) {
        $.post('/Dynamic/RemovePro/' + id);
        $('#RI' + id).remove();
        return true;
    }

    function searchPeer() {
        var searchLocation = document.getElementById("findSearch").value;

        var strSearch = document.getElementById("searchTxt").value;

        var firstName = strSearch.split(" ")[0];
        var firstUp = firstName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        if (searchLocation == "Name") {
            if (strSearch.split(" ")[1] != null) {

                var lastName = strSearch.split(" ")[1];
                var lastUp = lastName.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

                var findURL = document.getElementById("searchURL").getAttribute("href").replace("#", "Profile/Search/" + firstUp + " " + lastUp);

                document.location.href = "/Profile/Search/" + firstUp + " " + lastUp;

            }
            else {
                var findURL = document.getElementById("searchURL").getAttribute("href").replace("#", "Profile/Search/" + firstUp);

                document.location.href = "/Profile/Search/" + firstUp;
            }
        }
        else {
            var findURL = document.getElementById("searchURL").getAttribute("href").replace("#", "Profile/SearchLocate/" + strSearch);

            document.location.href = "/Profile/SearchLocate/" + strSearch;
        }

        return true;
    }

    function fileUpload() {
        var context = document.getElementById("canvas");
        context.clearRect(0, 0, 250, 250);
    }


    function DeleteMessage() {
        document.getElementById("messageChange").value = "Delete"
    }

    function findPeer() {
        var peer = "";

        peer = document.getElementById("receiver").value;
    
        for (i in item)
        {
            if (i.firstName[0] == peer[0].toUpperCase)
            {
                $("#peersList").append('<option value='+i.firstName+' '+i.lastName+'>'+i.firstName+' '+i.lastName+'</option>');
            }
        }
    }

    function flag(id) {
        $.jqDialog.confirm("Are you sure want to flag this user?",
        function () { $.post('/Dynamic/flag/' + id); },		// callback function for 'YES' button
        function () { }		// callback function for 'NO' button
    );
        return false;
    }

    function userFavoriteCase(caseID, userID, type, caseN) {
        $.jqDialog.confirm("Are you sure want to favor this case study?",
        function () {
            $.post('/Dynamic/u_favorite_case/' + caseID + '/' + userID + '/' + type);
            if (type) {
                caseN.setAttribute("opacity", 0);
                var value = "userFavoriteCase(" + caseID + "," + userID + ",false,this)";
                caseN.setAttribute("onclick", value);
            }
            else {
                caseN.setAttribute("opacity",0.4);
                var value = "userFavoriteCase(" + caseID + "," + userID + ",true,this)";
                caseN.setAttribute("onclick", value);
            }
        },		// callback function for 'YES' button
        function () { }		// callback function for 'NO' button
    );
        return false;
    }

    function userFavoritePlan(planID, userID, type,plan) {
        $.jqDialog.confirm("Are you sure want to favor this plan?",
        function () {
            $.post('/Dynamic/u_favorite_plan/' + planID + '/' + userID + '/' + type);
            if (type) {
                plan.setAttribute("opacity", 0);
                var value = "userFavoritePlan("+planID+","+userID+",false,this)";
                plan.setAttribute("onclick", value);
            }
            else {
                plan.setAttribute("opacity", 0.4);
                var value = "userFavoritePlan(" + planID + "," + userID + ",true,this)";
                plan.setAttribute("onclick", value);
            }
        },		// callback function for 'YES' button
        function () { }		// callback function for 'NO' button
    );
        return false;
    }

    function planLike(planID, favor) {
        $.jqDialog.alert("You Like This Plan!!", function () {	// callback function for 'OK' button
            alert("You Like This Plan");
        });
        $.post('/Dynamic/like_plan/' + planID + '/' + favor);
        return false;
    }

    function planBorrow(planID, userID) {
        $.jqDialog.confirm("Are you sure want to take this plan?",
        function () { $.post('/Dynamic/borrow_plan/' + planID + '/' + userID); },		// callback function for 'YES' button
        function () { }		// callback function for 'NO' button
    );
        return false;
    }

    function caseLike(planID, favor) {
        $.jqDialog.alert("You Like This Case Study!!", function () {	// callback function for 'OK' button
            alert("You Like This Case Study");
        });
        $.post('/Dynamic/like_case/' + planID + '/' + favor);
        return false;
    }

    function caseBorrow(planID, userID) {
        $.jqDialog.confirm("Are you sure want to take this case study?",
        function () { $.post('/Dynamic/borrow_case/' + planID + '/' + userID); },		// callback function for 'YES' button
        function () { }		// callback function for 'NO' button
    );
        return false;
    }

    function findPlan(sel) {
        var value = sel.options[sel.selectedIndex].value;
        if (value == "Peer") {
            document.getElementById("tocatPlan").setAttribute("hidden", "hidden");
            document.getElementById("FindP").setAttribute("hidden", "hidden");
            document.getElementById("planfindstate").setAttribute("hidden", "hidden");
            $('#planLoad').load('/Dynamic/findPlan/' + value);
            return false;
        }
        else if (value == "State") {
            document.getElementById("planfindstate").removeAttribute("hidden");
            document.getElementById("tocatPlan").setAttribute("hidden", "hidden");
            document.getElementById("FindP").setAttribute("hidden", "hidden");
        }

        else if (value == "Category") {
            document.getElementById("tocatPlan").removeAttribute("hidden");
            document.getElementById("FindP").removeAttribute("hidden");
            document.getElementById("planfindstate").setAttribute("hidden", "hidden");
        }
        else {
            document.getElementById("planfindstate").setAttribute("hidden", "hidden");
            document.getElementById("tocatPlan").setAttribute("hidden", "hidden");
            document.getElementById("FindP").setAttribute("hidden", "hidden");
        }
    }

    function findCase(sel) {
        var value = sel.options[sel.selectedIndex].value;
        if (value == "Peer") {
            document.getElementById("tocatCase").setAttribute("hidden", "hidden");
            document.getElementById("FindCS").setAttribute("hidden", "hidden");
            document.getElementById("casefindstate").setAttribute("hidden", "hidden");
            $('#caseLoad').load('/Dynamic/findCase/' + value);
            return false;
        }
        else if (value == "State") {
            document.getElementById("casefindstate").removeAttribute("hidden");
            document.getElementById("tocatCase").setAttribute("hidden", "hidden");
            document.getElementById("FindCS").setAttribute("hidden", "hidden");
        }
        else if (value == "Category") {
            document.getElementById("casefindstate").setAttribute("hidden", "hidden");
            document.getElementById("tocatCase").removeAttribute("hidden");
            document.getElementById("FindCS").removeAttribute("hidden");
        }
        else {
            document.getElementById("casefindstate").setAttribute("hidden", "hidden");
            document.getElementById("tocatCase").setAttribute("hidden", "hidden");
            document.getElementById("FindCS").setAttribute("hidden", "hidden");
        }
    }


    function limitText(limitField, limitCount, limitNum) {
        if (limitField.value.length > limitNum) {
            limitField.value = limitField.value.substring(0, limitNum);
        } else {
            limitCount.value = limitNum - limitField.value.length;
        }
    }

    function unhideML() {
        var item = document.getElementById("occupation").value;
        if (item == "Occupational Therapist" || item == "Physical Therapist") {
            document.getElementById("licenseNumber").style.visibility = "visible";
            document.getElementById("idLicense").style.visibility = "visible";
        }
        else {
            document.getElementById("licenseNumber").style.visibility = "";
            document.getElementById("idLicense").style.visibility = "";
        }
    }

    function FindCS() {
        var category = document.getElementById("tocatCase").value;
        $('#caseLoad').load('/Dynamic/findCaseCat/' + value);
    }

    function FindPlan() {
        var category = document.getElementById("tocatPlan").value;
        $('#planLoad').load('/Dynamic/findPlanCat/' + value);
    }

    function PlanfindState(sel) {
        var value = sel.options[sel.selectedIndex].value;
        $('#planLoad').load('/Dynamic/findPlan/' + value);
        return false;
    }

    function CasefindState(sel) {
        var value = sel.options[sel.selectedIndex].value;
        $('#caseLoad').load('/Dynamic/findCase/' + value);
        return false;
    }

    function ProductfindState(sel) {
        var value = sel.options[sel.selectedIndex].value;
        $('#planLoad').load('/Dynamic/findProduct/' + value);
        return false;
    }

    function FindProductCat() {
        var category = document.getElementById("tocatProduct").value;
        $('#productLoad').load('/Dynamic/findProductCat/' + value);
    }

function FindProductGuest() {
    var cat = document.getElementById("tocatProduct");
    var x = 0;
    var category = "";
    for (x = 0; x < cat.length; x++) {
        if (cat[x].selected) {
            category = category + "," + cat[x].value;
        }
    }

    var state = document.getElementById("productfindstate").value;
    if (category == "") {
        category = ",N-A";
    }
    $('#productLoad').load('/Dynamic/findProductGuest/' + category.substring(1) +'/'+state);
}

function FindProductClient() {
    var cat = document.getElementById("tocatProduct");
    var category = "";
    for (x = 0; x < cat.length; x++) {
        if (cat[x].selected) {
            category = category + "," + cat[x].value;
        }
    }
    var state = document.getElementById("productfindstate").value;
    var tPerson = document.getElementById("toT").value;
    if (category == "") {
        category = ",N-A";
    }
    if (state == "") {
        state = "N-A";
    }
    $('#productLoad').load('/Dynamic/findProduct/' + category.substring(1)+'/'+state+'/'+tPerson);
}

function FindProduct() {
    var cat = document.getElementById("tocatProduct");
    var category = "";
    for (x = 0; x < cat.length; x++) {
        if (cat[x].selected) {
            category = category + "," + cat[x].value;
        }
    }
    var state = document.getElementById("productfindstate").value;
    var tPerson = document.getElementById("toPeer").value;
    if (category == "") {
        category = ",N-A";
    }
    if (state == "") {
        state = "N-A";
    }
    $('#productLoad').load('/Dynamic/findProduct/' + category.substring(1)+'/'+state+'/'+tPerson);
}
