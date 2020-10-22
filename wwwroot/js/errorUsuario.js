

$(document).ready(function () {
    initControls();
    $(".titModal").css({ 'font-size': '24px', 'color': '#000000;'});
    $(".txtMod").css({ 'font-size': '22px', 'text-align':'center' });


        $('#modalLogoutUsr').modal({
            focus: true,
            persist: true,
            onClose: () => {
                window.location.replace($("#urlR").val());
            }
        });
    
});


function handleBackButton() {

    if (history.forward(-1)) {
        location.replace(history.forward(-1));
    }

}

function initControls() {
    window.location.hash = "red";
    window.location.hash = "Red" //chrome
    window.onhashchange = function () { window.location.hash = "red"; }
}