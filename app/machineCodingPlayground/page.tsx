import AutoComplete from "@/components/AutoComplete/AutoComplete";
import DragAndDrop from "@/components/DragAndDrop/DragAndDrop";
import InfiniteScrollPosts from "@/components/InfiniteScroll/InfiniteScrollOffsetHeight";
import InfiniteScrollPostsObserver from "@/components/InfiniteScrollPostsObserver/InfiniteScrollPostsObserver";
import JSONBuilder from "@/components/JsonBuilderUI/JSONBuilder";
import { JsonValidator } from "@/components/JsonValidator/JsonValidator";
import MultiSelectDropdown from "@/components/MultiselectDropdown/MultiselectDropdown";
import NestedDropdown from "@/components/NestedDropdown/NestedDropdown";
import Tabs from "@/components/Tabs/Tabs";
import MyTabs from "@/components/TabsUsingContext/MyTabs";
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
            {/* <MultiSelectDropdown /> */}
            {/* <InfiniteScrollPosts /> */}
            {/* <Tabs /> */}
            <MyTabs />
        </>
    )
}