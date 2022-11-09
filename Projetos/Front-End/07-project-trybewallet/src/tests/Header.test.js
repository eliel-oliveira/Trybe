import Header from '../components/Header'
import App from '../App'
import React from 'react'
import { renderWithRouterAndRedux, renderWithRouter } from '../tests/helpers/renderWith'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const INITIAL_STATE = {
    user: {
        email:'teste@trybe.com'
    },
    wallet:{
        currencies:['USD'],
        expenses:[
            {
                id: 0,
                value: '11',
                description: 'Onze dólares',
                currency: 'USD',
                method: 'Dinheiro',
                tag: 'Alimentação',
                exchangeRates: {
                    USD: {
                        code: 'USD',
                        codein: 'BRL',
                        name: 'Dólar Americano/Real Brasileiro',
                        high: '5.2832',
                        low: '5.2793',
                        varBid: '0.0009',
                        pctChange: '0.02',
                        bid: '5.2776',
                        ask: '5.2811',
                        timestamp: '1659474000',
                        create_date: '2022-08-02 18:00:00'
                      },
                },
              }
        ],
        buttonEdit: {
            active: false,
            id: ''
          },
    }
}

describe('Testes do componente Header', () => {
    it('verifica se exite um input para moeda header-currency-field', () => {
        renderWithRouterAndRedux(<Header/>);
        const currencyField = screen.getByTestId(/header-currency-field/i)
        expect(currencyField).toBeInTheDocument();
        expect(currencyField).toHaveTextContent('BRL')
    })

    it('verifica se exite um input para moeda email-field', () => {
        renderWithRouterAndRedux(<Header/>, { initialState:INITIAL_STATE });
        const email = screen.getByTestId(/email-field/i)
        expect(email).toBeInTheDocument();
        expect(email).toHaveTextContent('teste@trybe.com')
    })
    
    it('verifica se exite um input para moeda "total-field"', () => {
        renderWithRouterAndRedux(<Header/>, { initialState:INITIAL_STATE });
        const total = screen.queryByText(/58.09/i)
        expect(total).toBeInTheDocument()
        expect(total).toHaveTextContent('58.09')
    })
})
