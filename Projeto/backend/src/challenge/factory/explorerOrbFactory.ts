import { EnergeticOrbCalculator } from '../orbCalculators/energeticOrbCalculator';
import { ExplorerOrbCalculator } from '../orbCalculators/explorerOrbCalculator';

export class ExplorerOrbFactory {
	create(type: string) {
		switch (type) {
			case 'explorer':
				return new ExplorerOrbCalculator();
			case 'energetic':
				return new EnergeticOrbCalculator();
			default:
				throw new Error('Not implemented');
		}
	}
}
