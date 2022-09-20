import { ChallengeSong } from './ChallengeSong';
import { ChallengeType } from './ChallengeType';

export interface Orb {
	points: number;
	challengeSongs: ChallengeSong[];
	type: ChallengeType;
}
