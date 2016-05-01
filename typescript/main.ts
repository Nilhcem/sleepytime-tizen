declare var tizen: any;
declare var TIZEN_L10N: Array<string>;

interface Zepto {
    click(c: any)
    html(val: string): Zepto;
    val(): string
}
declare var $: {
    (selector: string): Zepto;
};

class SleepAt {
    constructor(public hour: number, public minute: number, public amTime: boolean) { }
}

(function () {
    initL10N();
    window.addEventListener('tizenhwkey', ev => {
        if (ev['keyName'] === "back") {
            const page = $('.ui-page-active')[0],
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

    $('#calculate').click(e => {
        const hour = parseInt($('#select-custom-0').val());
        const minute = parseInt($('#select-custom-1').val());
        const amTime = $('#select-custom-2').val() == "am";

        if (hour == 0 || minute == 0) {
            alert("no way");
        } else {
            const sleepAt = new SleepAt(hour, minute, amTime);
            window.location.href = '#two';
        }
    });
} ());

function initL10N() {
    ['when_to_get_up', 'zzz', 'or', 'wake_up_at', 'calculate', 'hour', 'minute', 'am', 'pm']
        .forEach(it => { $('#' + it).html(TIZEN_L10N[it]) })
}
