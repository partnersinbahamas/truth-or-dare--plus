import { Player } from '../Types/Player';

export interface Squad {
 id: number,
 name: string,
 gamers: Player[],
 iconUrl: string,
}