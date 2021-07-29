const APIKey = 'e1d32ce84c794bb1a604ca06'
const baseURl = `https://v6.exchangerate-api.com/v6/${APIKey}/`

const currencyOne = document.querySelector('[data-js="currency-one"]')
const currencyTwo = document.querySelector('[data-js="currency-two"]')
const convertedValue = document.querySelector('[data-js="converted-value"]')
const conversionPrecision = document.querySelector(
  '[data-js="conversion-precision"]'
)
const currencyOneTimes = document.querySelector(
  '[data-js="currency-one-times"]'
)

let baseCode = 'USD'
let targetCode = 'BRL'
let amount = 1

const fetchData = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possivel obter os dados')
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}

const populateSelects = (conversion_rates) => {
  const codes = Object.keys(conversion_rates)

  codes.forEach((currencyCode) => {
    currencyOne.innerHTML += `<option value="${currencyCode}">${currencyCode}</option>`
  })
  codes.forEach((currencyCode) => {
    currencyTwo.innerHTML += `<option ${
      currencyCode === 'BRL' ? 'selected' : ''
    } value="${currencyCode}">${currencyCode}</option>`
  })

  baseCode = currencyOne.value
  targetCode = currencyTwo.value
}

const getCurrenciesCodes = async () => {
  const url = `${baseURl}latest/USD`
  const { conversion_rates } = await fetchData(url)

  populateSelects(conversion_rates)
}

const showResultInDOM = async (conversion_result, conversion_rate) => {
  convertedValue.textContent = conversion_result.toFixed(2)
  conversionPrecision.textContent =
    await `1 ${baseCode} = ${conversion_rate} ${targetCode}`
}

const getExchangePairData = async () => {
  const url = `${baseURl}pair/${baseCode}/${targetCode}/${amount}`
  return await fetchData(url)
}

const setDefaultValues = async () => {
  getCurrenciesCodes()
  currencyOneTimes.value = '1'
  
  const { conversion_result, conversion_rate } = await getExchangePairData()

  showResultInDOM(conversion_result, conversion_rate)
}

setDefaultValues()

const getExchangeRateWhenInputChange = async (event) => {
  baseCode = currencyOne.value
  targetCode = currencyTwo.value
  amount = event.target.value

  const { conversion_result, conversion_rate } = await getExchangePairData()

  showResultInDOM(conversion_result, conversion_rate)
}

const getExchangeRateWhenSelectOneChange = async (event) => {
  baseCode = event.target.value
  targetCode = currencyTwo.value
  amount = currencyOneTimes.value

  const { conversion_result, conversion_rate } = await getExchangePairData()

  showResultInDOM(conversion_result, conversion_rate)
}

const getExchangeRateWhenSelectTwoChange = async (event) => {
  baseCode = currencyOne.value
  targetCode = event.target.value
  amount = currencyOneTimes.value

  const { conversion_result, conversion_rate } = await getExchangePairData()

  showResultInDOM(conversion_result, conversion_rate)
}
currencyOneTimes.addEventListener('input', getExchangeRateWhenInputChange)
currencyOne.addEventListener('input', getExchangeRateWhenSelectOneChange)
currencyTwo.addEventListener('input', getExchangeRateWhenSelectTwoChange)
