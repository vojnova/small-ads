import {User} from './User';
import {Ad} from './Ad';

export interface Question {
  content: string;
  date: string;
  from: User;
  ad: Ad;
}
