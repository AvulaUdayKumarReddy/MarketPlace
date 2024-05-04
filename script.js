

const web3 = new Web3(window.ethereum);
var accounts;
const getWeb3 = async() =>{
        const web3= new Web3(window.ethereum)
        
	if(web3) {
        try{
            accounts =  await window.ethereum.request({method:"eth_requestAccounts"});
	    console.log("Acquired addr : ", accounts[0]);
        localStorage.setItem('addr', accounts[0]);
           window.location.href = "home.html";
            //const hiddenSection = document.getElementById("isD");
            //if (hiddenSection.style.display === "none") {
            // Display the section
            //hiddenSection.style.display = "block";
            //}

           // resolve(web3)
        }
        catch(error){
		console.error(error);
            //reject(error)
        }
}
}

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("connect-wallet1").addEventListener("click",async()=>{
        const web3 =await getWeb3()
    })
})

const contractAddress = '0x97FaaC1C1cF3F7b0689B941a3c5F6bEb193fb15C';
const contractABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "Itemized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "Sale",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int256",
						"name": "IID",
						"type": "int256"
					},
					{
						"internalType": "enum market.ItemStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct market.Item[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "getItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int256",
						"name": "IID",
						"type": "int256"
					},
					{
						"internalType": "enum market.ItemStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct market.Item",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listItems",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contract = new web3.eth.Contract(contractABI, contractAddress);

const popupForm = document.getElementById("popupForm");
const popupButton = document.getElementById("popupButton");

// When the user clicks the button, open the popup form
function openForm() {
  popupForm.style.display = "block";
}

// When the user clicks on <span> (x), close the popup form
function closeForm() {
  popupForm.style.display = "none";
}
async function listItem() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    //const price = web3.utils.toWei(document.getElementById('price'), 'ether');
	const wei = document.getElementById('price').value
	const price = web3.utils.toWei(wei, 'ether');

    try {
        // Call contract method to list item
		const addr = localStorage.getItem('addr');  
		/*const result = web3.eth.getAccounts() ;
		result.then(addresses => {
			// Retrieve the address from the Array
			const address = addresses[0];
			console.log('Address:', address);
		});

		const addresses = await result;
		
		console.log(addresses); */
		
await contract.methods.listItems(title, description, price).send({ from:addr });
	
        console.log('Item listed successfully');
        // Add logic to update UI or show success message
    } catch (error) {
        console.error('Error listing item:', error);
        // Add logic to show error message
    }
}

/*async function displayItems() {
    const items = await contract.methods.getAllItems().call()
    const itemList = document.getElementById("itemList");
   itemList.innerHTML = ''; // Clear previous items
   


    items.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.title} - ${item.description} - ${item.price}`;
        itemList.appendChild(listItem);
    });


	
}*/

async function displayItems() {
    const items = await contract.methods.getAllItems().call();
	console.log(items)
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ''; // Clear previous items

    items.forEach(item => {
        // Create a container for each item
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        // Create elements to display item details
        const titleElement = document.createElement("h2");
        titleElement.textContent = item.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = item.description;

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: ${web3.utils.fromWei(item.price, "ether")} ETH`;

        // Create a buy button for each item
        const buyButton = document.createElement("button");
        buyButton.textContent = "Buy";
        buyButton.classList.add("buy-button");
		const addr = localStorage.getItem('addr');  
        buyButton.addEventListener("click", async () => {
         try {
			 /*  	const result = web3.eth.getAccounts() ;
		result.then(addresses => {
			// Retrieve the address from the Array
			const address = addresses[0];
			console.log('Address:', address);
		});

		const addresses = await result;
		
		console.log(addresses); */
                await contract.methods.buy(item.IID).send({ from: addr, value: item.price });
                console.log(`Item '${item.title}' purchased successfully`);
                // You can add code to update UI or show a success message here
            } catch (error) {
                console.error(`Error purchasing item '${item.title}':`, error);
                // You can add code to handle errors or show an error message here
            }
        });

        // Append elements to the item container
        itemContainer.appendChild(titleElement);
        itemContainer.appendChild(descriptionElement);
        itemContainer.appendChild(priceElement);
        itemContainer.appendChild(buyButton);

        // Append item container to the item list
        itemList.appendChild(itemContainer);
    });
}


