const fetch = require('node-fetch')
const _fetch = fetch.default
const db = {}
const fetchAccounts = async db => {
  const response = await _fetch(
    'https://api.servicemonster.net/v1/accounts?limit=3',
    {
      method: 'GET',
      headers: {
        Authorization: 'Basic NGM4T1JQbk86Q2ppVU1ydHZxZVg0TVN0MA=='
      }
    }
  )

  const respObj = await response.json()
  const itemList = []
  respObj.items.forEach(item => {
    item.id = item['accountID']
    delete item.accountID
    // item.order_id = item['orderID']
    // delete item.orderID
    itemList.push(item)
  })
  db.account = itemList
  return db
}
const fetchOrders = async db => {
  const response = await _fetch(
    'https://api.servicemonster.net/v1/orders?limit=3',
    {
      method: 'GET',
      headers: {
        Authorization: 'Basic NGM4T1JQbk86Q2ppVU1ydHZxZVg0TVN0MA=='
      }
    }
  )

  const respObj = await response.json()
  const itemList = []
  respObj.items.forEach(item => {
    item.id = item['orderID']
    delete item.orderID
    item.account_id = item['accountID']
    delete item.accountID
    // console.log(item)

    itemList.push(item)
  })
  db.order = itemList
  return db
}

module.exports = async function() {
  await fetchAccounts(db)
  await fetchOrders(db)
  console.log(db)
  return db
}
