import { PLANTS } from '../utilities/enums/plants'
import { Theme } from '../utilities/enums/theme'

export const suns = { current: 0 }
export const selectedPlant: { current: PLANTS | null | 'SHOVEL' } = {
  current: null,
}
export const currentTheme: { current: Theme } = { current: Theme.DAY }
