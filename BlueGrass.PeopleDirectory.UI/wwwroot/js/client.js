var base64String;

var resultsSet;

$(document).ready(function () {
    bindCountryDropDown();
    $('select').formSelect();
    getPeopleDetails();
    $("#clear-icon").hide();

    $('.modal').modal({
        onCloseEnd: function () {
            window.location.reload(true);
        }
    });
});



function getPeopleDetails() {
    var url = "/api/Admin/GetPersonDetails";
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        url: url,
        success: function (data) {
            resultsSet = JSON.parse(data.result);
            initSearchBoxAuto(resultsSet);
            buildPeopleDetailsHTML(JSON.parse(data.result));
        },
        error: function (jqXHR) {

        }
    });
}



function buildPeopleDetailsHTML(elements) {
    $("#people-details-body").html("");
    var peopledetailsbody = "";
    if (elements.length !== 0) {
        for (var i = 0; i < elements.length; i++) {
            var idnetity = i + 1;
            peopledetailsbody += "<tr>\
                        <td>" + idnetity + "</td>\
                        <td class='person-name'>" + elements[i].Name + "</td>\
                        <td class='person-sur-name'>" + elements[i].SurName + "</td>\
                        <td class='person-sur-name'> <a class='modal-trigger'  data-target='viewpersonmodal' href='#viewpersonmodal' onClick=\"triggeViewDetails('"+ elements[i].Id + "');\"> <i class='material-icons'>pageview</i></a></td>\
                        </tr>";
        }
    }
    else {
        peopledetailsbody += "<tr>\
                        <td class='person-name' colspan='3'>No results found</td>\
                        </tr>";
    }
    $("#people-details-body").html(peopledetailsbody);
}


function initSearchBoxAuto(Obj) {
    var contactsArray = Obj;
    var conatactsList = {};
    for (var i = 0; i < contactsArray.length; i++) {
        conatactsList[contactsArray[i].Name] = null;
        conatactsList[contactsArray[i].SurName] = null;
    }
    console.log(conatactsList);
    $('input.autocomplete').autocomplete({
        data: conatactsList,
        limit: 7, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (val) {
            console.log(val);
            doSearch(val, Obj);
        },
        minLength: 1
    });
}

function doSearch(name, data) {
    var item = data.find(n => n.Name === name || n.SurName === name);
    var elements = [item];
    buildPeopleDetailsHTML(elements);
    $("#clear-icon").show();
}

$("#clear-icon").click(function () {
    $("#clear-icon").hide();
    $("#autocomplete-input").val("");
    getPeopleDetails();
});


function bindCountryDropDown() {
    var url = "/api/Admin/GetCountries";
    var controlId = "#select-country";
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        url: url,
        success: function (data) {
            buildDropDownCountry(JSON.parse(data.result), controlId);
        },
        error: function (jqXHR) {

        }
    });
}

function buildDropDownCountry(elements, controlId) {
    $(controlId).html("");
    var options = "<option value='' selected disabled>Select</option>";
    for (var i = 0; i < elements.length; i++) {
        options += "<option value=" + elements[i].Id + ">" + elements[i].Name + "</option>";
    }
    $(controlId).append(options);
    $('select').formSelect();
}

function bindCityDropDown() {

    var countryId = $("#select-country").val();
    doCountrySearch(countryId);
    var url = "/api/Admin/GetCities";
    var controlId = "#select-city";
    var body = {
        "CountryId": Number(countryId)
    };
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        success: function (data) {
            buildDropDownCity(JSON.parse(data.result), controlId);
        },
        error: function (jqXHR) {
            M.toast({ html: 'Somthing went wrong' });
        }
    });
}

function buildDropDownCity(elements, controlId) {
    $(controlId).html("");
    var options = "<option value='' selected disabled>Select</option>";
    for (var i = 0; i < elements.length; i++) {
        options += "<option value=" + elements[i].Id + ">" + elements[i].CityName + "</option>";
    }
    $(controlId).append(options);
    $('select').formSelect();
}


//Search using dropdowns

function doCountrySearch(countryId) {
    var item = resultsSet.find(n => n.CountryId === Number(countryId));
    var elements = [];
    if (typeof item !== 'undefined') {
        elements = [item];
    }
    buildPeopleDetailsHTML(elements);
}

function doCitySearch() {
    var cityId = $("#select-city").val();
    var item = resultsSet.find(n => n.CityId === Number(cityId));
    var elements = [];
    if (typeof item !== 'undefined') {
        elements = [item];
    }
    buildPeopleDetailsHTML(elements);
}



function triggeViewDetails(id) {
    var item = resultsSet.find(n => n.Id === Number(id));
    $("#view-fullname").text(item.Name + " " + item.SurName);
    $("#view-email").text(item.EmailAddress);
    $("#view-phone").text(item.MobileNumber);
    $("#view-city").text(item.CityName);
    $("#view-country").text(item.CountryName);
    var gender = item.Gender === 1 ? "Female" : "male";
    $("#view-gender").text(gender);
    $("#profile-pic-view").attr("src", item.ProfilePicture);
}


