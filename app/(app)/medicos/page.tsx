import { RecordsPage } from '@/components/demo/RecordsPage';
export default function Page() { return <RecordsPage title="Médicos e equipe" collection="team" fields={[{ key: 'name', label: 'Nome' }, { key: 'role', label: 'Especialidade / função' }]}/>; }
