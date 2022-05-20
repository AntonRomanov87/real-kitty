import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import realKittyNFT from './RealKittyNFT.json';

const realKittyNFTAddress = "0x?????????????????????????????????????????????????";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                realKittyNFTAddress,
                realKittyNFT.abi,
                signer
            );

            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.01 * mintAmount).toString())
                });
                console.log("Response to mint: ", response);
            } catch(err) {
                console.log("Error: ", err);
            }
        }
    }

    const handeDecrement = () => {
        if (mintAmount < 1) {
            return;
        }
        setMintAmount(mintAmount - 1);
    };

    const handeIncrement = () => {
        if (mintAmount >= 3) {
            return;
        }
        setMintAmount(mintAmount + 1);
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">RealKittyNFT</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >
                        Real kitty wants to be famous. Mint it!
                    </Text>
                </div>
                
                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="Spx"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="15px"
                                onClick={handeDecrement}>-</Button>
                            <Input 
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number" 
                                value={mintAmount}  />
                            <Button
                                 backgroundColor="#D6517D"
                                 borderRadius="Spx"
                                 boxShadow="0px 2px 2px 1px #0F0F0F"
                                 color="white"
                                 cursor="pointer"
                                 fontFamily="inherit"
                                 padding="15px"
                                 marginTop="15px" 
                                onClick={handeIncrement}>+</Button>
                        </Flex>
                        <Button 
                            backgroundColor="#D6517D"
                            borderRadius="Spx"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="15px" 
                            onClick={handleMint}> Mint now </Button>
                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#D6517D"
                        >
                        You have to connect metamask wallet to mint.
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;
