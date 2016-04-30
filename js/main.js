(function () {
    window.addEventListener('tizenhwkey', function(ev) {
        if (ev.keyName === "back" ) {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
    document.getElementById("hello").innerHTML = TIZEN_L10N.hello;
}());
