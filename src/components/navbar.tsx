import { Alert, Button, Modal, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { Mail, ShieldAlert } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import loginImage from "../assets/Static_login_model_image.png";
import { useBearStore } from "../store/store";

interface checkUserExistsResponse {
    doesUserExist: boolean;
}

interface SignupResponse {
    message: string;
}

export const APIGATEWAY_BASE_URL_DEV = import.meta.env.VITE_APIGATEWAY_BASE_URL_DEV;

async function CheckIfUserExistsQuery(email: string) {
    try {

        const queryURL = `${APIGATEWAY_BASE_URL_DEV}/checkUserExists?username=${email}`;

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
        const queryURL = `${APIGATEWAY_BASE_URL_DEV}/register`;
        const response = await fetch(queryURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        console.log(response)

        if (response.ok) {
            console.log(`response is ok`)
        }

        if (response.ok === false) {
            const errorData = await response.json();
            console.error(`Error signing up the user: ${errorData.message}`);
            throw new Error(errorData.message);
        }

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
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        if (response.ok === false) {
            const errorData = await response.text();
            console.error(`Error logging in the user: ${errorData}`);
            throw new Error(errorData);
        }

    } catch (error) {
        console.error("Error Login in a user")
        throw error;
    }
}

async function LogoutQuery() {
    try {
        const queryURL = `${APIGATEWAY_BASE_URL_DEV}/logout`
        const response = await fetch(queryURL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok === false) {
            const errorData = await response.text();
            console.error(`Error logging out the user: ${errorData}`);
            throw new Error(errorData);
        }

    } catch (error) {
        console.error("Error logging out a user")
        throw error;
    }
}

async function CheckIfTokenIsValidQuery() {
    try {
        const queryURL = `${APIGATEWAY_BASE_URL_DEV}/checkIfTokenValid`
        const response = await fetch(queryURL, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok === false) {
            const errorData = await response.text();
            console.error(`Error checking token validity: ${errorData}`);
            throw new Error(errorData);
        }

    } catch (error) {
        console.error("Error checking token validity")
        throw error;
    }
}

export default function Navbar() {

    const [opened, { open, close }] = useDisclosure(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isNewUser, setisNewUser] = useState(false)


    const {
        isLoading: isUserExistsLoading,
        isError: isUserExistsError,
        refetch,
        error: userExistsError,
    } = useQuery<checkUserExistsResponse>({
        queryKey: ['checkUserExists', email],
        queryFn: () => CheckIfUserExistsQuery(email),
        enabled: false
    })

    const {
        isLoading: isTokenValidLoading,
        isError: isTokenValidError,
        refetch: refetchTokenValidity,
    } = useQuery({
        queryKey: ['checkIfTokenValid'],
        queryFn: () => CheckIfTokenIsValidQuery(),
        enabled: false
    })

    const logoutMutation = useMutation({
        mutationFn: () => LogoutQuery(),
        mutationKey: ["Logout"],
    })

    function resetState() {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setisNewUser(false);
    }

    const {
        isPending: isLoginLoading,
        isError: isLoginError,
        error: loginError,
        isSuccess: isLoginSuccess,
        mutate,
    } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => LoginQuery(email, password),
        mutationKey: ["Login", email, password],
        onSuccess(data, variables, context) {
            console.log(`Login successful, data : ${JSON.stringify(data)}`)
            // Set the Auth Token in HTTP Only Cookie
        }
    })

    const {
        isPending: isSignupLoading,
        isError: isSignupError,
        error: SignUpError,
        isSuccess: isSignupSuccess,
        mutate: SignUpMutate
    } = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => SignupQuery(email, password),
        mutationKey: ["SignUp", email, password],
        onError(error, variables, onMutateResult, context) {
            console.log(`error calling the Sign Up function, ${error}`)

            console.log(`onMutateResult : ${onMutateResult}`)
        },
        onMutate(variables, context) {
            if (variables.password !== confirmPassword) {
                console.log(`Passwords do not match!`)
                throw new Error("Passwords do not match!")
            }
        },
        onSuccess(data, variables, context) {
            console.log(`Sign Up successful, data : ${JSON.stringify(data)}`)

        }
    })

    useEffect(() => {
        if (isSignupSuccess || isLoginSuccess) {
            close();
            setPassword("");
            setEmail("");
            setConfirmPassword("");
            setisNewUser(false);
            useBearStore.getState().setIsUserLoggedIn(true);
            useBearStore.getState().setEmail(email);
        }

        // Check if the token is valid or not, if not then reset the state and close the modal

        if (useBearStore.getState().isUserLoggedIn) {

            refetchTokenValidity().then((response) => {
                if (response.data === undefined) {
                    console.log(`Token is not valid, resetting the state and closing the modal`)
                    resetState();
                    close();
                    useBearStore.getState().setIsUserLoggedIn(false);
                } else {
                    console.log(`Token is valid, user is logged in`)
                }
            })
        }


        return () => {
            resetState();
        }
    }, [isSignupSuccess, isLoginSuccess, useBearStore.getState().isUserLoggedIn]);



    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault();

        /**
         * First call the login endpoint with the email and password.
         * If the user does not exist, then update the state to show the signup form.
         * Then call the signup endpoint with the email and password.
         * Otherwise login the user using OTP and then close the OTP and update the state to store the logged user.
         */

        const userExists = await refetch();

        userExists.data?.doesUserExist

        if (userExists.data?.doesUserExist) {
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

    async function handleLogout() {
        try {
            await LogoutQuery();
            useBearStore.getState().setIsUserLoggedIn(false);
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out the user: ", error);
        }
    }

    return (
        <nav>
            <Modal
                opened={opened}
                onClose={() => { resetState(); close(); }}
                centered
                size="xl"
                withCloseButton={false}
                padding={0}
                radius="lg"
            >
                <div className="flex flex-col md:flex-row min-h-[450px]">
                    {/* Image */}
                    <div className="md:w-2/5 bg-gray-100">
                        <img
                            src={loginImage}
                            alt="Login"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Form */}
                    <div className="md:w-3/5 p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-2">
                            {isNewUser ? "Create Account" : "Welcome Back"}
                        </h2>

                        <p className="text-gray-500 mb-8">
                            {isNewUser
                                ? "Sign up to continue."
                                : "Login to your account."}
                        </p>

                        <form
                            className="flex flex-col gap-5"
                            onSubmit={isNewUser ? handleSignUp : handleLogin}
                        >
                            <Input
                                placeholder="Email address"
                                type="email"
                                value={email}
                                leftSection={<Mail size={18} />}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                disabled={
                                    isLoginLoading ||
                                    isSignupLoading ||
                                    isUserExistsLoading
                                }
                            />

                            <PasswordInput
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                disabled={
                                    isLoginLoading ||
                                    isSignupLoading ||
                                    isUserExistsLoading
                                }
                            />

                            {isNewUser && (
                                <PasswordInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.currentTarget.value)
                                    }
                                    disabled={isSignupLoading}
                                />
                            )}

                            <Button
                                type="submit"
                                color="dark"
                                size="md"
                                loading={
                                    isLoginLoading ||
                                    isSignupLoading ||
                                    isUserExistsLoading
                                }
                                fullWidth
                            >
                                {isNewUser ? "Create Account" : "Login"}
                            </Button>

                            <Button
                                variant="subtle"
                                color="gray"
                                type="button"
                                onClick={() => setisNewUser((prev) => !prev)}
                            >
                                {isNewUser
                                    ? "Already have an account? Login"
                                    : "New here? Create an account"}
                            </Button>

                            {isLoginError && (
                                <Alert
                                    color="red"
                                    icon={<ShieldAlert size={18} />}
                                >
                                    {loginError?.message}
                                </Alert>
                            )}

                            {isSignupError && (
                                <Alert
                                    color="red"
                                    icon={<ShieldAlert size={18} />}
                                >
                                    {SignUpError?.message}
                                </Alert>
                            )}

                            {isUserExistsError && (
                                <Alert
                                    color="red"
                                    icon={<ShieldAlert size={18} />}
                                >
                                    {userExistsError?.message}
                                </Alert>
                            )}
                        </form>
                    </div>
                </div>
            </Modal>

            <div className="flex items-center justify-between">
                <div className="flex">
                    <Button variant="subtle" color="gray">Book</Button>
                    <Button variant="subtle" color="gray">Manage</Button>
                    <Button variant="subtle" color="gray">Check-in</Button>
                </div>
                <div className="flex items-center justify-between">
                    {useBearStore.getState().isUserLoggedIn ? (
                        <Button variant="subtle" color="gray" onClick={open}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="subtle" color="gray" onClick={handleLogout}>
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}
