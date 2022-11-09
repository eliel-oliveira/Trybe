import App from '../App'
import React from 'react'
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Testa Pagina Login', ()=> {
    it('Verfica se há um texto "faça seu login"', ()=> {
        renderWithRouterAndRedux(<App/>)
        const loginText = screen.getByText(/faça seu login/i)
        expect(loginText).toBeInTheDocument()
    })
    it('Verfica se contém um input com o data-test-id email-input', () => {
        renderWithRouterAndRedux(<App/>)
        const dataTestId = screen.getByTestId('email-input');
        expect(dataTestId).toBeInTheDocument()
    })
    it('verifica se ao inserir dados invalidos o botão de enviar fica desabilitado',() => {
        renderWithRouterAndRedux(<App/>)
        const button = screen.getByRole('button', {
            name: /entrar/i
          })
        const email = screen.getByTestId('email-input');
        const password =  screen.getByTestId('password-input');
        userEvent.type(email,'123')
        userEvent.type(password,'123')
        expect(button).toHaveAttribute('disabled')
    })

    it('verifica se ao inserir dados validos o botão de enviar fica habilitado',() => {
        renderWithRouterAndRedux(<App/>)
        const button = screen.getByRole('button', {
            name: /entrar/i
          })
        const email = screen.getByTestId('email-input');
        const password =  screen.getByTestId('password-input');
        userEvent.type(email,'teste@trybe.com')
        userEvent.type(password,'123456')
        expect(button).not.toHaveAttribute('disabled')
    })

    it('testa se ao clicar no botão entrar, ele é redirecionado para carteira', ()=> {
        const { history } =renderWithRouterAndRedux(<App/>)
        const button = screen.getByRole('button', {
            name: /entrar/i
          })
        const email = screen.getByTestId('email-input');
        const password =  screen.getByTestId('password-input');
        userEvent.type(email,'teste@trybe.com')
        userEvent.type(password,'123456')
        expect(button).not.toHaveAttribute('disabled')
        userEvent.click(button)
        expect(history.location.pathname).toBe('/carteira')
    } )

});
