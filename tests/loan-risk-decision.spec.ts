import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanCalcDto } from '../dto/loan-calc-dto'

const url = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test('E1: Positive test case: riskDecision is negative', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample1()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('negative')
})

test('E1: Positive test case: risk level is "Very High Risk"', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample1()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
})

test('E1: Negative test case: age is not provided, 400 Bad request', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample1withoutAge()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('E1: Negative test case: income is string, 400 Bad request', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample1withIncomeAsString()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('E2: Positive test case: riskPeriods is 6, 9, 12 and riskDecision is positive', async ({
  request,
}) => {
  const requestBody = LoanCalcDto.requestBodyFromExample2()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('E2: Positive test case: riskLevel is Medium Risk', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample2()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
})

test('E2: Negative test case: loanPeriod is empty', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample2withLoanPeriodEmpty()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('E2: Negative test case: employed is string', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample2withEmployedAsString()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('E3: Positive test case: riskScore is 2.0375', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample3()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBe(2.0375)
})

test('E3: Positive test case: riskLevel is Low Risk', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample3()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
})

test('E3: Negative test case: debt is boolean', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample3withDebtBoolean()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('E3: Negative test case: age is string', async ({ request }) => {
  const requestBody = LoanCalcDto.requestBodyFromExample3withAgeString()
  const response = await request.post(url, { data: requestBody })
  console.log('response status:', response.status())
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
