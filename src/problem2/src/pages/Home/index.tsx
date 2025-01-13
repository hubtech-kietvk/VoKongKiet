import { LoadingOutlined, SwapOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space, Spin } from 'antd'
import React from 'react'
import { Text } from '../../components'
import { baseIconUrl, fetchCurrenciesUrl, formatMoney, quickPicks } from '../../utils'
import * as S from './styled'
import { useFetchData } from '../../hooks'

interface PriceData {
  id: string
  currency: string
  date: string
  price: number
}

interface ConvertedDataData {
  amount: number
  amountConverted: number
  unitAmount: number
  unitAmountConverted: number
}

const Home: React.FC = () => {
  const [form] = Form.useForm()
  const [isDisplayQuickPicks, setIsDisplayQuickPicks] = React.useState(false)
  const [loadingConvert, setLoadingConvert] = React.useState<boolean>(false)
  const [fromCurrency, setFromCurrency] = React.useState<PriceData | undefined>()
  const [toCurrency, setToCurrency] = React.useState<PriceData | undefined>()
  const [convertedData, setConvertedData] = React.useState<ConvertedDataData | undefined>()

  const handleAfterFetch = React.useCallback((listData: any[]) => {
    setFromCurrency(listData[0])
    setToCurrency(listData[1])
  }, [])

  const { data, loading } = useFetchData({
    url: fetchCurrenciesUrl,
    form,
    onAfterFetch: handleAfterFetch
  })

  const handleChangeForm = (values: any) => {
    if (values.fromCurrency !== undefined) {
      setFromCurrency(data.find((item) => item.id === values.fromCurrency))
    }

    if (values.toCurrency !== undefined) {
      setToCurrency(data.find((item) => item.id === values.toCurrency))
    }

    setConvertedData(undefined)
    setIsDisplayQuickPicks(false)
  }

  const handleSwap = () => {
    const temp = fromCurrency

    form.setFieldsValue({
      fromCurrency: toCurrency?.id,
      toCurrency: temp?.id
    })
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setConvertedData(undefined)
  }

  const handleConvert = () => {
    form.validateFields().then(async (values: any) => {
      setLoadingConvert(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsDisplayQuickPicks(false)
      const { amount } = values
      if (toCurrency && fromCurrency) {
        const amountConverted = (toCurrency?.price * amount) / fromCurrency?.price
        const unitAmount = fromCurrency?.price / toCurrency?.price
        const unitAmountConverted = toCurrency?.price / fromCurrency?.price

        setConvertedData({
          amount: amount,
          amountConverted: parseFloat(amountConverted.toFixed(3)),
          unitAmount: parseFloat(unitAmount.toFixed(3)),
          unitAmountConverted: parseFloat(unitAmountConverted.toFixed(3))
        })
      }
      setLoadingConvert(false)
    })
  }

  const handleReset = () => {
    setConvertedData(undefined)
    form.setFieldsValue({
      amount: 0,
      fromCurrency: data[0]?.id,
      toCurrency: data[1]?.id
    })
    setFromCurrency(data[0])
    setToCurrency(data[1])
    setIsDisplayQuickPicks(false)
  }

  const handleQuickPick = (val: number) => {
    setIsDisplayQuickPicks(false)
    form.setFieldsValue({
      amount: val.toString()
    })
    setConvertedData(undefined)
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.WrapperTitle>
          <Text className='title' weight='700' size='48px'>
            Currency Converter
          </Text>
          <Text className='description' size='24px'>
            Check live foreign currency exchange rates
          </Text>
        </S.WrapperTitle>
        <S.FormContainer>
          <S.WrapperIcons>
            <S.AnimationWrapper>
              {data
                .sort((a, b) => b.price - a.price)
                .map((item) => (
                  <S.Icon key={item.id} src={`${baseIconUrl}${item.currency}.svg`} alt={item.currency} />
                ))}
            </S.AnimationWrapper>
          </S.WrapperIcons>
          <Form disabled={loading} onValuesChange={handleChangeForm} form={form} onFinish={() => 0} layout='vertical'>
            <S.WrapperForm>
              <S.WrapperFormItem>
                <Form.Item
                  label={<Text weight='600'>Amount</Text>}
                  style={{ marginBottom: '0px' }}
                  name='amount'
                  rules={[
                    { required: true, message: 'Please enter the amount to exchange!' },
                    () => {
                      return {
                        validator(_, value) {
                          if (value === 0) {
                            return Promise.reject('Amount must be greater than 0!')
                          }
                          return Promise.resolve()
                        }
                      }
                    }
                  ]}
                >
                  <S.CInputNumber
                    addonBefore={
                      loading ? (
                        <Spin indicator={<LoadingOutlined spin />} size='small' />
                      ) : (
                        fromCurrency?.currency || ''
                      )
                    }
                    className='input'
                    size='large'
                    formatter={(inputValue) => `${inputValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(inputValue) => inputValue!.replace(/\$\s?|(,*)/g, '')}
                    placeholder='Enter amount'
                    onFocus={() => setIsDisplayQuickPicks(true)}
                    min={0}
                  />
                </Form.Item>
                {isDisplayQuickPicks && (
                  <Space size='small' style={{ margin: '8px 0' }} className='picks'>
                    <Text lineNumber={1}>Quick picks:</Text>
                    {quickPicks.map((num) => (
                      <S.CTag key={num} onClick={() => handleQuickPick(num)}>
                        {formatMoney(num)}
                      </S.CTag>
                    ))}
                  </Space>
                )}
              </S.WrapperFormItem>

              <S.WrapperFormItem>
                <Form.Item
                  label={<Text weight='600'>From</Text>}
                  name='fromCurrency'
                  rules={[
                    { required: true, message: 'You should select currency!' },
                    () => {
                      return {
                        validator(_, value) {
                          if (value === toCurrency?.id) {
                            return Promise.reject('from-currency must be different from to-currency!')
                          }
                          return Promise.resolve()
                        }
                      }
                    }
                  ]}
                >
                  <S.CSelect loading={loading} className='input' size='large' showSearch placeholder='Select currency'>
                    {data.map((item: PriceData) => (
                      <Select.Option key={item.id} value={item.id}>
                        <S.PriceItem>
                          <S.Icon src={`${baseIconUrl}${item.currency}.svg`} alt={item.currency} />
                          <Text>{item.currency}</Text>
                        </S.PriceItem>
                      </Select.Option>
                    ))}
                  </S.CSelect>
                </Form.Item>
              </S.WrapperFormItem>

              <S.WrapperFormItem>
                <Form.Item
                  label={<Text weight='600'>To</Text>}
                  name='toCurrency'
                  rules={[
                    { required: true, message: 'You should select currency!' },
                    () => {
                      return {
                        validator(_, value) {
                          if (value === fromCurrency?.id) {
                            return Promise.reject('to-currency must be different from from-currency!')
                          }
                          return Promise.resolve()
                        }
                      }
                    }
                  ]}
                >
                  <S.CSelect loading={loading} className='input' size='large' showSearch placeholder='Select currency'>
                    {data.map((item: PriceData) => (
                      <Select.Option key={item.id} value={item.id}>
                        <S.PriceItem>
                          <S.Icon src={`${baseIconUrl}${item.currency}.svg`} alt={item.currency} />
                          <Text>{item.currency}</Text>
                        </S.PriceItem>
                      </Select.Option>
                    ))}
                  </S.CSelect>
                </Form.Item>
                <S.SwapButton onClick={handleSwap} size='large' shape='circle' icon={<SwapOutlined />} />
              </S.WrapperFormItem>
            </S.WrapperForm>
            <S.WrapperForm>
              <div className='desktop' style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {convertedData && (
                    <>
                      <Text color='#8c8c8c' size='24px'>
                        {formatMoney(convertedData.amount)} {fromCurrency?.currency} =
                      </Text>
                      <Text weight='500' size='42px'>
                        {formatMoney(convertedData.amountConverted)} {toCurrency?.currency}
                      </Text>
                    </>
                  )}
                </div>
                <Space size='small' direction='vertical'>
                  {convertedData && (
                    <>
                      <Text styles={{ 'font-style': 'italic' }} lineHeight='18px'>
                        1 {fromCurrency?.currency} = {formatMoney(convertedData.unitAmountConverted)}{' '}
                        {toCurrency?.currency}
                      </Text>
                      <Text styles={{ 'font-style': 'italic' }} lineHeight='18px'>
                        1 {toCurrency?.currency} = {formatMoney(convertedData.unitAmount)} {fromCurrency?.currency}
                      </Text>
                    </>
                  )}
                  <Button
                    loading={loadingConvert}
                    disabled={loading}
                    type={convertedData ? 'default' : 'primary'}
                    onClick={convertedData ? handleReset : handleConvert}
                    style={{ width: 180 }}
                    size='large'
                  >
                    {convertedData ? 'Reset' : 'Convert'}
                  </Button>
                </Space>
              </div>

              <div style={{ width: '100%', marginTop: 12 }} className='mobile'>
                <div>
                  {convertedData && (
                    <>
                      <Text color='#8c8c8c'>
                        {formatMoney(convertedData.amount)} {fromCurrency?.currency} =
                      </Text>
                      <Text weight='500' size='32px'>
                        {formatMoney(convertedData.amountConverted)} {toCurrency?.currency}
                      </Text>
                    </>
                  )}
                </div>
                <Space style={{ width: '100%' }} size='small' direction='vertical'>
                  {convertedData && (
                    <>
                      <Text lineHeight='14px' size='12px'>
                        1 {fromCurrency?.currency} = {formatMoney(convertedData.unitAmountConverted)}{' '}
                        {toCurrency?.currency}
                      </Text>
                      <Text lineHeight='14px' size='12px'>
                        1 {toCurrency?.currency} = {formatMoney(convertedData.unitAmount)} {fromCurrency?.currency}
                      </Text>
                    </>
                  )}
                  <Button
                    loading={loadingConvert}
                    type={convertedData ? 'default' : 'primary'}
                    onClick={convertedData ? handleReset : handleConvert}
                    style={{ width: '100%' }}
                    size='large'
                  >
                    {convertedData ? 'Reset' : 'Convert'}
                  </Button>
                </Space>
              </div>
            </S.WrapperForm>
          </Form>
        </S.FormContainer>
      </S.Wrapper>
    </S.Container>
  )
}

export default Home
