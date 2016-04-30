declare var tizen: any;
declare var TIZEN_L10N: Array<string>;

(function () {
    window.addEventListener('tizenhwkey', ev => {
        if (ev['keyName'] === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) { }
        }
    });

    initL10N();
} ());

function initL10N() {
    ['when_to_get_up', 'zzz', 'or', 'wake_up_at', 'calculate', 'hour', 'minute', 'am', 'pm']
        .forEach(it => { document.getElementById(it).innerHTML = TIZEN_L10N[it] })
}
