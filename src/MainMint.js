import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
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
                const response = await contract.mint(BigNumber.from(mintAmount));
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
        <div>
            <h1>Real Kitty NFT</h1>
            <p>Real kitty wants to be famous. Mint it!</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handeDecrement}>-</button>
                        <input type="number" value={mintAmount} readOnly />
                        <button onClick={handeIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}> Mint now </button>
                </div>
            ) : (
                <p>You have to connect metamask wallet to mint.</p>
            )}
        </div>
    );
};

export default MainMint;
