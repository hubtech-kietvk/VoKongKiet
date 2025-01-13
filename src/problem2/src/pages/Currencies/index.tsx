import { List, Table, TableProps } from 'antd'
import moment from 'moment'
import React from 'react'
import { Text } from '../../components'
import { useFetchData } from '../../hooks'
import { baseIconUrl, fetchCurrenciesUrl } from '../../utils'
import * as S from './styled'

const Currencies: React.FC = () => {
  const { data, loading } = useFetchData({
    url: fetchCurrenciesUrl
  })

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Name',
      key: 'id',
      render: (item: any) => (
        <S.PriceItem>
          <S.Icon src={`${baseIconUrl}${item.currency}.svg`} alt={item.currency} />
          <Text>{item.currency}</Text>
        </S.PriceItem>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => <Text>{price}</Text>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => <Text>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</Text>
    }
  ]

  return (
    <S.Container>
      <S.Wrapper>
        <S.WrapperTitle>
          <Text className='title' weight='700' size='48px'>
            Currency List
          </Text>
          <Text className='description' size='24px'>
            Check live foreign currency exchange rates
          </Text>
        </S.WrapperTitle>
        <S.WrapperTable style={{ width: '60%', background: '#fff' }}>
          <Table className='desktop' loading={loading} columns={columns} dataSource={data} />
          <List
            loading={loading}
            className='mobile'
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<S.Icon src={`${baseIconUrl}${item.currency}.svg`} alt={item.currency} />}
                  title={item.id}
                  description={
                    <div>
                      <Text>Price:{item.price}</Text>
                      <Text>Date:{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </S.WrapperTable>
      </S.Wrapper>
    </S.Container>
  )
}

export default Currencies
