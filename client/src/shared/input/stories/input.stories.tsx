import type { Meta, StoryObj } from '@storybook/react';
import {Input} from '../input'

export default {
    title: 'Shared/Input',
    component: Input
}

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
    }
};