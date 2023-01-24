export default function translateTime(moment) {
    moment.updateLocale('vi', {
        relativeTime: {
            future: '%s sau',
            past: '%s trước',
            s: 'vài giây',
            ss: '%d giây',
            m: '1 phút',
            mm: '%d phút',
            h: '1 giờ',
            hh: '%d giờ',
            d: '1 ngày',
            dd: '%d ngày',
            w: '1 tuần',
            ww: '%d tuần',
            M: '1 tháng',
            MM: '%d tháng',
            y: '1 năm',
            yy: '%d năm',
        },
    });
}
