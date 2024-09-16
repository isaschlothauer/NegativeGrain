import { format } from 'date-fns';

export default function DateFormatter(dateCreated: Date) {
  return format(dateCreated, 'd LLLL, yyyy');  
}
