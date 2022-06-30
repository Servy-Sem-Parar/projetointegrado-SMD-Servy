export function formatDateToReceive(year: number, month: number, day: number, hour: string){
    const stringYear = year.toString();
    let stringMonth = month.toString();
    let stringDay = day.toString();

    if(stringMonth.length < 2) {
        stringMonth = "0" + stringMonth;
    }

    if(stringDay.length < 2) {
        stringDay = "0" + stringDay;
    }

    return `${stringYear}-${stringMonth}-${stringDay} ${hour}`
}