import jwtDecode from "jwt-decode";

export const getUserId = () => {
    const token = localStorage.token;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken) {
                return decodedToken.id;
            }
        } catch (error) {
            console.error('Greška pri dekodiranju tokena', error);
        }
    }
    return null;
}


export const isAuthenticated = () => {
    return !!localStorage.token;
}

