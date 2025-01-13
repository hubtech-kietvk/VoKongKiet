import * as React from 'react'

interface PriceData {
  id: string
  currency: string
  date: string
  price: number
}

interface Props {
  url: string
  form?: any
  onAfterFetch?: (data: any[]) => void
}

export const useFetchData = ({ url, form, onAfterFetch }: Props) => {
  const [data, setData] = React.useState<PriceData[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const res = await fetch(url)
      const resData = await res.json()

      // format valid url currency string and generate uid
      const countSameCurrencies = resData.reduce((result: any, item: PriceData) => {
        if (result[item.currency] !== undefined) {
          result[item.currency] += 1
        } else {
          result[item.currency] = 0
        }

        return result
      }, {})

      const formatDataWithID = resData.map((item: PriceData) => {
        let formatCurrencyForID = item.currency

        if (countSameCurrencies[item.currency] > 0) {
          formatCurrencyForID = formatCurrencyForID + `${countSameCurrencies[formatCurrencyForID]}`
          countSameCurrencies[item.currency]--
        }

        const formatCurrencyForValidUrl = item.currency.startsWith('R')
          ? 'r' + item.currency.slice(1)
          : item.currency.startsWith('ST') && item.currency !== 'STRD'
            ? 'st' + item.currency.slice(2)
            : item.currency

        return { ...item, id: formatCurrencyForID, currency: formatCurrencyForValidUrl }
      })

      if (form) {
        form.setFieldsValue({
          fromCurrency: formatDataWithID[0].id,
          toCurrency: formatDataWithID[1].id
        })
      }

      if (onAfterFetch) {
        onAfterFetch(formatDataWithID)
      }

      setData(formatDataWithID)
      setLoading(false)
    }

    getData()
  }, [form, onAfterFetch, url])

  return {
    loading,
    data,
    setData
  }
}
