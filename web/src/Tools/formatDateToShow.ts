export function formatDateToShow(date: string){
    const year = date.substr(0,4);
    const month = date.substr(5,2);
    const day = date.substr(8,2);
    const hour = date.substr(11,5);

    return `${day}/${month}/${year} ${hour}`
}