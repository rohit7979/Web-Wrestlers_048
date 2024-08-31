import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard() {
    const [amount, setAmount] = useState("");
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const project = JSON.parse(localStorage.getItem('selectedProject'));
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        // Fetch donation information from your backend
        const fetchDonationInfo = async () => {
            try {
                const res = await fetch('http://localhost:9090/api/donations/'); // Direct path
                if (!res.ok) throw new Error('Network response was not ok.');
                const data = await res.json();
                if (data.length > 0) {
                    // Assuming you are interested in the first donation
                    const donation = data[0];
                    setDonationInfo({
                        totalAmount: donation.total_amount_gathered,
                        goalAmount: donation.goal_amount,
                        currentAmount: donation.current_amount,
                        donors: donation.current_donators,
                        numberOfDonors: donation.current_donators.length
                    });
                    console.log('Updated Donation Info:', {
                        totalAmount: donation.total_amount_gathered,
                        goalAmount: donation.goal_amount,
                        currentAmount: donation.current_amount,
                        donors: donation.current_donators,
                        numberOfDonors: donation.current_donators.length
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDonationInfo();
    }, []);

    const handlePayment = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/payment/order', { // Direct path
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({ amount, _id:project._id })
            });
            console.log(res);
            if (!res.ok) throw new Error('Network response was not ok.');
            const data = await res.json();
            handlePaymentVerify(data.data);
            onClose();
            
        } catch (error) {
            console.log(error);
        }
    }

    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Devknus",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const res = await fetch('http://localhost:9090/api/payment/verify', { // Direct path
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                             "Authorization": `Bearer ${accessToken}`
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            _id:project._id,
                            amount: amount // Pass the donation amount
                        })
                    });

                    if (!res.ok) throw new Error('Network response was not ok.');
                    const verifyData = await res.json();
                    if (verifyData.message) {
                        toast.success(verifyData.message);
                        navigate("/home");
                        // Refresh donation info
                        const updatedRes = await fetch('http://localhost:9090/api/donations/'); // Direct path
                        if (!updatedRes.ok) throw new Error('Network response was not ok.');
                        const updatedData = await updatedRes.json();
                        if (updatedData.length > 0) {
                            const donation = updatedData[0];
                            setDonationInfo({
                                totalAmount: donation.total_amount_gathered,
                                goalAmount: donation.goal_amount,
                                currentAmount: donation.current_amount,
                                donors: donation.current_donators,
                                numberOfDonors: donation.current_donators.length
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (

        <>
            <Button style={{ backgroundColor: "#ff8c00", color: "white" }} onClick={onOpen}>Donate Now</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter the amount</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            <div>
                                <Input placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} />
                            </div>
                           
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button style={{ backgroundColor: "#ff8c00", color: "white" }}  onClick={handlePayment} >Donate Now</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



        </>
    );
}
