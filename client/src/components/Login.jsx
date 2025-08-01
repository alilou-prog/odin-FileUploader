import { useNavigate } from "react-router-dom";
import Form from "../lib/Form"

const login_form = {
    title: "Login",
    inputs: [
        {
            label: "username",
            name: "username",
            type: "text",
        },
        {
            label: "password",
            name: "password",
            type: "password",
        }
    ],
}

export default function Login() {
    const navigate = useNavigate()

    async function login(e, set_error) {
        e.preventDefault();
        const form_data = new FormData(e.currentTarget);

        const res = await fetch('/api/users/login',
            {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(Object.fromEntries(form_data.entries()))
            }
        )
        const json = await res.json()
        if (res.ok) {
            navigate("/dashboard", { state: {user: json.user} })
        }
        else {
            set_error(json.errors)
        }
    }
    login_form.on_submit = login
    
    return (
        <>
            <Form form={login_form} />
        </>
    )
}