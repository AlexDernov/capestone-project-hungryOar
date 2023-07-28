import useSWR from "swr"

export default function LocationsList() {
    const {data, isLoading} = useSWR("api/locations");

    if(isLoading) {
        return <h1>Loading...</h1>;
    }
    if (!data) {
        return <h1>Data cannot be loaded.</h1>
    }
    return (
        <>
        <ul>
            {data.map((location) => (
                <li key={location._id}>
                    <h1>{location.name}</h1> 
                    <h2>{location.location}</h2>
                    <h3><strong>Öffnungszeiten: </strong>  <i>{location.zeit}</i></h3>
                    <h3><strong>Was gibt's? </strong><i>{location.art}</i></h3>
                    <h3><strong>Verleih: </strong><i>{location.verleih}</i></h3>
                </li>))}
                </ul>
                </>
    )
}