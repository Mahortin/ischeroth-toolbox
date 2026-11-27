import enlightenment from '../../assets/icons/enlightenment.svg'
import genderFemale from '../../assets/icons/gender-female.svg'
import genderMale from '../../assets/icons/gender-male.svg'
import genderTransgender from '../../assets/icons/gender-transgender.svg'
import { getSpeciesIcon } from '../nameSuggestor/speciesDisplay'

function speciesCredits(artist, icons) {
  return icons.map(({ name, slug, filename = `${slug}.svg`, changes = 'Farblich angepasst.' }) => ({
    name,
    image: getSpeciesIcon(filename),
    source: {
      label: 'Game-icons.net',
      url: `https://game-icons.net/1x1/${artist}/${slug}.html`,
    },
    license: { label: 'CC BY 3.0', url: 'https://creativecommons.org/licenses/by/3.0/' },
    usage: 'Spezies-Symbol für die Namensvorschläge',
    changes,
  }))
}

export const artists = [
  {
    name: 'Lorc',
    website: { label: 'Lorc Blog', url: 'https://lorcblog.blogspot.com/' },
    icons: [
      {
        name: 'Enlightenment',
        image: enlightenment,
        source: {
          label: 'Game-icons.net',
          url: 'https://game-icons.net/1x1/lorc/enlightenment.html',
        },
        license: { label: 'CC BY 3.0', url: 'https://creativecommons.org/licenses/by/3.0/' },
        usage: 'Logo im Seitenkopf und Favicon',
        changes:
          'Farblich angepasst und als 16 × 16 Pixel große ICO-Datei für das Favicon exportiert.',
      },
      ...speciesCredits('lorc', [
        {
          name: 'Frog',
          slug: 'frog',
          filename: 'frog-adjusted.svg',
          changes: 'Grafisch bearbeitet und farblich angepasst.',
        },
        { name: 'Hoof', slug: 'hoof' },
        { name: 'Insect Jaws', slug: 'insect-jaws' },
        { name: 'Raven', slug: 'raven' },
        { name: 'Shark jaws', slug: 'shark-jaws' },
        { name: 'Wave crest', slug: 'wave-crest' },
        { name: 'Wolf head', slug: 'wolf-head' },
      ]),
    ],
  },
  {
    name: 'Delapouite',
    website: { label: 'Delapouite', url: 'https://delapouite.com/' },
    icons: speciesCredits('delapouite', [
      { name: 'Bear head', slug: 'bear-head' },
      { name: 'Eagle head', slug: 'eagle-head' },
      { name: 'Elf ear', slug: 'elf-ear' },
      { name: 'Goblin head', slug: 'goblin-head' },
      { name: 'Lynx head', slug: 'lynx-head' },
      { name: 'Orc head', slug: 'orc-head' },
      { name: 'Person', slug: 'person' },
      { name: 'Rat', slug: 'rat' },
      { name: 'Rupee', slug: 'rupee' },
      { name: 'Tiger head', slug: 'tiger-head' },
    ]),
  },
  {
    name: 'Caro Asercion',
    icons: speciesCredits('caro-asercion', [{ name: 'Hyena head', slug: 'hyena-head' }]),
  },
  {
    name: 'Kier Heyl',
    icons: speciesCredits('kier-heyl', [{ name: 'Dwarf helmet', slug: 'dwarf-helmet' }]),
  },
  {
    name: 'DarkZaitzev',
    icons: speciesCredits('darkzaitzev', [{ name: 'Chameleon glyph', slug: 'chameleon-glyph' }]),
  },
  {
    name: 'Pictogrammers',
    website: { label: 'Material Design Icons', url: 'https://pictogrammers.com/library/mdi/' },
    icons: [
      { name: 'gender-female', image: genderFemale },
      { name: 'gender-male', image: genderMale },
      { name: 'gender-transgender', image: genderTransgender },
    ].map(({ name, image }) => ({
      name,
      image,
      source: {
        label: 'Material Design Icons',
        url: `https://pictogrammers.com/library/mdi/icon/${name}/`,
      },
      license: {
        label: 'Apache-Lizenz 2.0',
        url: 'https://pictogrammers.com/docs/general/license/',
      },
      usage: 'Symbol für die Namensvorschläge',
      changes: 'Farblich angepasst.',
    })),
  },
]
