import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Banner from "../image/banner.jpg";

function Main() {
    const [token, setToken] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchClick, setSearchClick] = useState(false);

    useEffect(() => {
        const handleTokenReceived = (receivedToken) => {
            setToken(receivedToken);
        };

        // 토큰자리
        handleTokenReceived(
            "BQAzr9a2LKkYtSKdI-4lmPNAgyaStN1AXQBvhRbuBdZRD3707Q3AKC7V9Ik6tLsY9jtpcaonpsX2OZuei13Z2olNDoR1XtSB6nmmyETWJR1n1toRK3bWW3YRB3m3yqS8nw1ZrGNuPv7uYjFhA4tdVZ7dpZHOXq6XWvcCJ8s_Uk7UqKzllq7I8yutZiNof8jkBqzGVKcuxTe2xFxpoiTzK9X6XhXk"
        );
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        if (token && searchTerm) {
            try {
                const response = await axios.get(
                    `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setSearchResult(response.data.tracks.items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    const getPopularTracks = async () => {
        try {
            const response = await axios.get(
                "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSearchResult(response.data.items.map((item) => item.track));
        } catch (error) {
            console.error("Error fetching popular tracks:", error);
        }
    };

    useEffect(() => {
        if (token) {
            getPopularTracks();
        }
    }, [token]);

    console.log("##searchResult", searchResult);
    return (
        <div>
            <img src={Banner} width={"100%"} height={"300px"} />
            <Container>
                <div
                    className="pb-2 mt-4"
                    // style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <form onSubmit={handleSearchSubmit}>
                        <div className="flex">
                            <input type="text" value={searchTerm} onChange={handleSearchChange} />
                            <button
                                type="submit"
                                className="ms-2"
                                onClick={() => setSearchClick(true)}
                            >
                                검색하기
                            </button>
                        </div>
                    </form>
                </div>
                {searchClick ? (
                    <h4 className="mt-3">검색결과</h4>
                ) : (
                    <h4 className="mt-3">인기있는 음악 Top 50</h4>
                )}

                {searchResult.map((music, index) => (
                    <div
                        key={index}
                        className="my-4"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <div style={{ marginRight: "20px", width: "20px" }}>{index + 1}.</div>
                        <div style={{ marginRight: "20px" }}>
                            <img src={music.album.images[0].url} width={"50px"} />
                        </div>
                        <div>
                            {music.name} - {music.artists[0].name}
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    );
}

export default Main;
