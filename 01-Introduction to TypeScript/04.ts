function converArrays(words: string[]): [string, number] {
    const text = words.join('');

    return [text, text.length];
}

// console.log(converArrays(['How', 'are', 'you?']));
console.log(converArrays(['Today', ' is', ' a ', 'nice', ' ', 'day for ', 'TypeScript']));