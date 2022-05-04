import * as CurrencyFormat from 'react-currency-format';

import React from 'react'

export default function CurrencyText({value}) {
  return (
    <CurrencyFormat value={value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} />
  )
}
