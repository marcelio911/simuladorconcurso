import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
const isNight = Number(format(new Date(), 'HH', { locale: ptBR })) > 18 ||
  Number(format(new Date(), 'HH', { locale: ptBR })) < 6;

const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
};



export { formatDateTime, isNight };