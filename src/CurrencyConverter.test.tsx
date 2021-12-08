import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CurrencyConverter from './CurrencyConverter'

const server = setupServer(
  rest.get('https://openexchangerates.org/api/currencies.json', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<CurrencyConverter />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('select'))

  expect(screen.getByRole('select')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
  server.use(
    rest.get('https://openexchangerates.org/api/currencies.json', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<CurrencyConverter />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to CurrencyConverter!')
  expect(screen.getByRole('button')).not.toBeDisabled()
})