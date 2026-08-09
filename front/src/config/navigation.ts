import { IconCode, IconFileCheck, IconFlask, IconFolders, IconListCheck, IconTestPipe, IconUserCog, IconUsers } from '@tabler/icons-react';

export const navigationGroups = [
  { label: 'Cadastros', items: [
    { label: 'Usuários', to: '/usuarios', icon: IconUsers },
    { label: 'Desenvolvedores', to: '/desenvolvedores', icon: IconCode },
    { label: 'Testers QA', to: '/testers', icon: IconUserCog },
    { label: 'Tecnologias', to: '/tecnologias', icon: IconFlask },
    { label: 'Módulos', to: '/modulos', icon: IconFolders },
  ] },
  { label: 'Qualidade', items: [
    { label: 'Casos de teste', to: '/casos-de-teste', icon: IconTestPipe },
    { label: 'Planos de teste', to: '/planos-de-teste', icon: IconFileCheck },
    { label: 'Suítes de teste', to: '/suites-de-teste', icon: IconListCheck },
  ] },
];
