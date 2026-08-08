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
            <>
                <Modal
                    opened={opened}
                    onClose={() => {
                        resetState();
                        close();
                    }}
                    centered
                    size="xl"
                    withCloseButton={false}
                    padding={0}
                    radius="xl"
                    overlayProps={{
                        blur: 6,
                        opacity: 0.45,
                    }}
                >
                    <div className="flex min-h-[500px] flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 md:flex-row">

                        {/* Left Image */}
                        <div className="relative md:w-2/5">
                            <img
                                src={loginImage}
                                alt="Login"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            <div className="absolute bottom-8 left-8 text-white">
                                <h2 className="text-3xl font-bold">
                                    Fly Smarter
                                </h2>

                                <p className="mt-2 text-sm text-white/80">
                                    Book, manage and investigate your trips.
                                </p>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="flex flex-1 flex-col justify-center p-10">

                            <h2 className="text-3xl font-bold">
                                {isNewUser ? "Create Account" : "Welcome Back"}
                            </h2>

                            <p className="mt-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
                                {isNewUser
                                    ? "Create your account to continue."
                                    : "Sign in to continue your journey."}
                            </p>

                            <form
                                className="space-y-5"
                                onSubmit={isNewUser ? handleSignUp : handleLogin}
                            >
                                <Input
                                    placeholder="Email Address"
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
                                    fullWidth
                                    size="md"
                                    radius="xl"
                                    variant="filled"
                                    color="dark"
                                    loading={
                                        isLoginLoading ||
                                        isSignupLoading ||
                                        isUserExistsLoading
                                    }
                                >
                                    {isNewUser ? "Create Account" : "Login"}
                                </Button>

                                <Button
                                    fullWidth
                                    radius="xl"
                                    variant="light"
                                    color="gray"
                                    type="button"
                                    onClick={() => setisNewUser((prev) => !prev)}
                                >
                                    {isNewUser
                                        ? "Already have an account?"
                                        : "Create a new account"}
                                </Button>

                                {isLoginError && (
                                    <Alert
                                        color="red"
                                        radius="md"
                                        icon={<ShieldAlert size={18} />}
                                    >
                                        {loginError?.message}
                                    </Alert>
                                )}

                                {isSignupError && (
                                    <Alert
                                        color="red"
                                        radius="md"
                                        icon={<ShieldAlert size={18} />}
                                    >
                                        {SignUpError?.message}
                                    </Alert>
                                )}

                                {isUserExistsError && (
                                    <Alert
                                        color="red"
                                        radius="md"
                                        icon={<ShieldAlert size={18} />}
                                    >
                                        {userExistsError?.message}
                                    </Alert>
                                )}
                            </form>
                        </div>
                    </div>
                </Modal>

                <nav className="px-6 py-5">
                    <div
                        className="
                    mx-auto
                    flex
                    max-w-7xl
                    items-center
                    justify-between
                    rounded-3xl
                    border
                    border-slate-200/60
                    bg-white/80
                    px-8
                    py-4
                    shadow-xl
                    backdrop-blur-xl
                    dark:border-slate-700/60
                    dark:bg-slate-900/70
                "
                    >
                        {/* Logo */}
                        <div className="flex items-center gap-12">
                            <h1 className="text-2xl font-bold tracking-wide">
                                FlightAI
                            </h1>

                            <div className="flex items-center gap-2">
                                <Button radius="xl" variant="light" color="blue" styles={{
                                    root: {
                                        background: "#0E636B",
                                        border: "1px solid #0E636B",
                                        color: "#fff",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        letterSpacing: "0.4px",
                                        textTransform: "uppercase",
                                        transition: "all .2s",

                                        "&:hover": {
                                            background: "#14808A",
                                            borderColor: "#14808A",
                                        },
                                    },
                                }}
                                >
                                    Book
                                </Button>

                                <Button radius="xl" variant="subtle" color="gray" styles={{
                                    root: {
                                        background: "#0E636B",
                                        border: "1px solid #0E636B",
                                        color: "#fff",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        letterSpacing: "0.4px",
                                        textTransform: "uppercase",
                                        transition: "all .2s",

                                        "&:hover": {
                                            background: "#14808A",
                                            borderColor: "#14808A",
                                        },
                                    },
                                }}
                                >
                                    Manage
                                </Button>

                                <Button radius="xl" variant="subtle" color="gray" styles={{
                                    root: {
                                        background: "#0E636B",
                                        border: "1px solid #0E636B",
                                        color: "#fff",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        letterSpacing: "0.4px",
                                        textTransform: "uppercase",
                                        transition: "all .2s",

                                        "&:hover": {
                                            background: "#14808A",
                                            borderColor: "#14808A",
                                        },
                                    },
                                }}
                                >
                                    Check-in
                                </Button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {useBearStore.getState().isUserLoggedIn ? (
                                <Button
                                    radius="xl"
                                    variant="light"
                                    color="red"
                                    onClick={handleLogout}
                                    styles={{
                                        root: {
                                            background: "#0E636B",
                                            border: "1px solid #0E636B",
                                            color: "#fff",
                                            fontSize: 15,
                                            fontWeight: 600,
                                            letterSpacing: "0.4px",
                                            textTransform: "uppercase",
                                            transition: "all .2s",

                                            "&:hover": {
                                                background: "#14808A",
                                                borderColor: "#14808A",
                                            },
                                        },
                                    }}

                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    radius="xl"
                                    color="dark"
                                    onClick={open}
                                    styles={{
                                        root: {
                                            background: "#0E636B",
                                            border: "1px solid #0E636B",
                                            color: "#fff",
                                            fontSize: 15,
                                            fontWeight: 600,
                                            letterSpacing: "0.4px",
                                            textTransform: "uppercase",
                                            transition: "all .2s",

                                            "&:hover": {
                                                background: "#14808A",
                                                borderColor: "#14808A",
                                            },
                                        },
                                    }}

                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </nav>
            </>

        </nav>
    );
}
