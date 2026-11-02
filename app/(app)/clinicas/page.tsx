import { RecordsPage } from '@/components/demo/RecordsPage';
export default function Page() { return <RecordsPage title="Clínicas" collection="clinics" fields={[{ key: 'name', label: 'Nome' }, { key: 'info', label: 'Informações da clínica', type: 'textarea' }]}/>; }
