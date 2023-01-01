import { atom } from 'recoil'
import { z } from 'zod'

export const FilmFormSchema = z.object({
  documentId: z.string().nullish(),
  title: z.string().nullish(),
  watched: z.boolean().nullish(),
})

export type FilmForm = z.infer<typeof FilmFormSchema>

const filmFormState = atom<FilmForm>({
  key: 'filmForm',
  default: {
    documentId: null,
    title: null,
    watched: null,
  },
})

export { filmFormState }
