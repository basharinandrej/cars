import type { Meta, StoryObj } from '@storybook/react';
import Card from '../card'
import {StateTag} from '../../tag/enums/enums'
import {controls} from './controls'

const meta: Meta<typeof Card> = {
    title: 'Shared/Card',
    component: Card,
    argTypes: controls
};

type Story = StoryObj<typeof Card>;


export const Primary: Story = {
    args: {
        stateTag: StateTag.Danger
    }
};

export default meta;