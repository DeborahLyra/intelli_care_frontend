import { RecordsPage } from '@/components/demo/RecordsPage';
export default function Page() { return <RecordsPage title="Pacientes" collection="patients" fields={[{ key: 'name', label: 'Nome' }, { key: 'phone', label: 'Telefone (10 a 13 dígitos)', type: 'tel', pattern: '[0-9]{10,13}' }]}/>; }
