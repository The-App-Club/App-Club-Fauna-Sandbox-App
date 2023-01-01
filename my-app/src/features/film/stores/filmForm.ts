import { atom } from 'recoil'
import { z } from 'zod'

export const FilmFormSchema = z.object({
  id: z.string().nullish(),
  title: z.string().nullish(),
  watched: z.boolean().nullish(),
})

export type FilmForm = z.infer<typeof FilmFormSchema>

const filmFormState = atom<FilmForm>({
  key: 'filmForm',
  default: {
    id: null,
    title: null,
    watched: null,
  },
})

export { filmFormState }
