initL10N();
$(function () {
    window.addEventListener('tizenhwkey', function (ev) {
        if (ev['keyName'] === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            }
            catch (ignore) { }
        }
    });
});
function initL10N() {
    ['when_to_get_up', 'zzz', 'or', 'wake_up_at', 'calculate', 'hour', 'minute', 'am', 'pm']
        .forEach(function (it) { $('#' + it).html(TIZEN_L10N[it]); });
}
