export class Player {
  name: string;
  life: number;
  main: boolean = false;

  constructor(name: string, life: number) {
    this.name = name;
    this.life = life;
  }
}
