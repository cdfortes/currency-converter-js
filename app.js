const APIKey = 'e1d32ce84c794bb1a604ca06'

const url = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/USD`

fetch(url).then((item) => console.log(item.json().value))
