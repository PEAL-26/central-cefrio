import { MAX_IMAGE_UPLOAD_SIZE } from '@/constants/files';
import { z } from 'zod';

export const companySchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    })
    .max(255, {
      message: 'O nome não deve ter mais de 255 caracteres',
    }),
  telephone: z.string().optional(),
  email: z.string().optional(),
  site: z.string().optional(),
  address: z.string().optional(),
  taxpayer: z.string().optional(),
  location: z.string().optional(),
  logo: z
    .object({
      url: z.string().optional(),
      file: z
        .any()
        .transform((file) => file.length > 0 && file.item(0))
        .refine((file) => !file || file.size <= MAX_IMAGE_UPLOAD_SIZE, 'Arquivo muito grande')
        .optional(),
    })
    .optional(),
});

export type CompanySchemaType = z.infer<typeof companySchema>;
