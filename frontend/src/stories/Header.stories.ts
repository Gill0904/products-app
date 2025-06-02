import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/ui/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    user: { name: 'Luis' },
    onLogout: () => alert('logout'),
  },
};

export const LoggedOut: Story = {
  args: {
    onLogin: () => alert('login'),
    onCreateAccount: () => alert('create'),
  },
};
