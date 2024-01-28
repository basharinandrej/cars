import type { Meta, StoryObj } from '@storybook/react';
import Card from '../card'


const meta: Meta<typeof Card> = {
    title: 'Shared/Card',
    component: Card,
};

type Story = StoryObj<typeof Card>;


export const Primary: Story = {
    args: {
    }
};

export default meta;