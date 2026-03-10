import { useEffect } from "react"

const MultipleApisTogether = () => {


    useEffect(() => {
        try {
            const fetchData = async () => {
                let apiData1;
                let apiData2;

                const results: PromiseSettledResult<any>[] = await Promise.allSettled([
                    fetch("api-url-1").then((resp) => resp.json()),
                    fetch("api-url-2").then((resp) => resp.json())
                ]);
                // Promise.allSettled return an array of responses of these apis
                // Promise.all() return an array of responses of these 
                // apis only if all the apis are successful otherwise it will throw an error

                if (results[0]?.status === "fulfilled") {
                    apiData1 = results[0].value;
                }

                if (results[1]?.status === "fulfilled") {
                    apiData2 = results[1].value;
                }
            }

            fetchData();

        } catch (error) {
            console.error("Error fetching data from APIs:", error);
        }
    });

    return (
        <h1>MultipleApisTogether</h1>
    )
}
export default MultipleApisTogether