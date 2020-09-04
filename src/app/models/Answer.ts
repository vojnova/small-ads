import {User} from './User';
import {Question} from './Question';

export interface Answer {
  content: string;
  date: string;
  from: User;
  question: Question;
}
