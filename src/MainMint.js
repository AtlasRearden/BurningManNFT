import { useState } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { Box, Button, Flex, Input, Text} from '@chakra-ui/react';

import burningMan from './BurningMan.json';

const burningManAdd = "0xa65A3fF7801a412090D95F970f8366E3f24D8C1c";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {

            const provider = new Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                burningManAdd,
                burningMan.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('Response: ', response);
            } catch (err) {
                console.log("some error: ", err);
            }
        }
    }

    const handleDecrease = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrease = () => {
        if (mintAmount >= 5) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="cetner" height = "100vh" paddingBottom ="150px">
            <Box width="520px">
                <div>
                    <Text fontSize ="60px" textShadow ="0 5px #000000">
                        Burning Man
                    </Text>
                    <Text fontSize= "30px" letterSpacing ="-5.5%" fontFamily="Jersey 10" textShadow="0 2px #000000">
                        Humans are funny creatures, we value non tangible assets more now. If you can't beat them, join them.
                    </Text>
                    <Text fontSize= "30px" letterSpacing ="-5.5%" fontFamily="Jersey 10" textShadow="0 2px #000000">
                        Join the journy by minting the non tangible assets called NFT.
                    </Text>
                
                </div>

                {isConnected ? (
                    <div>
                        <Flex align = "center"justify ="center">
                            <Button 
                                backgroundColor ="#0585a8"
                                borderRadius ="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color ="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="10px"
                                marginTop="10px"
                                onClick={handleDecrease}>-</Button>
                            <Input 
                                readOnly
                                fontFamily="inherit"
                                width = "100px"
                                height= "100 px"
                                textAlign = "center"
                                paddingLeft ="10px"                            
                                marginTop="20px"
                                type="number"
                                value ={mintAmount}
                                fontSize="large"
                            />
                            <Button 
                                backgroundColor ="#0585a8"
                                borderRadius ="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color ="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="10px"
                                marginTop="10px"
                                onClick={handleIncrease}>+</Button>
                        </Flex>
                        <Button 
                    backgroundColor="#0585a8"
                    borderRadius="3px"
                    boxShadow="0px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    fontSize="30"
                    padding="10px"
                    margin="0 10px"
                    position="inherit"
                    onClick={handleMint}>Mint NFT</Button>
                    </div>
                ) : (
                    <Text fontSize= "30px" letterSpacing ="-5.5%" fontFamily="Jersey 10" textShadow="0 2px #000000" textColor="red">
                        Establish connection in order to mint!!
                    </Text>
                )}
            </Box>
        </Flex>
    );
};
export default MainMint;