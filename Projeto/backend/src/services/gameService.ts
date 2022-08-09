import { challengeService } from "./challengeService";

export default class GameService{
  challengeService;

  constructor(){
    this.challengeService = challengeService;
  }

  oi(){
    this.challengeService.oi();
  }
}