import { Alert, Button, Modal, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Input } from "@mantine/core";
import { Mail, ShieldAlert } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

export const APIGATEWAY_BASE_URL_DEV = import.meta.env.VITE_APIGATEWAY_BASE_URL_DEV;

async function CheckIfUserExistsQuery(email: string) {
    try {

        const queryURL = `${APIGATEWAY_BASE_URL_DEV}/checkUserExists?email=${email}`;

        const response = await fetch(queryURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error occurred while checking user existence:", error);
        throw error;
    }
}

async function SignupQuery(email: string, password: string) {
    try {
        const queryURL = `${APIGATEWAY_BASE_URL_DEV}/signup`;
        const response = await fetch(queryURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        return await response.json();
    } catch (error) {
        console.error("Error signing up the user : " + error)
        throw error;
    }
}

async function LoginQuery(email: string, password: string) {

    try {
        const queryURL = `${APIGATEWAY_BASE_URL_DEV}/login`

        const response = await fetch(queryURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": email, password })
        })

        return await response.json();
    } catch (error) {
        console.error("Error Login in a user")
        throw error;
    }
}

export default function Navbar() {

    const [opened, { open, close }] = useDisclosure(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isNewUser, setisNewUser] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const {
        data: userExistsData,
        isLoading: isUserExistsLoading,
        isError: isUserExistsError,
        refetch,
        error: userExistsError,
        isSuccess: isUserExistsSuccess,
    } = useQuery({
        queryKey: ['checkUserExists', email],
        queryFn: () => CheckIfUserExistsQuery(email),
        enabled: false
    })

    const {
        data: loginData,
        isPending: isLoginLoading,
        isError: isLoginError,
        error: loginError,
        isSuccess: isLoginSuccess,
        mutate,
    } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => LoginQuery(email, password),
        mutationKey: ["Login", email, password]
    })

    const {
        data: Signup,
        isPending: isSignupLoading,
        isError: isSignupError,
        error: SignUpError,
        isSuccess: isSignupSuccess,
        mutate: SignUpMutate
    } = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => SignupQuery(email, password),
        mutationKey: ["SignUp", email, password]
    })

    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault();

        /**
         * First call the login endpoint with the email and password.
         * If the user does not exist, then update the state to show the signup form.
         * Then call the signup endpoint with the email and password.
         * Otherwise login the user using OTP and then close the OTP and update the state to store the logged user.
         */

        const userExists = await refetch();

        if (userExists) {
            // User exists, proceed with login flow

            console.log("User exists, proceed with login flow");

            mutate({
                email, password
            })

        } else {
            // User does not exist, show signup form
            setisNewUser(true);
            console.log("User does not exist, show signup form");

            // SignUpMutate({
            //     email, password
            // })
        }

    }

    async function handleSignUp(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault()

        SignUpMutate({
            email, password
        })
    }

    return (
        <nav>
            <Modal opened={opened} onClose={close} title="Login/Signup" centered size="lg">

                {
                    !isNewUser ? (<div className="flex flex-row gap-4">
                        <div>
                            {/* Image section */}
                            <img src={"../assets/Static_login_model_image"} alt="Static Login image" />
                        </div>
                        <div className="flex flex-col gap-4 flex-1">
                            {/* Login form with username and password */}
                            <Input
                                placeholder="Enter your email"
                                value={email}
                                leftSection={<Mail />}
                                onChange={(event) => setEmail(event.currentTarget.value)}
                                rightSectionPointerEvents="all"
                                type="email"
                                mt="md"
                                rightSection={
                                    email ? (
                                        <Input.ClearButton
                                            aria-label="Clear input"
                                            onClick={() => setEmail('')}
                                        />
                                    ) : null
                                }
                                disabled={isLoginLoading || isUserExistsLoading}
                            />
                            <PasswordInput
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.currentTarget.value)}
                                disabled={isLoginLoading || isUserExistsLoading}
                            />

                            <Button variant="filled" color="grey" loading={isLoginLoading || isUserExistsLoading} onClick={() => handleLogin}>Login</Button>
                        </div>
                        {
                            isLoginError && <Alert variant="light" color="red" title="Alert title" icon={<ShieldAlert />}>
                                {loginError?.message}
                            </Alert>
                        }
                    </div>) : (
                        <div>
                            <div>
                                {/* Image section */}
                                <img src="../assets/Static_login_model_image" alt="Static Login image" />
                            </div>
                            <div className="flex flex-col gap-4 flex-1">
                                <Input
                                    placeholder="Enter your email"
                                    value={email}
                                    leftSection={<Mail />}
                                    onChange={(event) => setEmail(event.currentTarget.value)}
                                    rightSectionPointerEvents="all"
                                    type="email"
                                    mt="md"
                                    rightSection={
                                        email ? (
                                            <Input.ClearButton
                                                aria-label="Clear input"
                                                onClick={() => setEmail('')}
                                            />
                                        ) : null
                                    }

                                    disabled={isSignupLoading}
                                />

                                <PasswordInput
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.currentTarget.value)}
                                    disabled={isSignupLoading}
                                />

                                <PasswordInput
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                                    disabled={isSignupLoading}
                                />

                                <Button variant="filled" color="grey" fullWidth loading={isSignupLoading} onClick={() => handleSignUp}>
                                    Signup
                                </Button>
                            </div>
                            <div className="flex flex-col items-center">
                                {
                                    isUserExistsError && <Alert variant="light" color="red" title="Alert title" icon={<ShieldAlert />}>
                                        {userExistsError.message}
                                    </Alert>
                                }
                                {
                                    isSignupError && <Alert variant="light" color="red" title="Alert title" icon={<ShieldAlert />}>
                                        {SignUpError.message}
                                    </Alert>
                                }
                            </div>
                        </div>
                    )
                }

            </Modal>

            <div className="flex items-center justify-between">
                <div className="flex">
                    <Button variant="subtle" color="gray">Book</Button>
                    <Button variant="subtle" color="gray">Manage</Button>
                    <Button variant="subtle" color="gray">Check-in</Button>
                </div>
                <div className="flex items-center justify-between">
                    <Button variant="subtle" color="gray" onClick={open}>
                        Login
                    </Button>
                </div>
            </div>
        </nav>
    );
}
