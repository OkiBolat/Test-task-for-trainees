import React from 'react';
import "./ComicsItem.css";
//      "name": e.show.name,
//     "link_url": e.show.url,
//     "img_src": e.show.image.original,
//     "rating": e.show.rating.average,
//     "premiered": e.show.premiered,
//     "desc": e.show.summary,
//     "id": e.show.id
function ComicsItem(props) {
    let {name, link_url, img_src, rating, premiered, desc, id} = props.item;
    return (
        <div className="ComicsItem">
            <img src={img_src} alt={name}/>
            <a className="heading" href={link_url}>{name}</a>
            <p><b>Премьера: </b>{premiered ?? "данные отсутствуют"}</p>
            <p><b>Рейтинг: </b><span>{rating ?? "данные отсутствуют"}</span></p>
            <p className="desc">{desc != null ? desc.replace(/<\/?[a-zA-Z]+>/gi,'') : null}</p>
        </div>
    );
}

export default ComicsItem;