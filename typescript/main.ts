declare var tizen: any;
declare var TIZEN_L10N: Array<string>;

interface Zepto {
    append(el: any): Zepto;
    click(c: any);
    html(val: string): Zepto;
    text(value: string): Zepto;
    val(): string;
    val(value: string): Zepto;
}
declare var $: {
    (selector: string): Zepto;
};

class SleepAt {
    constructor(public hour: number, public minute: number, public amTime: boolean) { }
}

(function () {
    initLayout();
    window.addEventListener('tizenhwkey', ev => {
        if (ev['keyName'] === 'back') {
            const page = $('.ui-page-active')[0];
            const pageId = page ? page.id : "";

            if (pageId === 'home_page') {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) { }
            } else {
                window.history.back();
            }
        }
    });

    $('#go_to_bed').click(e => { window.location.href = '#gotobed_page' });

    $('#when_to_sleep').click(e => {
        const hour = parseInt($('#select-hour').val());
        const minute = parseInt($('#select-minute').val());
        const amTime = $('#select-period').val() == "am";

        if (hour == 0 || minute < 0) {
            alert(TIZEN_L10N['invalid_time']);
        } else {
            const sleepAt = new SleepAt(hour, minute, amTime);
            window.location.href = '#whentosleep_page';
        }
    });
} ());

function initLayout() {
    // Init l10n
    ['when_to_get_up', 'go_to_bed', 'or', 'wake_up_at', 'when_to_sleep', 'am', 'pm']
        .forEach(it => { $('#' + it).html(TIZEN_L10N[it]) });

    // Init '(hour)' select
    const selectHour = $('#select-hour');
    for (let i = 0; i < 13; i++) {
        const text = (i == 0 ? TIZEN_L10N['hour'] : minTwoDigits(i));
        selectHour.append($("<option />").val(i.toString()).text(text));
    }

    // Init '(minute)' select
    const selectMinute = $('#select-minute');
    for (let i = -5; i < 60; i += 5) {
        const text = (i == -5 ? TIZEN_L10N['minute'] : minTwoDigits(i));
        selectMinute.append($("<option />").val(i.toString()).text(text));
    }
}

function minTwoDigits(n: number): string {
    return (n < 10 ? '0' : '') + n;
}
