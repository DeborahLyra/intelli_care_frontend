import { RecordsPage } from '@/components/demo/RecordsPage';
export default function Page() { return <RecordsPage title="Usuários" collection="users" fields={[{ key: 'name', label: 'Nome' }, { key: 'email', label: 'E-mail', type: 'email' }, { key: 'role', label: 'Papel demonstrativo', type: 'select', options: ['Usuário', 'Administrador'] }]}/>; }
