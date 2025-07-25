import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";

function App() {
    return (
        <Router>
            <div className="app">
                {/* Navigation */}
                <nav
                    style={{
                        padding: "1rem",
                        backgroundColor: "#f0f0f0",
                        marginBottom: "2rem",
                    }}
                >
                    <Link to="/" style={{ marginRight: "1rem" }}>
                        Home
                    </Link>
                    <Link to="/browse" style={{ marginRight: "1rem" }}>
                        Browse Cards
                    </Link>
                    <Link to="/profile" style={{ marginRight: "1rem" }}>
                        Profile
                    </Link>
                </nav>

                {/* Page */}
                <main style={{ padding: "0 1rem" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
