import {User} from './User';

export interface Ad {
  title: string;
  description: string;
  price: number;
  date: string;
  owner: User;
  active: boolean;
}
