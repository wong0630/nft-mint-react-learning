import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi'

import livPunkNFTContract from './contracts/LivPunkNFTContract.json'

const MainMint = ({ isConnected }) => {

    window.Buffer = window.Buffer || require("buffer").Buffer;    
    
    const [mintQty, setMintQty] = useState(1);

    const decreaseMintQty = () => {
        if (mintQty <= 1) return;
        setMintQty(mintQty - 1);
    }

    const increaseMintQty = () => {
        if (mintQty >= 3) return;
        setMintQty(mintQty + 1);
    }

    /*
    const { data } = useContractRead({
        address: livPunkNFTContract.address,
        abi: livPunkNFTContract.abi,
        functionName: 'maxSupply',
    })
    */

    const { config } = usePrepareContractWrite({
        address: livPunkNFTContract.address,
        abi: livPunkNFTContract.abi,
        functionName: 'mint',
        args: [mintQty],
        overrides: { value: ethers.utils.parseEther((0.02 * mintQty).toString()) }
    })

    const { write } = useContractWrite(config)

    return (
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
            <Box width='520px'>
                <div>
                    <Text fontSize='48px' textShadow='0 5px #000000'>LivPunkNFT</Text>
                    <Text
                        fontSize='30px'
                        letterSpacing='-5.5%'
                        fontFamily='VT323'
                        textShadow='0 2px 2px #000000'
                    >
                            It's 2078. Can the LivPunkNFT save humans from destructive rampant NFT speculation? Mint LivPunkNFT to find out.
                    </Text>
                </div>

                {isConnected ? (
                    <div>

                        <Flex align='center' justify='center'>
                            <Button 
                                backgroundColor='#D6517D'
                                borderRadius='5px'
                                boxShadow='0px 2px 2px 1px #0F0F0F'
                                color='white'
                                cursor='pointer'
                                fontFamily='inherit'
                                padding='15px'
                                marginTop='10px'
                                onClick={decreaseMintQty}
                            >
                                -
                            </Button>

                            <Input 
                                readOnly
                                fontFamily='inherit'
                                width='100px'
                                height='40px'
                                textAlign='center'
                                paddingLeft='19px'
                                marginTop='10px'
                                type='number' 
                                value={mintQty} 
                            />

                            <Button 
                                backgroundColor='#D6517D'
                                borderRadius='5px'
                                boxShadow='0px 2px 2px 1px #0F0F0F'
                                color='white'
                                cursor='pointer'
                                fontFamily='inherit'
                                padding='15px'
                                marginTop='10px'
                                onClick={increaseMintQty}
                            >
                                +
                            </Button>
                        </Flex>

                        <Button 
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0px 2px 2px 1px #0F0F0F'
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='15px'
                            marginTop='10px'
                            onClick={() => write?.()}
                        >
                            Mint Now
                        </Button>
                    </div>
                ) : (
                    <Text
                        marginTop='70px'
                        fontSize='30px'
                        letterSpacing='-5.5%'
                        fontFamily='VT323'
                        textShadow='0 3px #000000'
                        color='#D6517D'
                    >
                        You must be connected to mint.
                    </Text>
                )}
            </Box>
        </Flex>
    )
}

export default MainMint;