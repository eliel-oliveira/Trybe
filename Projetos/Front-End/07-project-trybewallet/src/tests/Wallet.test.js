import Wallet from '../pages/Wallet'
import React from 'react'
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const INITIAL_STATE = {
    user: {
      email: 'teste@trybe.com'
    },
    wallet: {
      currencies: [
        'USD',
        'CAD',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'EUR',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP',
        'DOGE'
      ],
      expenses: [],
      buttonEdit: {
        active: false,
        id: ''
      },
      error: null
    }
  }

describe('testes pagina de carteira', ()=> {
    it('testa se ao inserir valores e adicionar, a despesa é adicionada a tabela', async () => {
        renderWithRouterAndRedux(<Wallet/>,{ initialState:INITIAL_STATE })
        const inputValue = screen.getByTestId('value-input');
        const inputDescription = screen.getByTestId('description-input');
        const buttonAddExpense = screen.getByRole('button', { name: /adicionar despesa/i })
        expect(inputValue).toBeInTheDocument()
        userEvent.type(inputValue, '11')
        userEvent.type(inputDescription, 'Onze dólares')
        userEvent.click(buttonAddExpense)
        expect(await screen.findByRole('cell', { name: /11\.00/i })).toBeInTheDocument()        
        expect(await screen.findByRole('cell', { name: /onze dólares/i })).toBeInTheDocument()
        expect(await screen.findByRole('button', { name: /editar/i })).toBeInTheDocument()
        userEvent.type(inputValue, '20')
        userEvent.type(inputDescription, 'Vinte dólares')
        userEvent.click(screen.getByRole('button', { name: /editar/i }))
        expect(await screen.getByRole('button', { name: /editar despesa/i })).toBeInTheDocument()
        const buttonEdit = screen.getByRole('button', { name: /editar despesa/i })
        userEvent.click(await screen.getByRole('button', { name: /editar despesa/i }))
        expect(await screen.getByRole('cell', { name: /20\.00/i })).toBeInTheDocument()        
        expect(await screen.getByRole('cell', { name: /vinte dólares/i })).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: /excluir/i }))
        screen.logTestingPlaygroundURL()
    })   
})
