import type { StoryObj } from '@storybook/react';
import {Input} from '../input'
import {controls} from './controls'

export default {
    title: 'Shared/Input',
    component: Input,
    argTypes: controls
}

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
    }
};