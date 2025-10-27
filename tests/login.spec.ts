import { expect, test } from '@playwright/test'
import { LoginDto } from '../dto/login-dto'
import {StatusCodes} from 'http-status-codes'

test('should return token with correct username and password', async ({ request }) => {
  // prepare request body
  const requestBody =  LoginDto.createLoginDto()
  const response = await request.post('https://backend.tallinn-learning.ee/login/student',
  {
    data: requestBody
  })
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('should not return token with incorrect username and password', async ({ request }) => {
  // prepare request body
  const requestBody = new LoginDto('audingac', '')
  const response = await request.post('https://backend.tallinn-learning.ee/login/student',
    {
      data: requestBody
    })
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})