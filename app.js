const APIKey = 'e1d32ce84c794bb1a604ca06'
const baseURl = `https://v6.exchangerate-api.com/v6/${APIKey}/`

const currencyOne = document.querySelector('[data-js="currency-one"]')
const currencyTwo = document.querySelector('[data-js="currency-two"]')
const convertedValue = document.querySelector('[data-js="converted-value"]')
const currencyOneTimes = document.querySelector(
  '[data-js="currency-one-times"]'
)

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

const currenciesCodes = async () => {
  const url = `${baseURl}latest/USD`
  const { conversion_rates } = await fetchData(url)

  const codes = Object.keys(conversion_rates)
  codes.forEach((currencyCode) => {
    currencyOne.innerHTML += `<option value="${currencyCode}">${currencyCode}</option>`
  })
  codes.reverse().forEach((currencyCode) => {
    currencyTwo.innerHTML += `<option value="${currencyCode}">${currencyCode}</option>`
  })
}
currenciesCodes()


convertedValue.textContent = `5.0615`
currencyOneTimes.value = '1'

const getExchangeRate = async (event) => {
  const baseCode = currencyOne.value
  const targetCode = currencyTwo.value
  const amount = event.target.value

  const url = `${baseURl}pair/${baseCode}/${targetCode}/${amount}`

  const { conversion_result } = await fetchData(url)

  convertedValue.textContent = conversion_result
}
currencyOneTimes.addEventListener('input', getExchangeRate)
