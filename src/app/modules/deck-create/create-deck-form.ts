import { Group } from 'src/app/models/group';
import { Card } from 'src/app/models/card';

export interface CreateDeckForm {
  name: string;
  description: string;
  group: Group;
  cards?: {
    front: string;
    back: string;
  }[];
}
