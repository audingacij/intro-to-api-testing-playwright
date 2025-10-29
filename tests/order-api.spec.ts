import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from '../dto/order-dto'

const url = 'https://backend.tallinn-learning.ee/test-orders/'

//
// PUT
//

const validApiKey = '1234567891234567'

test('Positive: Update order with valid id = 1 + valid api_key | 200 OK', async ({ request }) => {
  const requestBody = new OrderDto('John', '999889999', 'comment', 7)
  const headers = { api_key: validApiKey }
  const response = await request.put(url + '1', { data: requestBody, headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Positive: Update order with valid id = 2 + valid api_key | 200 OK', async ({ request }) => {
  const requestBody = new OrderDto('John', '999889999', 'comment', 2)
  const headers = { api_key: validApiKey }
  const response = await request.put(url + '2', { data: requestBody, headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect(response.status()).toBe(StatusCodes.OK)
})

test('Positive: Update order with valid id = 3 + valid api_key | 200 OK', async ({ request }) => {
  const requestBody = new OrderDto('John', '999889999', 'comment', 3)
  const headers = { api_key: validApiKey }
  const response = await request.put(url + '3', { data: requestBody, headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect(response.status()).toBe(StatusCodes.OK)
})

test('Negative: Update order with invalid api_key = 123 | 401 Unauthorized', async ({
  request,
}) => {
  const requestBody = OrderDto.createOpenOrderWithLowPriority()
  const headers = { api_key: '123' }

  const response = await request.put(url + '1', { data: requestBody, headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Negative: Update order with invalid api_key = 123456789012345a | 401 Unauthorized', async ({
  request,
}) => {
  const body = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 1,
  }
  const headers = { api_key: '123456789012345a' }

  const response = await request.put(url + '1', { data: body, headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Negative: Update order with invalid "id": a | 400 Bad Request', async ({ request }) => {
  const body = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 'a',
  }
  const headers = { api_key: validApiKey }

  const response = await request.put(url + 'a', { data: body, headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

//
// DELETE
//

test('Positive: Delete order with valid ID = 4 | 204 No content', async ({ request }) => {
  const headers = { api_key: validApiKey }

  const response = await request.delete(url + '4', { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Positive: Delete order with valid ID = 5 | 204 No content', async ({ request }) => {
  const headers = { api_key: validApiKey }

  const response = await request.delete(url + '5', { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Positive: Delete order with valid ID = 6 | 204 No content', async ({ request }) => {
  const headers = { api_key: validApiKey }

  const response = await request.delete(url + '6', { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Negative: Delete order with invalid api_key = 123 | 401 Unauthorized', async ({
  request,
}) => {
  const headers = { api_key: '123' }

  const response = await request.delete(url + '1', { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Negative: Delete order with invalid api_key = 123456789012345b | 401 Unauthorized', async ({
  request,
}) => {
  const headers = { api_key: '123456789012345b' }

  const response = await request.delete(url + '1', { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Negative: Delete order with invalid api_key = x | 401 Unauthorized', async ({ request }) => {
  const headers = { api_key: 'x' }

  const response = await request.delete(url + '1', { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

//
//  GET
//

test('Positive: Get order with valid username: username1, password: Password123 | 200 OK', async ({
  request,
}) => {
  const response = await request.get(`${url}?username=username1&password=Password123`)
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Positive: Get order with valid username: username2, password: Hello123 | 200 OK', async ({
  request,
}) => {
  const response = await request.get(`${url}?username=username2&password=Hello123`)
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Positive: Get order with valid username: username3, password: Welcome01 | 200 OK', async ({
  request,
}) => {
  const response = await request.get(`${url}?username=username3&password=Welcome01`)
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Negative: Get order with valid username: username4, missing password | 500 Undocumented', async ({
  request,
}) => {
  const headers = { username: 'username4' }

  const response = await request.get(url, { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Negative: Get order with empty username and password | 500 Undocumented', async ({
  request,
}) => {
  const headers = { username: '', password: '' }

  const response = await request.get(url, { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Negative: Get order with empty username, valid password: Valid123 | 500 Undocumented', async ({
  request,
}) => {
  const headers = { username: '', password: 'Valid123' }

  const response = await request.get(url, { headers })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
