import { Box, Paper, Text, Title } from '@mantine/core';

export function DashboardPage() {
  return <Box className="page-container" data-testid="dashboard-page"><Box className="page-heading"><Text c="indigo" fw={700} size="sm" tt="uppercase" lts={.8}>Visão geral</Text><Title order={1}>Painel de qualidade</Title><Text c="dimmed" mt={6}>Os indicadores e gráficos serão construídos nesta área.</Text></Box><Paper className="dashboard-empty" radius="lg"><Text c="dimmed" size="sm">Nenhum indicador disponível no momento.</Text></Paper></Box>;
}
