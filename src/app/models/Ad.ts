import {User} from './User';

export interface Ad {
  id?: string;
  title: string;
  description: string;
  price: number;
  date: string;
  owner?: string | User;
  active: boolean;
}
