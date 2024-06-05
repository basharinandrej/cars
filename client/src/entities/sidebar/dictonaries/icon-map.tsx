import {
  LinuxOutlined,
  ProfileOutlined,
  CarOutlined,
  CustomerServiceOutlined, 
  RubyOutlined, 
  UnorderedListOutlined, 
  UserSwitchOutlined,
  CompassOutlined,
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
    'organizations': <CompassOutlined />,
    'category-detail': <BuildOutlined />,
    'my-request': <SnippetsOutlined />,
    'category-services': <CustomerServiceOutlined />,
    'brands': <RubyOutlined />,
    'models': <LinuxOutlined />,
    'my-services': <ToolOutlined />
  }