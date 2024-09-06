import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import { Dialog, DialogTitle, DialogActions, Typography, Alert, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPastDate, MIN_DATE, Web3StatementBuilder } from '@concordium/web-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    BrowserWalletConnector,
    WalletConnectConnector,
    WalletConnection,
    WalletConnectionDelegate,
} from '@concordium/wallet-connectors';







// Define a list of causes
const causes = [
    { id: 1, name: 'Clean Water Access', description: 'Providing access to clean and safe drinking water for communities in need.' },
    { id: 2, name: 'Education for All', description: 'Supporting education initiatives to ensure every child has access to quality education.' },
    { id: 3, name: 'Climate Change Action', description: 'Promoting sustainable practices and policies to combat climate change and protect the environment.' },
    { id: 4, name: 'Healthcare Access', description: 'Improving access to healthcare services and medical treatments in underserved areas.' },
    { id: 5, name: 'Animal Welfare', description: 'Advocating for the humane treatment of animals and supporting animal rescue organizations.' },
    { id: 6, name: 'Disaster Relief', description: 'Providing aid and support to communities affected by natural disasters and emergencies.' },
];


export default function CharityDAO() {
    const [isVerified, setVerified] = useState(false);
    const [isFailed, setFailed] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedCause, setSelectedCause] = useState<number | null>(null);
    const [donationAmount, setDonationAmount] = useState<number>(0);
    const [ageVerified, setAgeVerified] = useState(false);
    const [regionVerified, setRegionVerified] = useState(false);
    const router = useRouter();
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [connected, setConnected] = useState<boolean>(false);

    // Define the delegate


   

    const handleClose = () => setOpen(false);

    useEffect(() => {
        document.body.style.backgroundColor = isVerified ? 'white' : '#000';
    }, [isVerified]);

    async function verifyUser() {
        const provider = await detectConcordiumProvider();
        try {
            await provider.requestAccounts();
            const statementBuilder = new Web3StatementBuilder().addForIdentityCredentials([0, 1, 2, 3, 4, 5], (b) =>
                b.addRange('dob', MIN_DATE, getPastDate(18, 1))
            );
            const statement = statementBuilder.getStatements();
            const challenge = 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';

            provider.requestVerifiablePresentation(challenge, statement)
                .then(() => {
                    setVerified(true);
                    setFailed(false);
                    setAgeVerified(true); // Assuming age verification is successful
                })
                .catch(() => {
                    setFailed(true);
                    setOpen(true);
                });
        } catch (error) {
            console.error(error);
            alert('Please connect');
        }
    }

    async function checkRegionalEligibility() {
        // Implement actual regional verification logic here
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // Assuming region verification is successful
            }, 1000);
     
     
        });
    }

    const handleVote = async (causeId: number) => {
        try {
            if (!ageVerified ) {
                alert('You must pass age and regional verification to vote.');
                return;
            }

            setSelectedCause(causeId);
            const eligible = await checkRegionalEligibility();
            if (eligible) {
                setRegionVerified(true);
                setDonationAmount(0);
            } else {
                alert('Regional verification failed.');
            }
        } catch (error) {
            console.error('Error casting vote:', error);
        }
    };

    const handleDonation = async () => {
        if (!selectedCause) {
            alert('Please select a cause to donate to.');
            return;
        }

        try {
            // Mock donation function
            console.log(`Donating ${donationAmount} to cause ${selectedCause}`);
            // Implement actual donation logic here

            // After successful donation, you might want to show a confirmation
            alert('Donation successful!');
        } catch (error) {
            console.error('Error making donation:', error);
        }
    };

    const handleGoHome = () => {
        // Clear the state
        setSelectedCause(null);
        setDonationAmount(0);
        setVerified(false);
        setAgeVerified(false);
        setRegionVerified(false);

        // Navigate to home page
        router.push('/');
    };

    return (
        <div className={`flex flex-col min-h-screen justify-center items-center ${isVerified ? 'bg-white' : 'bg-black text-white'}`}>
            <Image className="mb-4" src='/logo.png' width={100} height={100} alt="DAO" />
            <h1 className={`text-4xl font-bold mb-6 ${isVerified ? 'text-gray-800' : 'text-white'}`}>Welcome to Charity DAO</h1>
            <div className="flex flex-col items-center space-y-4">
                {!isVerified ? (
                    <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
                        <h4 className="text-xl font-semibold mb-4">Click to verify your age</h4>
                        <button onClick={verifyUser} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                            VERIFY
                        </button>
                    </div>
                ) : selectedCause === null ? (
                    <div className="text-center p-8 bg-gray-100 rounded-lg shadow-lg w-full max-w-[800px] ">
                        <h2 className="text-2xl font-semibold mb-4">Select a Cause to Fund</h2>
                        <div className="flex  flex-wrap items-center justify-center space-y-4 gap-[12px]">
                            {causes.map(cause => (
                                <div key={cause.id} className="p-4 bg-white rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-2">{cause.name}</h3>
                                    <p className="text-gray-700 mb-4">{cause.description}</p>
                                    <button onClick={() => handleVote(cause.id)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                                        Vote for {cause.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Donate to Selected Cause</h2>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{causes.find(cause => cause.id === selectedCause)?.name}</h3>
                            <p className="text-gray-700 mb-4">{causes.find(cause => cause.id === selectedCause)?.description}</p>
                            <TextField
                                type="number"
                                label="Donation Amount"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(Number(e.target.value))}
                                className="mb-4"
                                variant="outlined"
                            />
                            <button onClick={handleDonation} className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300">
                                Donate
                            </button>
                        </div>
                    </div>
                )}
                {isFailed && (
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle className="text-red-500">Verification Failed</DialogTitle>
                        <Alert severity="warning" className="ml-6 mr-6">
                            Verification is not complete. You are not allowed to access DAO functionalities!
                        </Alert>
                        <DialogActions>
                            <Button onClick={handleClose} className="bg-gray-500 text-white hover:bg-gray-600">Close</Button>
                        </DialogActions>
                    </Dialog>
                )}
                <Button onClick={handleGoHome} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
                    Go Home
                </Button>
            </div>
        </div>
    );
}
