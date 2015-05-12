/*
----------------------------------------
----------------------------------------
Universal
----------------------------------------
---------------------------------------
*/

// Displays a popup message in the universal popup box
function flashMessage(message, type) {
    var dom = $("#primaryAlert");
    dom.removeClass("alert-success").removeClass("alert-info")
        .removeClass("alert-warning").removeClass("alert-danger");
    if (type === 0) {
        dom.addClass("alert-success");
    } else if (type === 1) {
        dom.addClass("alert-info");
    } else if (type === 2) {
        dom.addClass("alert-warning");
    } else {
        dom.addClass("alert-danger");
    }
    $("#primaryAlert").text(message).finish().slideDown(250).delay(message.length * 100).slideUp(250);
}

// Shortcuts for displaying different types of popup messages
function flashSuccess(message) { flashMessage(message, 0); }
function flashInfo(message) { flashMessage(message, 1); }
function flashWarning(message) { flashMessage(message, 2); }
function flashError(message) { flashMessage(message, 3); }

// Sets up ajax requests to handle responses in a way that informs the user about what's going on
$(function () {
    $(document).ajaxSuccess(function (event, xhr, settings) {
        if (xhr.responseJSON) {
            var response = xhr.responseJSON;
            if (response.redirect) {
                window.location.href = window.location.origin + xhr.responseJSON.redirect;
            } else if (response.error) {
                flashError(response.error);
            } else if (response.warning) {
                flashWarning(response.warning);
            } else if (response.info) {
                flashInfo(response.info);
            } else if (response.success) {
                flashSuccess(response.success);
            } else if (response.popup) {
                swal(response.popup);
            }
        }
    });
    $(document).ajaxError(function (event, xhr, settings, thrownError) {
        if (xhr.responseJSON && xhr.responseJSON.message) {
            var msg = xhr.responseJSON.message;
            if (msg.indexOf("fails because [") != -1) {
                msg = msg.substring(msg.indexOf("[") + 1, msg.lastIndexOf("]"));
            }
            flashError(msg);
        } else {
            flashError("Server error! Check the console for more info");
            console.log(xhr);
        }
    });
});