import enlightenment from '../../assets/icons/enlightenment.svg'
import genderFemale from '../../assets/icons/gender-female.svg'
import genderMale from '../../assets/icons/gender-male.svg'
import genderTransgender from '../../assets/icons/gender-transgender.svg'

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
    ],
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
