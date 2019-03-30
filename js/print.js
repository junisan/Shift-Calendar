const body = document.querySelector('body');

const noinfo = document.createElement('h2');
noinfo.innerHTML = "Sin información";

const dayNames = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
const month = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const morning = 'Mañana';
const afternoon = 'Tarde';
const night = 'Noche';
const freeday = 'Libra!';

const insertDay = (info) => {
    //Get classes
    let classes = ['calendar-day'];
    let text;
    if(info.date.getDay() === 1) classes.push('weekbegin');
    if(info.hasOwnProperty('out') && info.out) classes.push('out');
    if(info.hasOwnProperty('today') && info.today) classes.push('today');
    switch(info.zone){
        case 0: text=freeday; classes.push('free'); break;
        case 1: text=morning; classes.push('morning'); break;
        case 2: text=afternoon; classes.push('afternoon'); break;
        case 3: text=night; classes.push('night'); break;
        default: text = '';
    }

    //Create elements
    let dayCalendar = document.createElement('li');
    dayCalendar.setAttribute('data-weekday', dayNames[info.date.getDay()]);
    dayCalendar.setAttribute('data-week', info.week);
    dayCalendar.className = classes.join(' ');

    let span = document.createElement('span');
    span.className='number';
    span.innerHTML = month[info.date.getMonth()] + ' ' + info.date.getDate() + '<br>' + text;

    let div = document.createElement('div');
    div.className='content';

    dayCalendar.append(span, div);

    return dayCalendar;
};

const createCalendarOL = ()=>{
    const ol = document.createElement('ol');
    ol.className = 'calendar';
    return ol;
};

const initCalendar = (days)=>{
    const list = createCalendarOL();
    for(let i = 0; i < days.length; i++){
        list.append(insertDay(days[i]));
    }
    return list;
};

module.exports.draw = (days)=>{
    let toInsert;
    if(!days || !days.length){
        toInsert = noinfo;
    }else{
        toInsert = initCalendar(days);
    }
    body.insertBefore(toInsert, body.firstChild);

};