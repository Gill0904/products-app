import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Page } from '../components/ui/Page';
import { useAuth } from '../store/useAuth';

// Configuración base de la historia
const meta: Meta<typeof Page> = {
  title: 'Pages/Page',
  component: Page,
};
export default meta;

type Story = StoryObj<typeof Page>;

const className = "min-h-screen flex items-center justify-center px-4";
export const WithHeader: Story = {
  render: () => {
    // Simular usuario autenticado
    useAuth.getState().user ={
      id: 1,
      email: 'luis@example.com',
      name: 'Luis Hernández',
    };

    return React.createElement(Page, { showHeader: true, children:  
      React.createElement('div', { className: 'p-6' }, 
        React.createElement('h2', { className: 'text-lg font-bold' }, 'Página con encabezado'),
        React.createElement('p', {}, 'Contenido principal de la página.')
      ),
      className
    });
  }
};

export const WithoutHeader: Story = {
  render: () => {
    return React.createElement(Page, { showHeader: false, children: 
      React.createElement('div', { className: 'p-6' }, 
        React.createElement('h2', { className: 'text-lg font-bold' }, 'Página sin encabezado'),
        React.createElement('p', {}, 'Este ejemplo no muestra el Header.')
      ),
      className
    });
  }
};
