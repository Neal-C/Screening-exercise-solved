export interface ChessPlayer {
	elo: number;
	age: number;
}

function isDraw<T extends ChessPlayer>(player1: NonNullable<T>, player2: NonNullable<T>): boolean{
    return player1.elo === player2.elo;
}

function matchup<T extends ChessPlayer>(player1: T, player2: NonNullable<T>) {
	if (!player1) return player2;
	if (!player2) return player1;
	return player1.elo > player2.elo ? player1 : player2;
}

function isEliminated<T extends ChessPlayer>(player1: NonNullable<T>, player2: NonNullable<T>): boolean {
	if (!player1) return true;
	if (!player2) return false;
	return player1.age >= player2.age && player1.elo < player2.elo;
}

export function getChampions<T extends ChessPlayer>(participants: Array<T>) {

    if(participants.length === 0) return [];

	const RECORD = participants.reduce((championRecord, participant) => {

		const CATEGORY = participant.age;

		const CURRENT_CHAMPION = championRecord[CATEGORY] ?? { elo: 0 };

        if(isDraw(participant, CURRENT_CHAMPION)) {
            const TUPLE = [participant,CURRENT_CHAMPION];
            championRecord.draws = championRecord.draws ?? [];
            return { ...championRecord, ...championRecord.draws.concat(TUPLE)  };
        };

		championRecord[CATEGORY] = matchup(participant, CURRENT_CHAMPION);

		return { ...championRecord };
	}, {} as any);

	const BESTS_BY_AGE = Array.from(new Set(Object.values(RECORD).flat())) as Array<T>;

	const DESCENDING_ORDERED_AGES = Object.keys(RECORD).sort((a, b) => Number(b) - Number(a));



	const CHAMPION_LIST: Array<T> = [];

	loopingOnPlayers: for (const player of BESTS_BY_AGE) {

		loopingOnAges: for (const ageCategory of DESCENDING_ORDERED_AGES) {
			if (Number(ageCategory) === player.age) continue loopingOnAges;
			if (isEliminated(player, RECORD[ageCategory])) continue loopingOnPlayers;
		};

		CHAMPION_LIST.push(player);
	};

	return CHAMPION_LIST;
}
