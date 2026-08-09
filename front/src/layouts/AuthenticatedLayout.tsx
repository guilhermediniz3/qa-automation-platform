import { ActionIcon, AppShell, Avatar, Box, Burger, Collapse, Group, ScrollArea, Text, ThemeIcon, Tooltip, UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronRight, IconClipboardCheck, IconLayoutDashboard, IconLogout, IconMoonStars, IconSun } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { navigationGroups } from '../config/navigation';

export function AuthenticatedLayout() {
  const { session, logout } = useAuth();
  const [opened, { toggle, close }] = useDisclosure();
  const [expandedGroup, setExpandedGroup] = useState<string | null>('Cadastros');
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const location = useLocation();
  const firstName = session!.name.trim().split(' ')[0];

  return (
    <AppShell header={{ height: 68 }} navbar={{ width: 286, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding={0} className="app-shell">
      <AppShell.Header className="app-header">
        <Group justify="space-between" h="100%" px={{ base: 'md', sm: 'xl' }}>
          <Group gap="sm"><Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" aria-label="Abrir menu" /><Brand /></Group>
          <Group gap="xs">
            <Tooltip label={colorScheme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}><ActionIcon variant="subtle" color="gray" size="lg" onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} aria-label="Alternar tema">{colorScheme === 'dark' ? <IconSun size={19} /> : <IconMoonStars size={19} />}</ActionIcon></Tooltip>
            <Avatar color="indigo" radius="xl" size="sm">{firstName.slice(0, 1).toUpperCase()}</Avatar>
            <Text size="sm" fw={600} visibleFrom="xs">{session!.name}</Text>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar className="app-navbar"><AppShell.Section p="md" pb="sm" hiddenFrom="sm"><Brand /></AppShell.Section><AppShell.Section grow component={ScrollArea} px="sm"><nav aria-label="Navegação principal"><ul className="side-navigation"><li><NavLink to="/" end onClick={close} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><IconLayoutDashboard size={19} /><span>Visão geral</span></NavLink></li>{navigationGroups.map((group) => { const isGroupActive = group.items.some((item) => location.pathname === item.to); const isExpanded = expandedGroup === group.label || isGroupActive; return <li key={group.label} className="side-group"><UnstyledButton className={`side-group-trigger ${isGroupActive ? 'active-group' : ''}`} onClick={() => setExpandedGroup(isExpanded ? null : group.label)}><span>{group.label}</span>{isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}</UnstyledButton><Collapse in={isExpanded}><ul className="side-submenu">{group.items.map((item) => { const Icon = item.icon; return <li key={item.to}><NavLink to={item.to} onClick={close} className={({ isActive }) => `side-link side-sub-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{item.label}</span></NavLink></li>; })}</ul></Collapse></li>; })}</ul></nav></AppShell.Section><AppShell.Section p="sm" className="sidebar-footer"><UnstyledButton className="side-link" onClick={logout}><IconLogout size={19} /><span>Sair</span></UnstyledButton></AppShell.Section></AppShell.Navbar>
      <AppShell.Main><Box className="app-content"><Outlet /></Box></AppShell.Main>
    </AppShell>
  );
}

function Brand() { return <Group gap="sm" wrap="nowrap"><ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size={36} radius="md"><IconClipboardCheck size={21} /></ThemeIcon><Text fw={750} size="lg">ManagerQA</Text></Group>; }
