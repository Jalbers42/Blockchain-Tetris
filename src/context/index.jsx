import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x45a04C2d1dbC3629B9C416548D3fD7f9be2D7a59');
  const { mutateAsync: createHighscore } = useContractWrite(contract, 'createHighscore');

  const address = useAddress();
  const connect = useMetamask();

  // const publishHighscore = async (form) => {
  //   try {
  //     const data = await createHighscore([
  //       address, // owner
  //       form.title, // title
  //       form.description, // description
  //       form.target,
  //       new Date(form.deadline).getTime(), // deadline,
  //       form.image
  //     ])

  //     console.log("contract call success", data)
  //   } catch (error) {
  //     console.log("contract call failure", error)
  //   }
  // }

  const publishHighscore = async (name, score) => {
    try
    {
        const data = await createHighscore({ args:[
            address,
            name,
            score
        ]})

        console.log("Contract call is successful", data)
    }
    catch(error)
    {
        console.log("Contract call has failed", error)
    }  
  };

  const collectPrize1 = async (amount) => {
    const data = await contract.call('collectPrize', address.toString(), { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getHighscores = async () => {
    const highscores = await contract.call('getHighscores');

    const parsedCampaings = highscores.map((highscore, i) => ({
      wallet: highscore.wallet,
      name: highscore.name,
      score: highscore.score.toString(),
    }));

    return parsedCampaings;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createHighscore: publishHighscore,
        getHighscores,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);