export type UpperCase = string[];
export type LowerCase = string[];
export type Numbers = string[];
export type SpecialCharacters = string[];

const uppercaseLetters = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
const lowercaseLetters = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));
const numbers = Array.from({ length: 10 }, (_, index) => String(index));
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '[', ']', '{', '}', '|', ';', ':', '<', '>', '?', '/', ',', '.', '_', '~'];

export const data: [UpperCase, LowerCase, Numbers, SpecialCharacters] = [
    uppercaseLetters, // UpperCase
    lowercaseLetters, // LowerCase
    numbers, // Numbers
    specialCharacters, // SpecialCharacters
];
