export const formatMoney = (number: number, thousandsSep = ',') => {
  if (!number || number === 0) return 0
  // if (!number) return '';
  number = Math.round(number * 1000) / 1000

  return (
    number &&
    number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep)
      .replace(/-/g, '- ')
  )
}
