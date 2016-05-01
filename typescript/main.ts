declare var tizen: any;
declare var TIZEN_L10N: Array<string>;

interface Zepto {
    html(val: string): Zepto;
    click(c: any)
}
declare var $: {
    (selector: string): Zepto;
};

(function () {
    initL10N();
    window.addEventListener('tizenhwkey', ev => {
        if (ev['keyName'] === "back") {
            let page = $('.ui-page-active')[0],
                pageid = page ? page.id : "";

            if (pageid === "main") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) { }
            } else {
                window.history.back();
            }
        }
    });

    $('#zzz').click(e => { window.location.href = '#three' });
} ());

function initL10N() {
    ['when_to_get_up', 'zzz', 'or', 'wake_up_at', 'calculate', 'hour', 'minute', 'am', 'pm']
        .forEach(it => { $('#' + it).html(TIZEN_L10N[it]) })
}
