'use server'; // indicando é um arquivo de servidor

import { custom, date, z } from 'zod' // biblioteca Zod para validação de dados
import { sql } from '@vercel/postgres'; // interacao com banco de dados Postgres
import { revalidatePath } from 'next/cache'; // função para revalidar a página
import { redirect } from 'next/navigation'


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

// Esquema de validação dos dados do formulário sem os campos id e date
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}