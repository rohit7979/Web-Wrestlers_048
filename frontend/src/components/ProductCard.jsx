import { 
  Button, 
  Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure, 
  Text, 
  Box, 
  Flex 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductCard() {
  const [amount, setAmount] = useState("");
  const [donationInfo, setDonationInfo] = useState({});
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const project = JSON.parse(localStorage.getItem('selectedProject'));
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchDonationInfo = async () => {
      try {
        const res = await fetch('https://backend-render-7zzl.onrender.com/api/donations/');
        if (!res.ok) throw new Error('Network response was not ok.');
        const data = await res.json();
        if (data.length > 0) {
          const donation = data[0];
          setDonationInfo({
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
      const res = await fetch('https://backend-render-7zzl.onrender.com/api/payment/order', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ amount, _id: project._id })
      });
      if (!res.ok) throw new Error('Network response was not ok.');
      const data = await res.json();
      handlePaymentVerify(data.data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

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
          const res = await fetch('https://backend-render-7zzl.onrender.com/api/payment/verify', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id: project._id,
              amount: amount
            })
          });

          if (!res.ok) throw new Error('Network response was not ok.');
          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
            navigate("/home");
            const updatedRes = await fetch('https://backend-render-7zzl.onrender.com/api/donations/');
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
  };

  return (
    <>
      <Button 
        style={{ backgroundColor: "#ff8c00", color: "white" }} 
        onClick={onOpen} 
        _hover={{ bg: "#e07b00" }}
      >
        Donate Now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="lg" p={4}>
          <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
            Support Our Cause
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="medium">
                Enter the amount you'd like to donate:
              </Text>
              <Input 
                placeholder="Enter amount (₹)" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                mt={2}
                borderColor="gray.300"
                _focus={{ borderColor: "#ff8c00" }}
              />
            </Box>
            <Flex direction="column" alignItems="center">
              <Text fontSize="md" fontWeight="medium">
                Current Fundraiser Status
              </Text>
              <Box mt={2}>
                <Text>Total Raised: ₹{donationInfo.currentAmount} / ₹{donationInfo.goalAmount}</Text>
                <Text>Donors: {donationInfo.numberOfDonors}</Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button 
              style={{ backgroundColor: "#ff8c00", color: "white" }} 
              onClick={handlePayment}
              _hover={{ bg: "#e07b00" }}
            >
              Donate Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
