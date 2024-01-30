import type { Meta, StoryObj } from '@storybook/react';
import Tag from '../tag'
import { SizeTag, StateTag } from '../enums/enums'


const meta: Meta<typeof Tag> = {
    title: 'Shared/Tag',
    component: Tag,
    args: {
        text: 'Tag',
        size: SizeTag.Large
    }
};

type Story = StoryObj<typeof Tag>;


export const Primary: Story = {
    args: {
        state: StateTag.Primary
    }
};

export const Danger: Story = {
    args: {
        state: StateTag.Danger
    }
};

export const Warning: Story = {
    args: {
        state: StateTag.Warning
    }
};

export const Success: Story = {
    args: {
        state: StateTag.Success
    }
};

export default meta;