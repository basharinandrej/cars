import {
  LinuxOutlined,
  ProfileOutlined,
  CarOutlined,
  CustomerServiceOutlined, 
  RubyOutlined, 
  UnorderedListOutlined, 
  UserSwitchOutlined, 
  SnippetsOutlined,
  BuildOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { ReactNode } from 'react';

export const iconMap: Record<string, ReactNode> = {
    'profile': <ProfileOutlined />,
    'car': <CarOutlined />,
    'list': <UnorderedListOutlined />,
    'users': <UserSwitchOutlined />,
    'category-detail': <BuildOutlined />,
    'my-request': <SnippetsOutlined />,
    'category-services': <CustomerServiceOutlined />,
    'brands': <RubyOutlined />,
    'models': <LinuxOutlined />,
    'my-services': <ToolOutlined />
  }