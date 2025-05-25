function isNonEmptyStringArray(arg: unknown): arg is string[] {
    return Array.isArray(arg)
        && arg.length >= 1
        && arg.every(el => typeof el === 'string');
}

let arr: unknown = ['test', '24'];

if (isNonEmptyStringArray(arr)) {

    console.log(arr.length); // allowed

}