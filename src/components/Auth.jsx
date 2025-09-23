import { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { useEffect } from "react";

function Auth() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setEmail("");
            setPassword("");
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error.message);
        }
    };

    if (user) {
        return (
            <div
                style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    margin: "20px 0",
                }}
            >
                <h3>Welcome, {user.displayName || user.email}!</h3>
                <p>You are signed in.</p>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "20px",
                border: "1px solid #ccc",
                margin: "20px 0",
            }}
        >
            <h3>Sign In</h3>

            <form onSubmit={handleEmailAuth} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            padding: "8px",
                            marginRight: "10px",
                            width: "200px",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            padding: "8px",
                            marginRight: "10px",
                            width: "200px",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isSignUp}
                            onChange={(e) => setIsSignUp(e.target.checked)}
                        />
                        Sign up for new account
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
                </button>
            </form>

            <button onClick={handleGoogleSignIn} disabled={loading}>
                Sign In with Google
            </button>
        </div>
    );
}

export default Auth;
