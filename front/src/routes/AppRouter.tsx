import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticatedLayout } from '../layouts/AuthenticatedLayout';
import { DashboardPage } from '../pages/Dashboard';
import { LoginPage } from '../pages/Login';
import { ForgotPasswordPage } from '../pages/ForgotPassword';
import { ResetPasswordPage } from '../pages/ResetPassword';
import { ResourcePage } from '../pages/Resource';
import { ProtectedRoute } from './ProtectedRoute';
import { IconCode, IconFileCheck, IconFlask, IconFolders, IconListCheck, IconTestPipe, IconUserCog, IconUsers } from '@tabler/icons-react';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/esqueci-a-senha" element={<ForgotPasswordPage />} />
        <Route path="/redefinir-senha" element={<ResetPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/usuarios" element={<ResourcePage title="Usuários" description="Gerencie os usuários que acessam o ManagerQA." icon={<IconUsers />} />} />
            <Route path="/desenvolvedores" element={<ResourcePage title="Desenvolvedores" description="Organize as pessoas responsáveis pelas entregas de desenvolvimento." icon={<IconCode />} />} />
            <Route path="/testers" element={<ResourcePage title="Testers QA" description="Cadastre e acompanhe os profissionais de qualidade." icon={<IconUserCog />} />} />
            <Route path="/tecnologias" element={<ResourcePage title="Tecnologias" description="Mantenha o catálogo de tecnologias utilizadas nos sistemas." icon={<IconFlask />} />} />
            <Route path="/modulos" element={<ResourcePage title="Módulos" description="Estruture os módulos dos sistemas acompanhados pelo time." icon={<IconFolders />} />} />
            <Route path="/casos-de-teste" element={<ResourcePage title="Casos de teste" description="Centralize os cenários que serão validados pela qualidade." icon={<IconTestPipe />} />} />
            <Route path="/planos-de-teste" element={<ResourcePage title="Planos de teste" description="Organize a validação por ciclo, demanda ou versão." icon={<IconFileCheck />} />} />
            <Route path="/suites-de-teste" element={<ResourcePage title="Suítes de teste" description="Agrupe os casos de teste para execução conjunta." icon={<IconListCheck />} />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
