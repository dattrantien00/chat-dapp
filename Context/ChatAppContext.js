import React, { useState, useEffect } from 'react';

import { useRouter } from "next/router";

import { CheckIfWalletConnected, connectingWithContract, connectWallet } from '@/Utils/apiFeature';

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {

    const title = "Hey welcome to Blockchain Chat App";
    const [account, setAccount] = useState('');
    const [username, setUsername] = useState('');
    const [friendLists, setfriendLists] = useState([]);
    const [friendMsg, setfriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    const fetchData = async () => {
        try {
            const contract = await connectingWithContract();

            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            const userName = await contract.getUsername(connectAccount);
            setUsername(userName);
            
            const friendList = await contract.getMyFriendList();
            setfriendLists(friendList);

            const userList = await contract.getAllAppUser();
            setUserLists(userList);
        } catch (error) {
            setError("Please Install And Connect Your Wallet");
        }
    }

    useEffect(() => {
        fetchData();
        
    }, []);

    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setfriendMsg(read);
        } catch (error) {
            setError("Currently You have no msg")
        }
    }

    const createAccount = async ({ name, accountAddress }) => {
        try {
            // if (name || accountAddress) return setError("name and accountAddress cannot be empty")
            console.log("Creating account with name:", name);
            const contract = await connectingWithContract();
            const getCreatedAccount = await contract.createAccount(name);
            
            setLoading(true);
            await getCreatedAccount.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating account pls reload")
        }
    }

    const addFriends = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress) return setError("pls provide name, account address")
            const contract = await connectingWithContract();
            const addFriend = await contract.addFriend(accountAddress, name);
            await addFriend.wait();
            setLoading(false);
            router.push("/")
            window.location.reload();
        } catch (error) {
            setError("Error while adding friends");
        }
    }

    const sendMessage = async ({ msg, address }) => {
        try {
            if (msg || address) return setError("please type your message");
            const contract = await connectingWithContract();
            const sendMsg = await contract.sendMessage(address, msg);
            await sendMsg.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while send msg")
        }

    }


    const readUser = async ({ userAddress }) => {
        const contract = await connectingWithContract();
        const user = await contract.getUsername(userAddress);
        setCurrentUserAddress(userAddress);
        setCurrentUserName(userAddress);
    }
    return (
        <ChatAppContext.Provider value={{
            readMessage, createAccount, addFriends, sendMessage, readUser,
            account, username, friendLists, friendMsg, loading, userLists, error,
            currentUserAddress, currentUserName, connectWallet, CheckIfWalletConnected
        }}>
            {children}
        </ChatAppContext.Provider>
    )
}