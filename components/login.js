import {useState} from "react";
import {paragon} from "@useparagon/connect";

export default function Login({setUser}){
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit = async () => {
        let usr = {
            usernameOrEmail: email,
            password: password
        }
        await fetch(process.env.NEXT_PUBLIC_AUTH_BACKEND, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usr)
        }).then(function (data) {
            data.json().then((response) => {
                console.log(response);
                if (response.accessToken) {
                    paragon.authenticate(process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID, response.accessToken);
                    sessionStorage.setItem("jwt", response.accessToken);
                    setUser(paragon.getUser());
                } else {
                    setErrorMessage("Login Unsuccessful");
                }
            })
        }).catch(() => setErrorMessage("Login Unsuccessful"))
    };


    return(
            <div className="mt-40 mx-[640px] place-self-center w-1/3 text-center flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl">
                <div className="p-6 md:p-20">
                    <h2 className="font-sans font-bold mb-2 text-lg">Log In</h2>
                    <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
                        Log in to your account to access your Paragon integrations
                    </p>
                    <input type="email" id="email"
                           className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Email" onChange={(e) => handleInputChange(e)}/>
                    <input type="password" id="password"
                           className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Password"
                           onChange={(e) => handleInputChange(e)}/>
                    {errorMessage && <div className="text-red-700 my-2"> {errorMessage} </div>}
                    <div>
                        <button
                            className="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                            onClick={() => handleSubmit()} type="submit">Login
                        </button>
                    </div>
                </div>
            </div>
    );
}