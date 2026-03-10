import { abort } from "process";
import { useEffect } from "react"

const MultipleApisTogether = () => {


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {

                const results = await Promise.allSettled([
                    fetch("api-url-1", { signal }).then((resp) => resp.json()),
                    fetch("api-url-2", { signal }).then((resp) => resp.json())
                ]);

                const apiData1 = results[0].status === "fulfilled" ? results[0].value : [];
                const apiData2 = results[1].status === "fulfilled" ? results[1].value : [];

                // to cancel a api call you can simply call 
                // abortController.abort();

                // clean up
                return () => { controller.abort(); }
                
            } catch (error) {
                console.error("Error fetching data from APIs:", error);
            }

            fetchData();

        }
    }, []);

    return (
        <h1>MultipleApisTogether</h1>
    )
}
export default MultipleApisTogether