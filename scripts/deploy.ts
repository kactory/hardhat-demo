import { ethers } from "hardhat";

async function main() {
    // await deploy();
    await mint();
}

/// 토큰 스마트 컨트랙트. 토큰의 개념을 발행한다고 보면 됨.
async function deploy() {
    // KEYKAT이라는 토큰의 "개념", 즉 토큰의 스마트 컨트랙트를 배포
    // KEYKAT이라는 이름의 토큰 컨트랙트를 이더리움 네트워크에 배포.
    const keykatFactory = await ethers.getContractFactory("KEYKAT");
    // 18은 소수점 자리수인데, 토큰의 세부 단위를 정의하는데 사용.
    // 예를 들어, 1 KEYKAT = 0.00000000000001 ETH 이런 느낌으로 소수점 제한을 두는 것
    // 그냥 가치를 연산할 때 소수점 자리수를 제한한 것 뿐.
    const keykat = await keykatFactory.deploy("KEYKAT", "KEY", 18);
    await keykat.waitForDeployment();
    console.log("Token deployed to:", keykat.target);
}

/// 토큰 발행
async function mint() {
    // getSigners(): 이더리움 네트워크에 연결된 계정 목록 (테스트할 때 많이 사용)
    const [deployer] = await ethers.getSigners();
    // 토큰의 컨트랙트 주소 (TODO: 이거 어떻게 관리함?)
    const tokenAddress = "0x26B210Ba864F96741A059B7509210CF90226D46e";
    // 토큰의 컨트랙트 인스턴스
    const Keykat = await ethers.getContractAt("KEYKAT", tokenAddress);

    const amount = ethers.parseUnits("500", 18);

    // 토큰 발행
    // 1. 이거 gas fee 얼마로 설정해야함? 너무 낮으면 잘 안됨
    // 2. transaction can't be replaced, mining has already started. 
    //    한번만 실행했는데 이 에러가 뜨는데 왜 무조건 발생할까?
    //    --> 동시다발적으로 메서드를 실행해서 발생한 현상이었음.
    const nounce = await ethers.provider.getTransactionCount(deployer.address, 'latest');
    const tx = await Keykat.mint(deployer.address, amount, {
        gasPrice: ethers.parseUnits('200000000000', 'wei'),
        nonce: nounce,
    });
    await tx.wait();

    console.log("Minted", amount, "KEYKAT to", deployer.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});