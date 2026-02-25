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
        // for drag and drop and rotate the array follow below code
        setPieces((prev) => {
            const newPieces = [...prev];

            const draggedPieceIndex = pieces.findIndex((each) => each.id === draggedId);
            let dropIndex = pieces.findIndex((each) => each.id === id);
            // remove the dragged piece from its place
            const [draggedPiece] = newPieces.splice(draggedPieceIndex, 1);

            // if drag is forward only then move the item at dropIndex backwards by 1;
            // because if drag is backward we dont want to shift the dropIndex
            if (draggedPieceIndex < dropIndex) {
                dropIndex = dropIndex - 1;
            }

            // now place draggedPiece at dropIndex ; splice returns an array rememberand changes the OG array; 
            // splice syntax : arr.splice(startIndex, deleteCount, item1, item2...)
            newPieces.splice(dropIndex + 1, 0, draggedPiece);

            return newPieces;
        });

        // for drag and drop swap
        // setPieces((prev) => {
        //     const newPieces = [...prev];
        //     [newPieces[draggedPieceIndex], newPieces[dropIndex]] = [newPieces[dropIndex], newPieces[draggedPieceIndex]];
        //     return [...newPieces]
        // })

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