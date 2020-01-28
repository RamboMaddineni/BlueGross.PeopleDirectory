var base64String;
var originalData;

$(document).ready(function () {
    $('select').formSelect();
    bindCountryDropDown();
    getPeopleDetails();

    $('.modal').modal({
        onCloseEnd: function () {
            window.location.reload(true);
        }
    });
});


$("#add-new-person-modal").click(function () {
    $("#update-people-details").hide();
    $("#save-people-details").show();
});


$("#save-people-details").click(function () {
    addPersonDetails();
});

function addPersonDetails() {
    var name = $("#name").val();
    var surName = $("#sur-name").val();
    var mobileNumber = $("#mobile-number").val();
    var emailAddress = $("#email").val();
    var country = $("#select-country").val();
    var city = $("#select-city").val();
    var image = base64String;
    var gender = $('input[name="gender"]:checked').val();

    var requiredFields = [];

    if (name === "") {
        requiredFields.push("Name is Required");
    }

    if (surName === "") {
        requiredFields.push("Surname is Required");
    }

    if (mobileNumber === "") {
        requiredFields.push("mobile number is Required");
    }

    if (validateEmail(emailAddress) === false) {
        requiredFields.push("Email is Required");
    }

    if (country === "") {
        requiredFields.push("Country is Required");
    }

    if (city === "" || city === null) {
        requiredFields.push("City is Required");
    }

    if (gender === "") {
        requiredFields.push("Gender is Required");
    }

    if (image === "") {
        requiredFields.push("Profile picture is Required");
    }

    if (requiredFields.length === 0) {
        var body = {
            "name": name,
            "surName": surName,
            "profilePicture": image,
            "mobileNumber": mobileNumber,
            "emailAddress": emailAddress,
            "gender": gender,
            "city": Number(city),
            "country": Number(country)
        };
        var url = "/api/Admin/AddPerson";
        $.ajax({
            contentType: 'application/json',
            type: "POST",
            url: url,
            data: JSON.stringify(body),
            success: function (data) {
                console.log(data);
                getPeopleDetails();
                $('.modal').modal('close');
            }
        });
    }
    else {
        for (var i = 0; i < requiredFields.length; i++) {
            M.toast({ html: requiredFields[i] });
        }
    }   
}

function validateEmail(mail) {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
}

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

function bindCityDropDown() {
    var countryId = $("#select-country").val();
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
            buildDropDown(JSON.parse(data.result), controlId);
        },
        error: function (jqXHR) {
            M.toast({ html: 'Somthing went wrong' });
        }
    });
}

function buildDropDown(elements, controlId) {
    $(controlId).html("");
    var options = "<option value='' selected disabled>Select</option>";
    for (var i = 0; i < elements.length; i++) {
        options += "<option value=" + elements[i].Id + ">" + elements[i].CityName + "</option>";
    }
    $(controlId).append(options);
    $('select').formSelect();
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


function encodeImagetoBase64(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        base64String = reader.result;
    };
    reader.readAsDataURL(file);
}



function getPeopleDetails() {
    var url = "/api/Admin/GetPersonDetails";
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        url: url,
        success: function (data) {
            buildPeopleDetailsHTML(JSON.parse(data.result));
        },
        error: function (jqXHR) {

        }
    });
}


function buildPeopleDetailsHTML(elements) {
    $("#people-details-body").html("");
    var peopledetailsbody = "";
    for (var i = 0; i < elements.length; i++) {
        var gender = elements[i].Gender === 1 ? "Male" : "Female"; 
        var idnetity = i + 1;
        peopledetailsbody += "<tr>\
                        <td>" + idnetity + "</td>\
                        <td class='person-pic'><img src ="+ elements[i].ProfilePicture +" alt='profile' class='profile-pic'/></td>\
                        <td class='person-name'>" + elements[i].Name + "</td>\
                        <td class='person-sur-name'>" + elements[i].SurName + "</td>\
                        <td class='person-mobile'>" + elements[i].MobileNumber + "</td>\
                        <td class='person-email'>" + elements[i].EmailAddress + "</td>\
                        <td class='person-gender'>" + gender + "</td>\
                        <td class='person-name'>" + elements[i].CityName + "</td>\
                        <td class='person-name'>" + elements[i].CountryName + "</td>\
                        <td class='data-actions'><a class='modal-trigger' data-target='addnewpersonmodal' href='#addnewpersonmodal' onClick=\"triggerUpdatePeopleDetails('"+ elements[i].Name + "','" + elements[i].SurName + "','" + elements[i].MobileNumber + "','" + elements[i].EmailAddress + "','" + elements[i].Gender + "','" + elements[i].CityName + "','" + elements[i].CountryName + "','" + elements[i].Id + "'); \"> <i class='material-icons'>edit</i></a>\
                        <a onClick=\"triggerDeletePeopleDetails('"+ elements[i].Id + "');\"> <i class='material-icons'>close</i></a></td>\
                        </tr>";
    }
    $("#people-details-body").html(peopledetailsbody);
}


function triggerUpdatePeopleDetails(name, surName, mobileNumber, emailAddress, gender, city, country, id) {
    $("#update-people-details").show();
    $("#save-people-details").hide();
    $("#name").val(name);
    $("#sur-name").val(surName);
    $("#mobile-number").val(mobileNumber);
    $("#email").val(emailAddress);
    $("#u-id").val(id);
    $('input[name="gender"]:checked').val(gender);
    M.updateTextFields();

    originalData = {
        "name": name,
        "surName": surName,
        "mobileNumber": mobileNumber,
        "emailAddress": emailAddress,
        "gender": gender,
        "city": city,
        "country": country,
        "profilePicture": "",
        "Id":id
    };
}



function updatePersonDetails() {
    var name = $("#name").val();
    var surName = $("#sur-name").val();
    var mobileNumber = $("#mobile-number").val();
    var emailAddress = $("#email").val();
    var country = $("#select-country").val();
    var city = $("#select-city").val();
    var image = base64String;
    var gender = $('input[name="gender"]:checked').val();
    var id = $("#u-id").val();

    var requiredFields = [];

    if (name === "") {
        requiredFields.push("Name is Required");
    }

    if (surName === "") {
        requiredFields.push("Surname is Required");
    }

    if (mobileNumber === "") {
        requiredFields.push("mobile number is Required");
    }

    if (emailAddress === "") {
        requiredFields.push("Email is Required");
    }

    if (country === "") {
        requiredFields.push("Country is Required");
    }

    if (city === "" || city === null) {
        requiredFields.push("City is Required");
    }

    if (gender === "") {
        requiredFields.push("Gender is Required");
    }

    if (image === "") {
        requiredFields.push("Profile picture is Required");
    }

    if (requiredFields.length === 0) {
        var body = {
            "name": name,
            "surName": surName,
            "profilePicture": image,
            "mobileNumber": mobileNumber,
            "emailAddress": emailAddress,
            "gender": gender,
            "city": Number(city),
            "country": Number(country),
            "Id": Number(id)
        };
        var url = "/api/Admin/UpdatePerson";
        $.ajax({
            contentType: 'application/json',
            type: "POST",
            url: url,
            data: JSON.stringify(body),
            success: function (data) {
                getPeopleDetails();
                sendEmail(body);
                $('.modal').modal('close');
            }
        });
    }
    else {
        for (var i = 0; i < requiredFields.length; i++) {
            M.toast({ html: requiredFields[i] });
        }
    }
}


function triggerDeletePeopleDetails(id) {

    var body =
    {
        Id: Number(id)
    };
    var url = "/api/Admin/DeletePerson";
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        success: function (data) {
            M.toast({ html: 'People Details deleted' });
            getPeopleDetails();
        },
        error: function (jqXHR) {
            M.toast({ html: 'Somthing went wrong' });
        }
    });
}


function sendEmail(updatedData) {

    var subject = "";
    subject += "<table cellspacing='0' cellpadding='7' width='600' border='0'>\
                <tr><td># </td><td>Previous Values</td><td class='person-name'>Updated Values</td></tr>\
                <tr><td>Name: </td><td>" + originalData.name + "</td><td class='person-name'>" + updatedData.name + "</td></tr>\
                <tr><td>Surname: </td><td>" + originalData.surName + "</td><td class='person-name'>" + updatedData.surName + "</td></tr>\
                <tr><td>Email Address: </td><td>" + originalData.emailAddress + "</td><td class='person-name'>" + updatedData.emailAddress + "</td></tr>\
                <tr><td>Mobile: </td><td>" + originalData.mobileNumber + "</td><td class='person-name'>" + updatedData.mobileNumber + "</td></tr>\
                <tr><td>Gender (1: Female, 2: Male): </td><td>" + originalData.gender + "</td><td class='person-name'>" + updatedData.gender + "</td></tr>\
                <tr><td>Country: </td><td>" + originalData.country + "</td><td class='person-name'>" + updatedData.country + "</td></tr>\
                <tr><td>City: </td><td>" + originalData.city + "</td><td class='person-name'>" + updatedData.city + "</td></tr>\
                </table>";

    var body = {
        "Body": subject,
        "FromAddress": "testingmr007@gmail.com",
        "ToAddress": "mark@bluegrassdigital.com",
        //"ToAddress": "testingmr007@gmail.com",
        "Subject": "People directory profile updated at Id: " + updatedData.Id
    };

    var url = "/api/Admin/SendEmail";
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        success: function (data) {
  
        },
        error: function (jqXHR) {
            M.toast({ html: 'Somthing went wrong' });
        }
    });
}