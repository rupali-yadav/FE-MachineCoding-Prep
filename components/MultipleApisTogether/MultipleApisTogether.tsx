import { useEffect } from "react"

const MultipleApisTogether = () => {


    useEffect(() => {
        try {

            const fetchData = async () => {
                const results = await Promise.allSettled([
                    fetch("api-url-1").then((resp) => resp.json()),
                    fetch("api-url-2").then((resp) => resp.json())
                ]);

                const apiData1 = results[0].status === "fulfilled" ? results[0].value : [];
                const apiData2 = results[1].status === "fulfilled" ? results[1].value : [];
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