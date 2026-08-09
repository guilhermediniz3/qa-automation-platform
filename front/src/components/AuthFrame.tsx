import { Badge, Box, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconChartDots3, IconShieldCheck, IconTestPipe } from '@tabler/icons-react';
import type { ReactNode } from 'react';

export function AuthFrame({ children }: { children: ReactNode }) {
  return <Box className="login-page"><Box className="ambient ambient-one" /><Box className="ambient ambient-two" /><Box className="login-layout"><section className="brand-panel" aria-label="Apresentação do ManagerQA"><Group gap="sm" className="brand-lockup"><ThemeIcon size={44} radius="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 120 }}><IconShieldCheck size={27} /></ThemeIcon><Text fw={750} size="xl" c="white">ManagerQA</Text></Group><Box className="brand-copy"><Badge variant="light" color="indigo" radius="sm" mb="md">QUALITY OPERATIONS</Badge><Title order={1} className="brand-title">Confiança para cada entrega.</Title><Text c="rgba(232,238,255,.70)" size="lg" maw={500} lh={1.6}>Planeje, acompanhe e evidencie a qualidade do seu produto em um único fluxo.</Text></Box><Stack gap="md" className="value-list"><Feature icon={<IconTestPipe size={18} />} text="Casos, planos e suítes organizados." /><Feature icon={<IconChartDots3 size={18} />} text="Resultados e evidências em um só lugar." /></Stack></section><main className="login-main">{children}</main></Box></Box>;
}

function Feature({ icon, text }: { icon: ReactNode; text: string }) { return <Group gap="sm" wrap="nowrap"><ThemeIcon variant="light" color="indigo" size={36} radius="md">{icon}</ThemeIcon><Text c="rgba(232,238,255,.65)" size="sm">{text}</Text></Group>; }
