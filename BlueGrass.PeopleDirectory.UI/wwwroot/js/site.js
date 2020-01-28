$(document).ready(function () {
    $('.modal').modal({
        onCloseEnd: function () {
            window.location.reload(true);
        }
    });
    getPeopleDetails();
});

function getPeopleDetails() {
    var url = "/Home/GetPeopleDetails";
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        url: url,
        success: function (data) {
            buildPeopleDetailsHTML(data.response);
        },
        error: function (jqXHR) {

        }
    });
}


function buildPeopleDetailsHTML(elements) {
    $("#people-details-body").html("");
    var peopledetailsbody = "";
    for (var i = 0; i < elements.length; i++) {
        var idnetity = i + 1;
        peopledetailsbody += "<tr>\
                        <td>" + idnetity + "</td>\
                        <td class='contact-name'>" + elements[i].name + "</td>\
                        <td class='contact-name'>" + elements[i].surName + "</td>\
                        <td class='contact-name'>" + elements[i].profilePicture + "</td>\
                        <td class='contact-name'>" + elements[i].mobileNumber + "</td>\
                        <td class='contact-name'>" + elements[i].emailAddress + "</td>\
                        <td class='contact-name'>" + elements[i].gender + "</td>\
                        <td class='contact-name'>" + elements[i].city+ "</td>\
                        <td class='contact-name'>" + elements[i].countryName + "</td>\
                        <td class='data-actions'><a class='modal-trigger' data-target='Updatepeopledetailsmodal' href='#Updatepeopledetailsmodal' onClick=\"triggerUpdatePeopleDetails('"+ elements[i].name + "','" + elements[i].surName + "','" + elements[i].profilePicture + "','" + elements[i].mobileNumber + "','" + elements[i].emailAddress + "','" + elements[i].gender + "','" + elements[i].city + "','" + elements[i].country + "','" + elements[i].id + "'); \"> <i class='material-icons'>edit</i></a>\
                        <a onClick=\"triggerDeletePeopleDetails('"+ elements[i].id + "');\"> <i class='material-icons'>close</i></a></td>\
                        </tr>";
    }
    $("#contacts-body").html(peopledetailsbody);

    
}


//***********************************Save Details***************************************************************

function savePeopleDetails(body) {
    var url = "Home/AddPeopleDetails";
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        success: function (data) {
            M.toast({ html: 'Contact added' });
            getPeopleDetails();
            $("#name").val("");
            $("#sur_name").val("");
            $("#profile-picture").val("");
            $("#mobile-number").val("");
            $("#email").val("");

        },
        error: function (jqXHR) {
            M.toast({ html: 'Somthing went wrong' });
        }
    });
}


$("#save-people-details").click(function () {
    var name = $("#name").val();
    var surName = $("#sur_name").val();
    var profilePicture = $("#profile-picture").val();
    var mobileNumber = $("#mobile-number").val();
    var email = $("#email").val();
    var gender = $("input[name=gender]:checked").val();

    var body = {
        Name: name,
        SurName: surName,
        ProfilePicture: profilePicture,
        MobileNumber: mobileNumber,
        EmailAddress: email,
        Gender:gender
    };
    savePeopleDetails(body);
});


//***********************************Update Details***************************************************************

function triggerUpdatePeopleDetails(name, surName, profilePicture, mobileNumber, emailAddress, gender, city, country, id) {
    $("#name").val(name);
    $("#sur_name").val(surName);
    $("#profile-picture").val(profilePicture);
    $("#mobile-number").val(mobileNumber);
    $("#email").val(emailAddress);
    M.updateTextFields();
}

$("#update-contact").click(function () {
    var id = $("#").val();
    var name = $("#").val();
    var surName = $("#").val();
    var profilePicture = $("#").val();
    var mobileNumber = $("#").val();
    var emailAddress = $("#").val();


    var body = {
        Id: Number(id),
        Name: name,
        SurName: surName,
        ProfilePicture: profilePicture,
        MobileNumber: mobileNumber,
        EmailAddress: emailAddress

    };

    var url = "/Home/UpdatePeopleDetails";
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        success: function (data) {
            clearFields();
            $('.modal').modal('close');
            M.toast({ html: 'People Details Updated' });
        },
        error: function (jqXHR) {
            M.toast({ html: 'Somthing went wrong' });
        }
    });
});

//***********************************Delete Details***************************************************************




function triggerDeletePeopleDetails(id) {

    var body =
    {
        Id: Number(id)
    };
    var url = "/Home/DeletePeopleDetails";
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



