import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanCalcDto } from '../dto/loan-calc-dto'

const url = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test('Returns riskDecision: negative for 17 year-old with income: 100', async ({ request }) => {
  const requestBody = LoanCalcDto.Income100Age17()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('negative')
})

test('Returns Very High Risk for 17yo with income: 100"', async ({ request }) => {
  const requestBody = LoanCalcDto.Income100Age17()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
})

test('Returns 400 Bad Request when when income is zero', async ({ request }) => {
  const requestBody = new LoanCalcDto(0, 200, 18, true, 10000, 12)
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Returns 400 Bad Request when income is >0', async ({ request }) => {
  const requestBody = new LoanCalcDto(-200, 200, 18, true, 10000, 12)
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Should return riskPeriods [6, 9, 12] and riskDecision positive for 30yo, income 20000, 6-month loan', async ({
  request,
}) => {
  const requestBody = LoanCalcDto.Income20000Age30LoanPeriod6()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('Positive test case: riskLevel is Medium Risk', async ({ request }) => {
  const requestBody = LoanCalcDto.Income20000Age30LoanPeriod6()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
})

test('Returns 400 Bad Request when debt is negative', async ({ request }) => {
  const requestBody = new LoanCalcDto(500, -500, 18, true, 10000, 12)
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Returns 400 Bad Request when loan amount is 0', async ({ request }) => {
  const requestBody = new LoanCalcDto(5000, 100, 26, true, 0, 15)
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Positive test case: riskScore is 2.0375', async ({ request }) => {
  const requestBody = LoanCalcDto.Income20000Age30LoanPeriod12()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBe(2.0375)
})

test('Should return riskLevel: Low Risk for income 20000, 30yo ', async ({ request }) => {
  const requestBody = LoanCalcDto.Income20000Age30LoanPeriod12()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
})

test('Returns 400 Bad Request when loan amount is negative', async ({ request }) => {
  const requestBody = new LoanCalcDto(20000, 100, 29, false, -150, 5)
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Returns 400 Bad Request when loan period is negative', async ({ request }) => {
  const requestBody = new LoanCalcDto(20000, 100, 20, true, 500, -1)
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
