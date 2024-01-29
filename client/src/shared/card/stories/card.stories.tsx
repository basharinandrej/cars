import type { Meta, StoryObj } from '@storybook/react';
import Card from '../card'
import {StateTag} from '../../tag/enums/enums'
import {controls} from './controls'
import { TypeCard } from '../enums/enums';
import {getMapWithTextTagForWearDetail, getMapWithTextTagForStatusWork} from './get-map-with-tag-text'

const meta: Meta<typeof Card> = {
    title: 'Shared/Card',
    component: Card,
    argTypes: controls
};

type Story = StoryObj<typeof Card>;


export const Grid: Story = {
    args: {
        typeCard: TypeCard.Grid,
        buttonText: 'Подробнее',
        mapWithTagText: getMapWithTextTagForWearDetail()
    }
};

export const Row: Story = {
    args: {
        typeCard: TypeCard.Row,
        buttonText: 'Записаться',
        mapWithTagText: getMapWithTextTagForStatusWork()
    }
};

export default meta;