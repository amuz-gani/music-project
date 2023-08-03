import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
    const [token, setToken] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const handleTokenReceived = (receivedToken) => {
            setToken(receivedToken);
        };

        // 여기에서 스포티파이 인증 절차를 거친 후, 토큰을 얻어오는 로직을 작성해야 합니다.
        // handleTokenReceived 함수를 호출하여 토큰을 설정합니다.

        // 토큰자리
        handleTokenReceived(
            "BQD8S01SFLr_-nO9QpRnZ8aQqO00JSs0XFN0Y7SHBQdd9yhU6Figz_UyZoWG7c5RnZ0ZzRdOc7RCGkCBbx5wiiAWFt8UgHJJ6WD6U_3ndjWt9K3Yq8RoQAVLF2_GNCj-NinXUDyC2bW_tQYFQnTr22UX6NIEPnERgQ3sXFszISIi8nUpxLySV-uLE8qnBRGCSJ6vQb4u0DJz9O-R-zY-yVPBdaQz"
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
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">Music site</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-center">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <div className="row justify-content-end pb-2 mt-4">
                    <h3>Spotify Top 50</h3>
                    <form onSubmit={handleSearchSubmit}>
                        <div className="d-flex">
                            <input type="text" value={searchTerm} onChange={handleSearchChange} />
                            <button type="submit" className="ms-2">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                {searchResult.map((music, index) => (
                    <div key={index}>
                        {index + 1}. {music.name} - {music.artists[0].name}
                    </div>
                ))}
            </Container>
        </div>
    );
}

export default App;
