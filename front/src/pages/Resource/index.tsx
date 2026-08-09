import { Box, Paper, Text, ThemeIcon, Title } from '@mantine/core';
import type { ReactNode } from 'react';

type ResourcePageProps = { title: string; description: string; icon: ReactNode };

export function ResourcePage({ title, description, icon }: ResourcePageProps) {
  return <Box className="page-container"><Box className="page-heading"><Text c="indigo" fw={700} size="sm" tt="uppercase" lts={.8}>Gerenciamento</Text><Title order={1}>{title}</Title><Text c="dimmed" mt={6}>{description}</Text></Box><Paper className="empty-panel" radius="lg" p="xl"><ThemeIcon variant="light" color="indigo" size={48} radius="md">{icon}</ThemeIcon><Title order={3} mt="lg">Área em preparação</Title><Text c="dimmed" mt="xs" maw={430}>A listagem, filtros e formulários deste módulo serão conectados à API existente na próxima etapa.</Text></Paper></Box>;
}
