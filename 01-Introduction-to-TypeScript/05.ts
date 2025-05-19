function summarizePerson(
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    middleName?: string,
    hobbies?: string[],
    workinfo?: [string, number]
): [number, string, number, string, string] {

    const fullName = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;

    const hobbiesStr = hobbies?.length ? hobbies.join(', ') : '-';

    const jobStr = workinfo ? `${workinfo[0]} -> ${workinfo[1]}` : '-';

    return [
        id,
        fullName,
        age,
        hobbiesStr,
        jobStr
    ];
}

console.log(summarizePerson(12, 'Eliot', 'Des', 20, 'Braylen', ['tennis', 'football', 'hiking'], ['SalesConsultant', 2500]));
