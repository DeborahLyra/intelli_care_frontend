import { RecordsPage } from '@/components/demo/RecordsPage';
export default function Page() { return <RecordsPage title="Serviços" collection="services" fields={[{ key: 'name', label: 'Nome' }, { key: 'duration', label: 'Duração (minutos)', type: 'number', min: 1, max: 480 }, { key: 'value', label: 'Valor (R$)', type: 'number', min: 0, max: 1000000 }]}/>; }
