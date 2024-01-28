import type { Meta, StoryObj } from '@storybook/react';
import Button from '../button'
import {TypeButton} from '../enums/enums'


const meta: Meta<typeof Button> = {
    title: 'Shared/Button',
    component: Button,
    args: {
        text: 'Кнопка'
    }
};

type Story = StoryObj<typeof Button>;


export const Primary: Story = {
    args: {
        disabled: false,
        type: TypeButton.Primary
    }
};

export const Secondary: Story = {
    args: {
        disabled: false,
        type: TypeButton.Secondary
    }
};

export default meta;