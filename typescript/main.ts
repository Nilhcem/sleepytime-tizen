interface JQuery {
    html(val: string): JQuery;
}
declare var $: {
    (selector: string): JQuery;
    (readyCallback: () => void ): JQuery;
};

declare var tizen: any;
declare var TIZEN_L10N: Array<string>;

initL10N();
$(() => {
        window.addEventListener('tizenhwkey', ev => {
        if (ev['keyName'] === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) { }
        }
    });
});

function initL10N() {
    ['when_to_get_up', 'zzz', 'or', 'wake_up_at', 'calculate', 'hour', 'minute', 'am', 'pm']
        .forEach(it => { $('#' + it).html(TIZEN_L10N[it]) })
}
