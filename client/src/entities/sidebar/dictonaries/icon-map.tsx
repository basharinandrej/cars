import {ProfileOutlined,CarOutlined, UnorderedListOutlined, UserSwitchOutlined, SnippetsOutlined, BuildOutlined} from '@ant-design/icons';
import { ReactNode } from 'react';

export const iconMap: Record<string, ReactNode> = {
    'profile': <ProfileOutlined />,
    'car': <CarOutlined />,
    'list': <UnorderedListOutlined />,
    'users': <UserSwitchOutlined />,
    'category-detail': <BuildOutlined />,
    'my-request': <SnippetsOutlined />
  }