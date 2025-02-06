import { ethers } from "hardhat";

async function main() {
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

main().catch((error) => {
    console.error(error);
    process.exit(1);
});