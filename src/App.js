import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component"
const App=()=>{
    const[post,setpost]=useState([]);
    const[totalPassengers,settotalpasanger] = useState(0)
    const[pagenumber,setpagenumber]=useState(0);
    useEffect(()=>{
        const fetchApiPost= async ()=>{
            const res = await axios(
                `https://api.instantwebtools.net/v1/passenger?page=${'pagenumber'}&size=10`);
            settotalpasanger(res.data.totalPassengers)
            console.log(res.data.totalPassengers)
            setpost(res.data.data);
        }
        fetchApiPost()
    },[]);
    const fetchData=()=>{
            setpagenumber(pagenumber+1)
            const fetchApiPost= async ()=>{
                const res = await axios(
                    `https://api.instantwebtools.net/v1/passenger?page=${'pagenumber'}&size=10`);
                settotalpasanger(res.data.totalPassengers)
                setpost(post.concat(res.data.data));
            };
            fetchApiPost();
    };
    return(
        <div className="pagi">
            <h1>Inifinity Scroll bar in React</h1>
            <h3>totalpasanger={totalPassengers}</h3>
            <ol>
                {post.map((post)=>{
                    return(
                        <li>
                            {" "}
                            Name-{post.name}<br/>
                            Id = {post._id}<br/>
                            country- {post.airline[0].country}<br/>
                            name -{post.airline[0].name}
                        </li>
                    );
                })}
            </ol>
            <InfiniteScroll
                dataLength={post.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >
            </InfiniteScroll>
        </div>
    );
}
export default App;