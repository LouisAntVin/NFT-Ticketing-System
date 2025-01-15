const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  //6 events
  const occasions = [
    {
      name: "IPL",
      cost: tokens(3),
      tickets: 0,
      date: "May 31",
      time: "6:00PM EST",
      location: "Delhi"
    },
    {
      name: "CWG",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2",
      time: "1:00PM JST",
      location: "Hydrabad"
    },
    {
      name: "ISL",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "10:00AM TRT",
      location: "Mumbai"
    },
    {
      name: "WWE",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM CST",
      location: "NYC"
    },
    {
      name: "Olympics",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Paris, France"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});