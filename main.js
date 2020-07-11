import anyAscii from 'any-ascii';

const input = document.getElementById('input');
const output = document.getElementById('output');

input.addEventListener('input', () => output.value = anyAscii(input.value));
