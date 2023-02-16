import { describe, expect, test } from "vitest";
import { getChampions, type ChessPlayer } from "./getChampions";

interface Participant extends ChessPlayer {
	name: string;
}

describe.concurrent("getChampions", () => {

	test("Mary and Peter are champions", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 1000, age: 10, name: "Jean" },
			{ elo: 1100, age: 9, name: "Mary" },
			{ elo: 1200, age: 11, name: "Peter" },
		];
		const MARY_AND_PETER= [
			{ elo: 1100, age: 9, name: "Mary" },
			{ elo: 1200, age: 11, name: "Peter" },
		];
		//ACT
		const RESULT = getChampions(PLAYER_LIST);
		//ASSERT
		expect(RESULT).toEqual(MARY_AND_PETER);
	});

	test("a list with players will return champions and not empty", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3000, age: 30, name: "Sherlock" },
			{ elo: 3000, age: 30, name: "Magnus" },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2700, age: 30, name: "Charles Xavier" },
		];
		const EMPTY_ARRAY: never[] = [];
		//ACT
		const RESULT = getChampions(PLAYER_LIST);
		//ASSERT
		expect(RESULT).not.toEqual(EMPTY_ARRAY);
	});

	test("returns GOATS", () => {


		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3000, age: 30, name: "Magnus" },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2700, age: 30, name: "Charles Xavier" },
		];
		//ASSERT
		const CHAMPIONS: Array<Participant> = [
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 3000, age: 30, name: "Magnus" },
		];
		//ACT
		const RESULT = getChampions(PLAYER_LIST);
		//ASSERT
		expect(RESULT).toEqual(CHAMPIONS);
	});

	test("accounts for draws", () => {
			//ARRANGE
			const PLAYER_LIST: Array<Participant> = [
				{ elo: 3000, age: 30, name: "Magnus" },
				{ elo: 3000, age: 30, name: "Sherlock" },
				{ elo: 2999, age: 24, name: "Francis" },
				{ elo: 700, age: 30, name: "Félix" },
				{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
				{ elo: 2700, age: 30, name: "Charles Xavier" },
			];
			//ASSERT
			const CHAMPIONS: Array<Participant> = [
				{ elo: 2999, age: 24, name: "Francis" },
				{ elo: 3000, age: 30, name: "Magnus" },
				{ elo: 3000, age: 30, name: "Sherlock" },
			];
			//ACT
			const RESULT = getChampions(PLAYER_LIST);
			//ASSERT
			expect(RESULT).toEqual(CHAMPIONS);
	});
});
