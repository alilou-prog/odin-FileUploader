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

    on_submit: () => { alert("submit") }
}

export default function Login() {
    return(
        <>
        <Form form={login_form} />
        </>
    )
}