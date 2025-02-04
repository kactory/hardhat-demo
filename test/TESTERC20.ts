import {ethers} from 'hardhat'
import {formatUnits, parseUnits} from 'ethers'

const fromUnit = (amount: any, unit = 'ether' ) => formatUnits(amount.toString(), unit)
const toUnit = (amount: any, unit = 'ether') => parseUnits(amount.toString(), unit)

let tokenA

describe("ERC20 Test", async() => {
    let deployer, user1, user2
    let tokenFactory
  
    before(async() => {
      [deployer, user1, user2] = await ethers.getSigners()
      tokenFactory = await ethers.getContractFactory("KEYKAT")
    })
    
    it("Deploy Your Own Token\n", async() => {
        tokenA = await tokenFactory.deploy("KEYKAT", "KEY", 18);
    
        console.log("       Your Token")
        console.log("Name: ", await tokenA.name())
        console.log("Symbol: ", await tokenA.symbol())
        console.log("Decimal: ", await tokenA.decimals())
    })

    it("Mint & Burn Your Token\n", async() => {
        // 500개를 발행합니다.
        await tokenA.mint(deployer.address, toUnit(500));
        console.log("deployer tokenA Balance After Mint: ", fromUnit(await tokenA.balanceOf(deployer.address), await tokenA.decimals()))
      
        //발행한 500개 중 300개를 소각시켜봅시다.
        await tokenA.burn(toUnit(300));
      
        console.log("deployer tokenA Balance After Burn: ", fromUnit(await tokenA.balanceOf(deployer.address), await tokenA.decimals()))
      })

      it("Transfer Token", async() => {
        //Transfer1: deployer가 user1에게 토큰 200개를 전송합니다.
        await tokenA.transfer(user1.address, toUnit(200));
        console.log("deployer tokenA Balance After Transfer1: ", fromUnit(await tokenA.balanceOf(deployer.address), await tokenA.decimals()))
        console.log("user1 tokenA Balance After Transfer1: ", fromUnit(await tokenA.balanceOf(user1.address), await tokenA.decimals()))
        //Transfer2: user1이 user2에게 토큰 100개를 전송합니다.
        await tokenA.connect(user1).approve(deployer.address, toUnit(100));
        await tokenA.connect(user1).transfer(user2.address, toUnit(100));
        console.log("user1 tokenA Balance After Transfer2: ", fromUnit(await tokenA.balanceOf(user1.address), await tokenA.decimals()))
        console.log("user2 tokenA Balance After Transfer2: ", fromUnit(await tokenA.balanceOf(user2.address), await tokenA.decimals()))
      })
  })