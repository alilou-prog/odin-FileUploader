import { useNavigate } from "react-router-dom";
import Form from "../lib/Form";

const signup_form = {
    title: "Sign up",
    inputs: [
        {
            label: "firstname",
            name: "firstname",
            type: "text",
        },
        {
            label: "lastname",
            name: "lastname",
            type: "text",
        },
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

export default function Sign_up() {
    const navigate = useNavigate()

    async function handle_submit(e, set_error) {
        e.preventDefault();
        const form_data = new FormData(e.currentTarget);

        const res = await fetch('/api/users', 
            {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(Object.fromEntries(form_data.entries()))
            }
        )
        if(res.ok) {
            navigate("/")
        }
        else {
            const data = await res.json()
            set_error(data.errors)
        }
    }

    signup_form.on_submit = handle_submit

    return (
        <Form form={signup_form}/>
    )
}