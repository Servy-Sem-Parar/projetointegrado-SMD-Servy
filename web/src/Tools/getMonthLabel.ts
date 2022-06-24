export function getMonthLabel(month: number){
    let label = "";

    switch(month) {
        case 0:
            label = "Janeiro";
            break;
        case 1:
            label = "Fevereiro";
            break;
        case 2:
            label = "Março";
            break;
        case 3:
            label = "Abril";
            break;
        case 4:
            label = "Maio";
            break;
        case 5:
            label = "Junho";
            break;
        case 6:
            label = "Julho";
            break;
        case 7:
            label = "Agosto";
            break;
        case 8:
            label = "Setembro";
            break;
        case 9:
            label = "Outubro";
            break;
        case 10:
            label = "Novembro";
            break;
        case 11:
            label = "Dezembro";
            break;
    }

    return label;
}