declare var tizen: any;
declare var TIZEN_L10N: Array<string>;

interface Zepto {
    append(el: any): Zepto;
    click(c: any);
    empty();
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
            const pageId = page ? page.id : '';

            if (pageId === 'home_page') {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) { }
            } else {
                window.history.back();
            }
        }
    });
} ());

function initLayout() {
    // Init app title
    $('.ui-header').append($('<h1 />').html(TIZEN_L10N['app_name']));

    // Init l10n
    ['when_to_get_up', 'go_to_bed', 'or', 'wake_up_at', 'when_to_sleep', 'am', 'pm']
        .forEach(it => { $('#' + it).html(TIZEN_L10N[it]) });

    // Init '(hour)' select
    const selectHour = $('#select-hour');
    for (let i = 0; i < 13; i++) {
        const text = (i == 0 ? TIZEN_L10N['hour'] : minTwoDigits(i));
        selectHour.append($('<option />').val(i.toString()).text(text));
    }

    // Init '(minute)' select
    const selectMinute = $('#select-minute');
    for (let i = -5; i < 60; i += 5) {
        const text = (i == -5 ? TIZEN_L10N['minute'] : minTwoDigits(i));
        selectMinute.append($('<option />').val(i.toString()).text(text));
    }

    // Go to bed link
    $('#go_to_bed').click(e => {
        const elements:Zepto[] = [];
        const now = new Date(new Date().getTime() + mnToMs(14))
        for (let i = 1; i < 7; i++) {
            const time = formatTime(new Date(now.getTime() + mnToMs(i * 90)));
            const html = i > 4 ? toBold(time) : time;
            elements.push($('<li class="ui-li-static" />').html(html));
        }
        updateResult('gotobed_headline', 'gotobed_subheadline', elements);
    });

    // When to sleep link
    $('#when_to_sleep').click(e => {
        $('#result_headline').html(TIZEN_L10N['gotobed_headline']);
        $('#result_subheadline').html(TIZEN_L10N['gotobed_subheadline']);

        const hour = parseInt($('#select-hour').val());
        const minute = parseInt($('#select-minute').val());
        const amTime = $('#select-period').val() == 'am';

        if (hour == 0 || minute < 0) {
            alert(TIZEN_L10N['invalid_time']);
        } else {
            const sleepAt = new SleepAt(hour, minute, amTime);
            window.location.href = '#result_page';
        }
    });

    // Up button
    $('.ui-header a').click(e => { window.history.back(); })
}

function minTwoDigits(n: number) {
    return (n < 10 ? '0' : '') + n;
}

function formatTime(date: Date) {
    const hours = date.getHours();
    const period = hours < 12 ? 'am' : 'pm';
    const hh = ((hours == 0 || hours == 12) ? 12 : hours < 12 ? hours : hours - 12).toString();
    const mn = minTwoDigits(date.getMinutes())
    return hh + ':' + mn + ' ' + TIZEN_L10N[period]
}

function mnToMs(i: number) { return i * 60000 }

function toBold(html: string) { return '<b>' + html + '</b>' }

function updateResult(headKey: string, subheadKey: string, elements: Zepto[]) {
    $('#result_headline').html(TIZEN_L10N[headKey]);
    $('#result_subheadline').html(TIZEN_L10N[subheadKey]);

    const container = $('#result_times');
    container.empty();
    elements.forEach(el => container.append(el));
    window.location.href = '#result_page'
}
