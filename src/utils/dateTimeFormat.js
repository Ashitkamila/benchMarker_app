
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

export function formatTime(date) {
    const currentDate = new Date(date);
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    // add a zero in front of numbers<10
    const h = checkTime(hour);
    const m = checkTime(minute);
    const time = h + ':' + m;
    return time;
}