import {User} from './User';
import {Question} from './Question';

export interface Ad {
  id?: string;
  title: string;
  description: string;
  price: number;
  date: string;
  owner?: string | User;
  active: boolean;
  questions?: string[] | Question[];
}
