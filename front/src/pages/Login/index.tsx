import { Alert, Anchor, Box, Button, Paper, PasswordInput, Stack, Tabs, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconArrowRight, IconAt, IconCheck, IconLock, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../../api/auth.api';
import { AuthFrame } from '../../components/AuthFrame';
import { useAuth } from '../../contexts/AuthContext';

export function LoginPage() {
  const { session, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({ initialValues: { email: '', password: '' }, validate: { email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Informe um e-mail válido.'), password: (value) => (value ? null : 'Informe sua senha.') } });
  const returnTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/';

  if (session) return <Navigate to="/" replace />;

  const handleSubmit = form.onSubmit(async (credentials) => {
    setError(null);
    try { await login(credentials); navigate(returnTo, { replace: true }); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Ocorreu um erro inesperado.'); }
  });

  return <AuthFrame><Paper component="section" className="login-card" radius="xl" p={{ base: 'xl', sm: 40 }}><Tabs defaultValue="login" variant="pills"><Tabs.List grow mb="xl"><Tabs.Tab value="login">Entrar</Tabs.Tab><Tabs.Tab value="register">Cadastre-se</Tabs.Tab></Tabs.List><Tabs.Panel value="login"><Stack gap="xl">{error && <Alert color="red" variant="light" icon={<IconAlertCircle size={18} />}>{error}</Alert>}<form onSubmit={handleSubmit} noValidate><Stack gap="md"><TextInput label="E-mail" placeholder="voce@empresa.com" leftSection={<IconAt size={18} />} autoComplete="email" data-testid="login-email" {...form.getInputProps('email')} /><PasswordInput label="Senha" placeholder="Sua senha" leftSection={<IconLock size={17} />} autoComplete="current-password" data-testid="login-password" {...form.getInputProps('password')} /><Anchor component="button" type="button" size="sm" ta="right" onClick={() => navigate('/esqueci-a-senha')}>Esqueci minha senha</Anchor><Button type="submit" size="md" rightSection={<IconArrowRight size={18} />} loading={form.submitting} data-testid="login-submit">Entrar</Button></Stack></form></Stack></Tabs.Panel><Tabs.Panel value="register"><RegisterForm /></Tabs.Panel></Tabs></Paper></AuthFrame>;
}

function RegisterForm() { const [success, setSuccess] = useState(false); const [error, setError] = useState<string | null>(null); const form = useForm({ initialValues: { name: '', email: '', password: '', passwordConfirmation: '' }, validate: { name: (value) => value.trim() ? null : 'Informe seu nome.', email: (value) => /^\S+@\S+\.\S+$/.test(value) ? null : 'Informe um e-mail válido.', password: (value) => value.length >= 8 ? null : 'Use ao menos 8 caracteres.', passwordConfirmation: (value, values) => value === values.password ? null : 'As senhas não coincidem.' } }); const submit = form.onSubmit(async ({ name, email, password }) => { setError(null); try { await register({ name, email, password }); setSuccess(true); form.reset(); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Não foi possível concluir o cadastro.'); } }); return <Stack gap="lg"><Box><Title order={2} c="white">Crie sua conta</Title><Text c="dimmed" mt={6}>Seu acesso ficará ativo por sete dias.</Text></Box>{success && <Alert color="teal" icon={<IconCheck size={18} />}>Cadastro realizado. Você já pode entrar.</Alert>}{error && <Alert color="red" icon={<IconAlertCircle size={18} />}>{error}</Alert>}<form onSubmit={submit} noValidate><Stack gap="md"><TextInput label="Nome" leftSection={<IconUser size={17} />} {...form.getInputProps('name')} /><TextInput label="E-mail" leftSection={<IconAt size={17} />} {...form.getInputProps('email')} /><PasswordInput label="Senha" leftSection={<IconLock size={17} />} {...form.getInputProps('password')} /><PasswordInput label="Confirmar senha" leftSection={<IconLock size={17} />} {...form.getInputProps('passwordConfirmation')} /><Button type="submit" loading={form.submitting}>Cadastrar</Button></Stack></form></Stack>; }
