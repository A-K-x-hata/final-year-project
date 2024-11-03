let web3;
let boxAccessContract;
let drugLifecycleContract;
// Add this at the beginning of your existing script tag
const drugLifecycleContractAddress = '0x09686838AAbb2cb4A07d3e765f51dC125361B1E6'; // Replace with your deployed contract address
const drugLifecycleContractABI =[
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "distributions",
    "outputs": [
      {
        "internalType": "string",
        "name": "distributionBatch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "distributorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dispatchDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dispatchTime",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantityDispatched",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "labTests",
    "outputs": [
      {
        "internalType": "string",
        "name": "labTestId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "labTestDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "labTestTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "labName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "lockedBoxes",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "logisticsProviders",
    "outputs": [
      {
        "internalType": "string",
        "name": "logisticsProvider",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pickupDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pickupTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "deliveryDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "deliveryTime",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "packagings",
    "outputs": [
      {
        "internalType": "string",
        "name": "packageBatch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "packageDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "packageTime",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantityPackaged",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "packagingFacility",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pharmacies",
    "outputs": [
      {
        "internalType": "string",
        "name": "pharmacyName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "drugName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "categoryName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "drugDescription",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "manufactureDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "expiryDate",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "qualityControls",
    "outputs": [
      {
        "internalType": "string",
        "name": "testId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "warehouses",
    "outputs": [
      {
        "internalType": "string",
        "name": "warehouseNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "arrivalDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "arrivalTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "warehouseName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "storageLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "storageConditions",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "testId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "name": "addQualityControl",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "packageBatch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "packageDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "packageTime",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantityPackaged",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "packagingFacility",
        "type": "string"
      }
    ],
    "name": "addPackaging",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "labTestId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "labTestDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "labTestTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "labName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "testerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "name": "addLabTesting",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "distributionBatch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "distributorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dispatchDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dispatchTime",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "quantityDispatched",
        "type": "uint256"
      }
    ],
    "name": "addDistribution",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "logisticsProvider",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pickupDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pickupTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "deliveryDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "deliveryTime",
        "type": "string"
      }
    ],
    "name": "addLogistics",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "warehouseNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "arrivalDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "arrivalTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "warehouseName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "storageLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "storageConditions",
        "type": "string"
      }
    ],
    "name": "addWarehouse",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "pharmacyName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "drugName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "categoryName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "drugDescription",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "manufactureDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "expiryDate",
        "type": "string"
      }
    ],
    "name": "addPharmacy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const boxAccessContractAddress = '0xCac59f3a1Fbc1dB1C9D9746509f84Ac9Ca920C56'; // Replace with your Box Access contract address
const boxAccessContractABI =[
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "boxAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "boxNumber",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isAuthorized",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
const urlParams = new URLSearchParams(window.location.search);
const blockNumber = urlParams.get('blockNumber');

if (blockNumber) {
  fetch(`http://localhost:3005/scan/block/${blockNumber}`)
    .then(response => response.json())
    .then(data => {
      const drugInfo = document.getElementById('drug-info');
      const drugDetails = data.drugDetails;
      if (drugDetails) {
        // Display drug details by accessing object properties directly
        drugInfo.innerHTML = `
                    <strong>Name: </strong> ${drugDetails.name}<br>
                    <strong>Category: </strong> ${drugDetails.category}<br>
                    <strong>Description: </strong> ${drugDetails.description}<br>
                    <strong>Manufacturer: </strong> ${drugDetails.manufacturer}<br>
                    <strong>Batch Number: </strong> ${drugDetails.batchNumber}<br>
                    <strong>Manufacture Date: </strong> ${drugDetails.manufacturingDate}<br>
                    <strong>Expiry Date: </strong> ${drugDetails.expiryDate}<br>
                    <strong>Quantity: </strong> ${drugDetails.quantity}<br>
                    <strong>Storage Condition: </strong> ${drugDetails.storageConditions}<br>
                `;
      } else {
        drugInfo.innerHTML = "No drug details found.";
      }
    })
    .catch(err => console.error('Error fetching drug data:', err));
}

async function initContracts() {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    boxAccessContract = new web3.eth.Contract(boxAccessContractABI, boxAccessContractAddress);
    drugLifecycleContract = new web3.eth.Contract(drugLifecycleContractABI, drugLifecycleContractAddress);
  } else {
    alert("Please install MetaMask!");
  }
}

window.onload = async () => {
  await initContracts(); // Call the initialization function
  await checkLockedBoxes(blockNumber);
};


async function checkLockedBoxes(blockNumber) {
  // Fetch the quality control data for the block number
  const qcData = await drugLifecycleContract.methods.qualityControls(blockNumber).call();
  const labTestData = await drugLifecycleContract.methods.labTests(blockNumber).call();

  // Determine if the results of the quality control or lab testing have failed
  const qcFailed = qcData.result.toLowerCase() === "failed";
  const labTestFailed = labTestData.result.toLowerCase() === "failed";

  // Check and lock boxes based on results
  for (let i = 1; i <= 7; i++) {
    // Get the locked status for the box
    const isLocked = await drugLifecycleContract.methods.lockedBoxes(i, blockNumber).call();

    // Lock the box visually if it's locked or if any test has failed
    if (isLocked || (qcFailed || labTestFailed)) {
      lockBox(i, blockNumber, qcFailed || labTestFailed); // Send true if any test failed
    }
  }
}


function getCurrentBlockNumber() {
  // Extract the current block number from the URL
  const urlParts = window.location.pathname.split('/');
  return parseInt(urlParts[urlParts.length - 1]); // Assuming the block number is the last part of the URL
}

async function submitForm(formNumber) {
  // Ensure drugLifecycleContract is defined
  if (!drugLifecycleContract) {
    alert("Drug Lifecycle contract is not initialized.");
    return;
  }

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const userAddress = accounts[0];
  
  try {
    switch (formNumber) {
      case 1:
        const testId = document.getElementById('testId').value;
        const testDate = document.getElementById('testDate').value;
        const testTime = document.getElementById('testTime').value;
        const testerName = document.getElementById('testerName').value;
        const initialTestResult = document.getElementById('initialTest').value;

        await drugLifecycleContract.methods.addQualityControl(blockNumber, testId, testDate, testTime, testerName, initialTestResult).send({ from: userAddress });
        if (initialTestResult.toLowerCase() === "failed") {
          for (let i = 1; i <= 7; i++) {
            lockBox(i, blockNumber,true);
          }
        } else {
          lockBox(formNumber, blockNumber);
        }
        closeModal(1);
        break;
      case 2:
        const packageBatch = document.getElementById('packageBatch').value;
        const packageDate = document.getElementById('packageDate').value;
        const packageTime = document.getElementById('packageTime').value;
        const quantityPackaged = document.getElementById('quantityPackaged').value;
        const packagingFacility = document.getElementById('packagingFacility').value;

        await drugLifecycleContract.methods.addPackaging(blockNumber, packageBatch, packageDate, packageTime, quantityPackaged, packagingFacility).send({ from: userAddress });
        lockBox(formNumber, blockNumber);
        closeModal(2);
        break;
      case 3:
        const labTestId = document.getElementById('labTestId').value;
        const labTestDate = document.getElementById('labTestDate').value;
        const labTestTime = document.getElementById('labTestTime').value;
        const labName = document.getElementById('labName').value;
        const labTesterName = document.getElementById('labTesterName').value;
        const labResults = document.getElementById('labResults').value;

        await drugLifecycleContract.methods.addLabTesting(blockNumber, labTestId, labTestDate, labTestTime, labName, labTesterName, labResults).send({ from: userAddress });
        if (labResults.toLowerCase() === "failed") {
          for (let i = 1; i <= 7; i++) {
            lockBox(i, blockNumber,true);
          }
        } else {
          lockBox(formNumber, blockNumber);
        }
        closeModal(3);
        break;
      case 4:
        const distributionBatch = document.getElementById('distributionBatch').value;
        const distributorName = document.getElementById('distributorName').value;
        const dispatchDate = document.getElementById('dispatchDate').value;
        const dispatchTime = document.getElementById('dispatchTime').value;
        const quantityDispatched = document.getElementById('quantityDispatched').value;

        await drugLifecycleContract.methods.addDistribution(blockNumber, distributionBatch, distributorName, dispatchDate, dispatchTime, quantityDispatched).send({ from: userAddress });
       
        lockBox(formNumber, blockNumber);
        closeModal(4);
        break;
      case 5:
        const logisticsProvider = document.getElementById('logisticsProvider').value;
        const pickupDate = document.getElementById('pickupDate').value;
        const pickupTime = document.getElementById('pickupTime').value;
        const deliveryDate = document.getElementById('deliveryDate').value;
        const deliveryTime = document.getElementById('deliveryTime').value;

        await drugLifecycleContract.methods.addLogistics(blockNumber, logisticsProvider, pickupDate, pickupTime, deliveryDate, deliveryTime).send({ from: userAddress });
        
        lockBox(formNumber, blockNumber);
        closeModal(5);
        break;
      case 6:
        const warehouseNumber = document.getElementById('warehouseNumber').value;
        const arrivalDate = document.getElementById('arrivalDate').value;
        const arrivalTime = document.getElementById('arrivalTime').value;
        const warehouseName = document.getElementById('warehouseName').value;
        const storageLocation = document.getElementById('storageLocation').value;
        const storageConditions = document.getElementById('storageConditions').value;

        await drugLifecycleContract.methods.addWarehouse(blockNumber, warehouseNumber, arrivalDate, arrivalTime, warehouseName, storageLocation, storageConditions).send({ from: userAddress });
        
        lockBox(formNumber, blockNumber);
        closeModal(6);
        break;
      case 7:
        const pharmacyName = document.getElementById('pharmacyName').value;
        const drugName = document.getElementById('drugName').value;
        const categoryName = document.getElementById('categoryName').value;
        const drugDescription = document.getElementById('drugDescription').value;
        const manufactureDate = document.getElementById('manufactureDate').value;
        const expiryDate = document.getElementById('expiryDate').value;

        await drugLifecycleContract.methods.addPharmacy(blockNumber, pharmacyName, drugName, categoryName, drugDescription, manufactureDate, expiryDate).send({ from: userAddress });
       
        lockBox(formNumber, blockNumber);
        closeModal(7);
        break;
      default:
        alert("Invalid form number!");
        break;
    }
    alert("Data submitted to the blockchain successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("There was an error submitting the form.");
  }
}

function lockBox(boxNumber, blockNumber,result=false) {
  const box = document.getElementById(`box${boxNumber}`);
  const errorMessageDiv = document.getElementById('error-message');
  const icon = errorMessageDiv.querySelector('i');
  if (box) {
    box.classList.add('locked'); 
    box.querySelector('.lock-icon').style.display = 'inline';
    box.onclick = null; 
    if(result){
      errorMessageDiv.style.display = 'flex'; // Show the message box
      errorMessageDiv.querySelector('.error-text').innerText = "Tests have failed.All boxes have been locked.";
    }
  }
}

async function checkAccess(boxNumber) {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const userAddress = accounts[0];

  // Call the box access contract to check if the address is authorized
  const isAuthorized = await boxAccessContract.methods.isAuthorized(boxNumber, userAddress).call();

  if (isAuthorized) {
    // Open the corresponding modal
    openModal(boxNumber);
  } else {
    alert("You are not authorized to access this page.");
  }
}

function openModal(boxNumber) {
  const modal = document.getElementById(`modal${boxNumber}`);
  modal.style.display = "block";
}

function closeModal(boxNumber) {
  const modal = document.getElementById(`modal${boxNumber}`);
  modal.style.display = "none";
}

// Add click events for boxes
document.getElementById('box1').onclick = () => checkAccess(1);
document.getElementById('box2').onclick = () => checkAccess(2);
document.getElementById('box3').onclick = () => checkAccess(3);
document.getElementById('box4').onclick = () => checkAccess(4);
document.getElementById('box5').onclick = () => checkAccess(5);
document.getElementById('box6').onclick = () => checkAccess(6);
document.getElementById('box7').onclick = () => checkAccess(7);