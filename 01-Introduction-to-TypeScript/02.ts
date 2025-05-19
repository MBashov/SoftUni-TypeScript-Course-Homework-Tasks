enum Days {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

function dayOfWeek(dayNum: number): void {


    console.log(Days[dayNum] || 'error');

}

// dayOfWeek(5);
dayOfWeek(7);
// dayOfWeek(8);