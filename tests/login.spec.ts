import { expect, test } from '@playwright/test'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'

test.describe('Positive tests', () => {
  test('should return valid token with correct username and password', async ({ request }) => {
    const requestBody = LoginDto.createLoginDto()
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    const jwtValue = await response.text()
    const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    console.log('JWT token: ', jwtValue)
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(jwtValue).toMatch(jwtRegex)
  })
})

test.describe('Negative tests', () => {
  test('should not return token with incorrect username and password', async ({ request }) => {
    const requestBody = new LoginDto('audingac', '')
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    console.log('response body and token:', await response.text())
    expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not return token when sending a request with an incorrect HTTP method', async ({
    request,
  }) => {
    const requestBody = LoginDto.createLoginDto()
    const response = await request.get('https://backend.tallinn-learning.ee/login/student')
    console.log('response status:', response.status())
    console.log('response body:', await response.text())
    expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('should not return token when sending a request with only username', async ({ request }) => {
    const requestBody = LoginDto.createLoginDto()
    const incorrectRequestBody = { username: requestBody.username }
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: incorrectRequestBody,
    })
    console.log('response body:', await response.text())
    expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not return token when sending a request with only password', async ({ request }) => {
    const requestBody = LoginDto.createLoginDto()
    const incorrectRequestBody = { password: requestBody.password }
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: incorrectRequestBody,
    })
    console.log('response body:', await response.text())
    expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
