import AutoComplete from "@/components/AutoComplete/AutoComplete";
import DragAndDrop from "@/components/DragAndDrop/DragAndDrop";
import JSONBuilder from "@/components/JsonBuilderUI/JSONBuilder";
import { JsonValidator } from "@/components/JsonValidator/JsonValidator";
import MultiSelectDropdown from "@/components/MultiselectDropdown/MultiselectDropdown";
import NestedDropdown from "@/components/NestedDropdown/NestedDropdown";
import TicTacToe from "@/components/TicTacToe/TicTacToe";


export default function Playground() {

    return (
        <>
            {/* <NestedDropdown />
            <DragAndDrop />
            <JSONBuilder />
            <JsonValidator />
            <AutoComplete />
            <TicTacToe /> */}
            <MultiSelectDropdown />
        </>
    )
}