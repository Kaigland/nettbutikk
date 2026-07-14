import JuridiskSide from '@/components/JuridiskSide';

export const metadata = {
  title: 'Personvernerklæring – Igland Woodcraft',
  description: 'Slik behandler Igland Woodcraft personopplysninger i nettbutikken.',
};

export default function Personvern() {
  return <JuridiskSide dokument="personvern" />;
}
