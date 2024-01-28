import type { Meta, StoryObj } from '@storybook/react';
import Loader from '../loader'
import { LoaderSize, LoaderType } from '../enums/enums';


const meta: Meta<typeof Loader> = {
    title: 'Shared/Loader',
    component: Loader,
    args: {
        size: LoaderSize.Large
    },
    parameters: {
        backgrounds: { default: 'dark' },
    }
};

type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
    args: {
        type: LoaderType.Primary
    }
};


export const Secondary: Story = {
    args: {
        type: LoaderType.Secondary
    },

};

export default meta;