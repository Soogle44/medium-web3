import { useState } from "react";
import "./NewStory.css"
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";


const NewStory = () => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { saveFile } = useMoralisFile();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const mint = async (account, uri) => {
    let options = {
      contractAddress: "0xe2CEa352ecb96457cad960fa759E5E9f9FE34A46",
      functionName: "safeMint",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        to: account,
        uri: uri,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Successful Mint");
        setText("");
        setTitle("");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  }

  const uploadFile = async (event) => {
    event.preventDefault();
    const textArray = text.split();
    const metadata = {
      title,
      text: textArray,
    };

    try {
      const result = await saveFile(
        "myblog.json",
        { base64: btoa(JSON.stringify(metadata)) },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
      const nftResult = await uploadNftMetadata(result.ipfs());

      await mint(account, nftResult.ipfs());
    } catch (error) {
      alert(error.message);
    }
  }

  const uploadNftMetadata = async (url) => {
    const metadataNft = {
      image: "",
      description: title,
      externalUrl: url,
    };
    const resultNft = await saveFile(
      "metadata.json",
      { base64: btoa(JSON.stringify(metadataNft)) },
      {
        type: "base64",
        saveIPFS: true,
      }
    );
    return resultNft;
  };

  return (
    <>
      <div>
        <form onSubmit={uploadFile} className="writeForm">
          <div className="writeFormGroup">
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              autoFocus={true}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default NewStory;