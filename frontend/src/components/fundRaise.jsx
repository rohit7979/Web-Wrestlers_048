import { Button, FormControl, FormLabel, Image, Input, Text, useToast, VStack } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
export function FundRaise() {
    const toast = useToast();
    const [input, setInput] = useState({current_amount:0, media_images: [], goal_amount: "", donation_active_status: true, donation_title: "", donation_discription: "", student_age: "", donation_deadline: "", time_of_creation: new Date() })
    const [lastPage, setLastPage] = useState(false);
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    const config = { headers: { Authorization: `Bearer ${accessToken}` } }
    async function postProject(e) {
        e.preventDefault();
        console.log(input);
        const request = await axios.post("http://localhost:9090/project/update", input, config)
            .then((res) => {
                toast({
                    title: `Submit ${res.data.status}`,
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .catch(err => {
                toast({
                    title: `Internal Error Occurred`,
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                })
                console.log(err);
            })
        setTimeout(() => {
            navigate("/home")
        }, 2000)

    }

    return (
        <div style={{ minHeight: "500px", minWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "80%", margin: "50px" }} >
                <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Setup fundraiser</h2>
                <form style={{ width: "100%" }} onSubmit={postProject} >
                    <VStack spacing={4} style={{ width: "100%" }}>
                        {!lastPage && <div style={{ width: "60%", minWidth: "300px" }}><FormControl id="goal_amount" isRequired>
                            <FormLabel>Estimated Cost</FormLabel>
                            <Input
                                type="number"
                                placeholder="Estimated Cost"
                                name="goal_amount"
                                value={input.goal_amount}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                required
                            />
                        </FormControl>
                            <FormControl id="age" mt="4" isRequired>
                                <FormLabel>Age</FormLabel>
                                <Input
                                    name="student_age"
                                    type="number"
                                    placeholder="Age"
                                    value={input.student_age}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    required
                                />
                            </FormControl> </div>}
                        {/* <FormControl id="age" mt="4" >
                <FormLabel>Upload Your Image</FormLabel>
                <Input
                 name="media_images"
                  type="image"
                  placeholder="Upload Image"
                  value={input.media_images}
                  onChange={(e) => setInput({...input,[e.target.name]:e.target.value})}
                  required
                />
              </FormControl> */}
                        {lastPage && <div style={{ width: "100%" }}>
                            <FormControl id="donation_title" isRequired>
                                <Input
                                    type="text"
                                    placeholder="Name your fundraiser"
                                    name="donation_title"
                                    value={input.donation_title}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    required
                                />
                            </FormControl>
                            <FormControl id="donation_discription" mt="4" isRequired>
                                <textarea
                                    style={{ padding: "15px", width: "100%", minHeight: "500px", minWidth: "320px", border: "1px solid lightgrey" }}
                                    name="donation_discription"
                                    type="text"
                                    placeholder="Write your story. Keep it simple, personal, and about the specific use of funds"
                                    value={input.donation_discription}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    required
                                />
                            </FormControl>
                            <FormControl id="donation_deadline" mt="4" isRequired>
                                <FormLabel>When do you need funds ?</FormLabel>
                                <Input
                                    name="donation_deadline"
                                    type="date"
                                    value={input.donation_deadline}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    required
                                />
                            </FormControl>

                        </div>}
                        {!lastPage && <Button backgroundColor="#f68631" color="white" onClick={() => {

                            setLastPage(true)
                        }} >Next</Button>}
                        {lastPage && <Button backgroundColor="#f68631" color="white" type="submit" >Submit</Button>}
                    </VStack>
                </form>
            </div>
        </div>
    )
}