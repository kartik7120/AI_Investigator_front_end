import { Button, Modal, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Input } from "@mantine/core";
import { Mail } from "lucide-react";

export default function Navbar() {

    const [opened, { open, close }] = useDisclosure(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isNewUser, setisNewUser] = useState(false)

    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault();

        /**
         * First call the login endpoint with the email and password.
         * If the user does not exist, then update the state to show the signup form.
         * Then call the signup endpoint with the email and password.
         * Otherwise login the user using OTP and then close the OTP and update the state to store the logged user.
         */

        
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
                            />
                            <PasswordInput
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.currentTarget.value)}
                            />

                            <Button variant="filled" color="grey">Login</Button>

                        </div>
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
                                />
                                <PasswordInput
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.currentTarget.value)}
                                />
                                <PasswordInput
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                                />


                                <Button variant="filled" color="grey" fullWidth>
                                    Signup
                                </Button>
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
