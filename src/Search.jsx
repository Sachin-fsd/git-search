import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
function Search() {
    const navigate = useNavigate()
    let [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [location, setLocation] = useState("Delhi")
    const [name, setName] = useState("")
    const [language, setLanguage] = useState("")
    const [total, setTotal] = useState(0)
    // Function to fetch users based on location
    function fetchUsersByLocation(location, page) {
        setLoading(true);
        toast("Wait...!")
        // GitHub Search API endpoint
        const api = `https://api.github.com/search/users?q=location:${location}+&page=${page}`

        // Use Fetch API to get users
        fetch(api)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`GitHub API responded with ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTotal(data.total_count);
                setData(data.items);
                // 'data' contains an array of users who have set their location to the specified value
                // You can loop through the array and display the user details on your website
            })
            .catch(error => {
                console.error('Error:', error);
            });
        // const data = JSON.parse(localStorage.getItem("data"));
        // data.push(data)
        // console.log(data)
        // setTotal(data.length);
        // setData(data);
        setLoading(false)

    }
    // function fetchUsersByName(username, page) {
    //   // GitHub Search API endpoint
    //   const api = `https://api.github.com/search/users?q=${username}&page=${page}`;

    //   // Use Fetch API to get users
    //   fetch(api)
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error(`GitHub API responded with ${response.status}`);
    //       }
    //       return response.json();
    //     })
    //     .then(data => {
    //       console.log(data);
    //       setTotal(data.total_count)

    //       setData(data.items)
    //       // 'data' contains an array of users who have the specified username
    //       // You can loop through the array and display the user details on your website
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }
    // function fetchUserByUsername(username) {
    //   // GitHub API endpoint
    //   const api = `https://api.github.com/users/${username}`;

    //   // Use Fetch API to get user
    //   fetch(api)
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error(`GitHub API responded with ${response.status}`);
    //       }
    //       return response.json();
    //     })
    //     .then(data => {
    //       console.log(data);
    //       setData([data])

    //       // 'data' contains the user who has the specified username
    //       // You can display the user details on your website
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }

    // useEffect(() => {
    //     // localStorage.getItem("loggedIn") ? fetchUsersByLocation('Delhi', page) : navigate("/login")
    //     fetchUsersByLocation('Delhi', page)

    // }, [])
    useEffect(() => {
        fetchUsersByLocation(location, page);
    }, [page])

    return (
        <div className='content'>
            <h1>Search Github Users by Location</h1>
            <input
                className='input'
                type="text" value={location} placeholder='Enter Location' onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setPage(1); // Reset page on Enter
                    }
                  }}
                />
            <button
                className='btn btn-primary'
                onClick={() => setPage(1)}
                
            > Search</button> <br />
            <div>
                {page > 1 && <button
                    className='btn'
                    onClick={() => setPage(page - 1)}>Previous
                </button>
                }

                {
                    total / 30 > 1 && <button onClick={() => setPage(page + 1)}>Next</button>
                }

            </div>
            {/* <p>Total Results: {total}</p> */}
            {/* <div className='filter'>
                <div className='gender'>
                    <label>Sort By Gender: </label>
                    <select>
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>

                    </select>
                </div>
            </div> */}
            <h1>Users</h1>
            {
                loading ?
                    <ClipLoader /> :
                    <div className="feeds" id="feeds">
                        {data.map((post, index) => {
                            return (
                                <div className="feed user-profile" key={index}>
                                    {/* <PostCard post={post} setPosts={setPosts} /> */}
                                    {/* <Link to={post.html_url}> */}
                                    <a href={post.html_url} target='blank'>

                                        <h2>{post.login}</h2>
                                    </a>
                                    {/* </Link> */}
                                    <img src={post.avatar_url} className='profile-photo' />
                                </div>
                            );
                        })}
                    </div>
            }
            <div>
                {page > 1 && <button
                    className='btn'
                    onClick={() => setPage(page - 1)}>Previous
                </button>
                }
                {
                    total / 30 > 1 && <button onClick={() => setPage(page + 1)}>Next</button>
                }

            </div>
            <div className='pagination'>
                {
                    [...Array(Math.ceil(total / 30))].map((item, index) => {
                        if (index + 1 < 35) {
                            return <button key={index} onClick={() => setPage(index + 1)} className={`page-no ${page === index + 1 ? "active" : ""}`}>{index + 1}</button>
                        }
                    })
                }
            </div>
        </div>
    );
}
export default Search