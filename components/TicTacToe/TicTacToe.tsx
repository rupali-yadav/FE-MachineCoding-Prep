"use client";

import { useCallback, useState } from "react";


type cellValue = "X" | "O" | null;

const winningPatterns: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const TicTacToe = () => {
    // make array of len 9 and fill it with null
    const [board, setBoard] = useState<cellValue[]>(Array(9).fill(null));
    const [winner, setWinner] = useState<string>("");
    const [isPoppysTurn, setIsPoppysTurn] = useState<boolean>(true);

    const checkIfAnyoneWon = useCallback((newBoard: cellValue[]) => {
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;

            // see if all valuea at these indices are same
            if (newBoard[a] && newBoard[a] === newBoard[b] &&
                newBoard[a] === newBoard[c]
            ) {
                return newBoard[a] === "X" ? "Poppy" : "Rose";
            }
        }

        return false;
    }, []);


    const handleCellClick = useCallback((i: number) => {
        if (board[i] || winner) return;

        const newBoard = [...board];

        newBoard[i] = isPoppysTurn ? "X" : "O";
        const newWinner = checkIfAnyoneWon(newBoard);

        setBoard(newBoard);

        // on every cell click if the current board situation matches with any of the winning patterns

        newWinner && setWinner(newWinner);
        setIsPoppysTurn(!isPoppysTurn);

    }, [board, winner, isPoppysTurn]);

    const onReset = useCallback(() => {
        setBoard(Array(9).fill(null));
        setIsPoppysTurn(true);
        setWinner("");
    }, []);

    return (
        <div className="flex flex-col items-center  bg-blue-300 w-[400px] p-4 mx-auto">
            <h1> Come play Tic-Tac-Toe with me!</h1>
            {winner && <h2 className=" text-pink-500 mt-2">Hurray {winner} has won!</h2>}
            <div className="grid grid-cols-3 items-center gap-2 bg-amber-500 w-[220px] p-2 mt-5">
                {board.map((cell, i) => (
                    <div
                        key={i}
                        className=" flex items-center justify-center w-[60px] h-[60px] bg-blue-500 border-2 text-2xl"
                        onClick={() => handleCellClick(i)}
                    >
                        {cell}
                    </div>
                ))}
            </div>

            <button
                onClick={onReset}
                className=" border-2 bg-purple-900 text-white p-2 rounded-sm mt-4"
            >
                Reset
            </button>
        </div>

    )
}

export default TicTacToe;