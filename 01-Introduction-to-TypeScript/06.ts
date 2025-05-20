enum Days {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

function reverseDayOfWeek(day: string): void {
    console.log(Days[day as keyof typeof Days] || 'error');

}

reverseDayOfWeek('Friday');
