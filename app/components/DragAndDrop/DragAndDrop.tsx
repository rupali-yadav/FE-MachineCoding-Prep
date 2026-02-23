"use client";
import Image from "next/image";
import { useCallback, useState } from "react";


type Piece = {
    id: number;
    url: string;
};

const initialPieces: Piece[] = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/200/200?random=${i + 1}`,
}));




export default function DragAndDrop() {

    const [pieces, setPieces] = useState<Piece[]>(initialPieces);

    const [draggedId, setDraggedId] = useState<null | number>(null);

    const handleOnDragStart = useCallback((id: number) => { setDraggedId(id) }, []);

    const handleOnDrop = useCallback((id: number) => {

        const draggedPieceId = pieces.findIndex((each) => each.id === draggedId);
        const droppedId = pieces.findIndex((each) => each.id === id);

        setPieces((prev) => {
            const newPieces = [...prev];
            [newPieces[draggedPieceId], newPieces[droppedId]] = [newPieces[droppedId], newPieces[draggedPieceId]];
            debugger;
            return [...newPieces]
        })
        setDraggedId(null);

    }, [pieces, draggedId]);

    const handleOnDragOver = useCallback((e: any) => { e.preventDefault() }, []);


    return (

        <div className='border-4 mx-auto max-w-[700px] w-full'>
            <div className='p-4 grid grid-cols-3 gap-4 items-center justify-center'>
                {pieces?.map((piece) => (
                    <div
                        className=" w-auto h-[200px] relative" key={piece?.id}
                        draggable={"true"}
                        onDragStart={() => handleOnDragStart(piece?.id)}
                        onDrop={() => handleOnDrop(piece?.id)}
                        onDragOver={handleOnDragOver}
                    >
                        <Image
                            className="w-full"
                            src={piece?.url}
                            alt="Image"
                            fill={true}
                        />
                    </div>
                ))}
            </div>
        </div>

    )
} 