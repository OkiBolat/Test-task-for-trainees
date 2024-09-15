import React, {useState, useEffect} from 'react';
import ComicsItem from "../ComicsItem/ComicsItem";
import "./CatalogList.css"
function CatalogList(props) {

    const [comics, setComics] = useState([]);

    useEffect(()=>{
        fetch('https://api.tvmaze.com/search/shows?q=batman')
            .then((data)=>{return data.json()})
            .then((data)=>{
                let arr = data.map((e)=>({
                    "name": e.show.name,
                    "link_url": e.show.url,
                    "img_src": e.show.image.original,
                    "rating": e.show.rating.average,
                    "premiered": e.show.premiered,
                    "desc": e.show.summary,
                    "id": e.show.id
                }))
                setComics(arr);
            })
    }, [])


    return (
        <div className="CatalogList">
            {
                comics.map((elem, i)=>{
                    return <ComicsItem item={elem} key={elem.id}/>
                 })
            }
        </div>
    );
}

export default CatalogList;