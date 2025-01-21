import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'; // Importa o componente de navegação em trilha (Breadcrumbs), que exibe o caminho atual da página
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    // chama a função fetchCustomers para buscar dados dos clientes
    const customers = await fetchCustomers();

    return (
        <main>
        <Breadcrumbs // componente que exibe o caminho de navegação
            breadcrumbs={[
            { label: 'Invoices', href: 'dashboard/invoices' },
            {
                label: 'Create Invoice',
                href: 'dashboard/invoices/create',
                active: true,
            },
            ]}
            />
            <Form customers={customers} /> 
            {/* // renderiza o formulário de criação de invoices */}
        </main>
    )
}
