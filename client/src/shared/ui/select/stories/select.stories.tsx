import type { Meta, StoryObj } from '@storybook/react';
import Select from '../select'

const meta: Meta<typeof Select> = {
    title: 'Shared/Select',
    component: Select,
};

type Story = StoryObj<typeof Select>;


export const Primary: Story = {
    args: {
        options: [
            {value: "1", text: 'Трансмисия'},
            {value: "2", text: 'Подвеска'},
            {value: "3", text: 'Кузов'},
        ]
    }
};


export default meta