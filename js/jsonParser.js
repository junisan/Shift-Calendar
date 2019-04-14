/**
 * URL containing the JSON file indicating the working days and shifts in {day: "YYYY-MM-DD", zone: (int)}.
 * The zone determines the assigned shift, being 0 a free day, 1 is in the morning, 2 is in the afternoon and 3 at night.
 * @type {string}
 */
const url = '';

/**
 * Stringify a date in format YYYY-MM-DD
 * @param {Date} date
 * @return {string}
 */
const dateParser = (date)=> `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+date.getDate()).slice(-2)}`;

/**
 * Create a Date based on an 'YYYY-MM-DD' string
 * @param {string} string Date
 * @return {Date}
 */
const getDateByString = (string)=>{
    let fields = string.split('-');
    return new Date(fields[0], parseInt(fields[1])-1, fields[2]);
};

/**
 * Gets the week number based on a date
 * @param {Date} date
 * @return {number}
 */
const getNumberOfWeek = (d)=>{
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
// Set to nearest Thursday: current date + 4 - current day number
// Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
// Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
// Calculate full weeks to nearest Thursday
    return  Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
};

/**
 * Fill the days from the first position of the array of days until Monday
 * @param {object} json
 */
const paddingBeginDays = (json)=>{
    let date = new Date(json[0].date.getTime());
    let weekNum = getNumberOfWeek(date);
    while(date.getDay() !== 1){
        date.setDate(date.getDate()-1);
        json.unshift({day: dateParser(date), zone: -1, week: weekNum, out: true, date: new Date(date.getTime())});
    }
};

/**
 * Fill the days from the last position of the array of days until Sunday
 * @param {object} json
 */
const paddingEndingDays = (json) =>{
    let date = new Date(json[json.length-1].date.getTime());
    let weekNum = getNumberOfWeek(date);
    while(date.getDay() !== 0){
        date.setDate(date.getDate()+1);
        json.push({day: dateParser(date), zone: -1, week: weekNum, out: true, date: new Date(date.getTime())});
    }
};

/**
 * Removes dates from the array that belong to weeks prior to the current one
 * @param {object} json
 * @return {object} new Json
 */
const purgeLastWeekEvent = (json)=>{
    const now = new Date();
    const thisWeek = getNumberOfWeek(now);
    const definitiveJson = [];
    for(let i = 0; i<json.length;i++){
        let dateDay = getDateByString(json[i].day);
        let weekDay = getNumberOfWeek(dateDay);
        if(thisWeek <= weekDay){
            definitiveJson.push(json[i]);
        }
    }
    return definitiveJson;
};

/**
 * Adds additional information to the date array, such as days that have not been included (assuming you don't work).
 * It includes the week number, if it is a past date, if it is today and the date object to each entry.
 * @param {object} json
 */
const extraInfo = (json)=>{
    let date = getDateByString(json[0].day);
    let now = new Date();
    let nowString = dateParser(now);
    let i = 0;
    let secureForward = 100;

    while(i < json.length){
        //Stop unstopable loop
        if(secureForward === 0) throw 'Never ending loop';
        let dateString = dateParser(date);
        let out = now > date;
        let today = nowString === dateString;

        //Check if json is not secuential (not-working day)
        if(json[i].day !== dateParser(date)){
            json.splice(i,0,{day: dateParser(date), zone: 0, week: getNumberOfWeek(date), today: today, out: out, date: new Date(date.getTime())});
            secureForward--;
        }else{
            json[i] = {...json[i], week: getNumberOfWeek(date), today: today, out: out, date: new Date(date.getTime())};
        }

        i++;
        date.setDate(date.getDate()+1);
    }
};

/**
 * Get the JSON containing the days
 * @return {Promise<any>}
 */
const fetchDays = ()=>{
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(response => {
                return resolve(response)
            })
            .catch(err => {
                console.error(err);
                return reject();
            });
    });
};

module.exports.parseDays = ()=>{
    return new Promise((resolve, reject) => {
        fetchDays()
            .then(response => {
                let json = response;
                json = purgeLastWeekEvent(json);
                extraInfo(json);
                paddingBeginDays(json);
                paddingEndingDays(json);
                return resolve(json);
            })
            .catch(err => {
                return resolve();
            });
    });

};
