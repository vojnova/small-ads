import {User} from './User';
import {Ad} from './Ad';

export interface Question {
  id?: string;
  content: string;
  date: string | number;
  from: string | User;
  ad: string;
  answer?: string;
}
