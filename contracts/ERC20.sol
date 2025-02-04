// SPDX-License-Identifier: UnIdentified
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Ownable: 소유자 권한을 관리하기 위한 OpenZeppelin 모듈
contract KEYKAT is IERC20, Ownable {
    // 주소와 잔액을 매핑하는 변수
    mapping (address => uint256) private _balances;
    
    // 주소와 승인된 잔액을 매핑하는 변수
    mapping (address => mapping (address => uint256)) private _allowances;

    // 총 발행량
    uint256 private _totalSupply;

    // 토큰 이름
    string private _name;

    // 토큰 심볼
    string private _symbol;

    // 소수점 자리수
    /*
        소수점은 ERC20 토큰의 최소 단위를 정의합니다. 
        이는 토큰이 얼마나 세분화될 수 있는지를 결정합니다.
        예를 들어, 소수점이 18로 설정된 경우, 1 토큰은 10^18의 최소 단위로 나뉠 수 있습니다.
         - 정밀도: 이더리움의 기본 단위인 Wei처럼, 토큰도 매우 작은 단위로 나눌 수 있어야 합니다. 이는 거래의 정밀도를 높입니다.
         - 유연성: 다양한 가격대의 상품이나 서비스에 맞춰 토큰을 사용할 수 있습니다.
         - 사용자 경험: 소수점이 있으면 사용자가 익숙한 통화 단위처럼 토큰을 사용할 수 있습니다.
        소수점은 토큰의 유통과 사용을 보다 유연하고 편리하게 만들어 줍니다.
    */
    uint8 private _decimals;

    constructor (string memory name_, string memory symbol_, uint8 decimal_) Ownable(msg.sender) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimal_;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
        return true;
    }

    // 소유자만 토큰을 발행할 수 있도록 제한
    function mint(address to, uint amount) public onlyOwner {
        _mint(to, amount);
    }

    // 소유자만 토큰을 소각할 수 있도록 제한
    function burn(uint amount) public onlyOwner {
        _burn(msg.sender, amount);
    }

    // 토큰 전송 함수
    // 주소가 0인 경우 전송 불가
    // 수신자가 0인 경우 전송 불가
    // 송신자의 잔액에서 전송 금액을 빼고, 수신자의 잔액에 전송 금액을 더함
    // Transfer 이벤트 발생
    function _transfer(address sender, address recipient, uint256 amount) private {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    // 토큰 발행 함수
    // 주소가 0인 경우 발행 불가
    // 총 발행량에 발행 금액을 더함
    // 송신자의 잔액에 발행 금액을 더함
    // Transfer 이벤트 발생
    function _mint(address account, uint256 amount) private {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    // 토큰 소각 함수
    // 주소가 0인 경우 소각 불가
    // 송신자의 잔액에서 소각 금액을 빼고, 총 발행량에 소각 금액을 빼고
    // Transfer 이벤트 발생
    function _burn(address account, uint256 amount) private {
        require(account != address(0), "ERC20: burn from the zero address");

        _balances[account] -= amount;
        _totalSupply -= amount;
        emit Transfer(account, address(0), amount);
    }

    // 토큰 승인 함수
    // 주소가 0인 경우 승인 불가
    // 수신자가 0인 경우 승인 불가
    // 승인된 잔액을 업데이트
    // Approval 이벤트 발생
    function _approve(address owner, address spender, uint256 amount) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    // 소수점 자리수 설정 함수
    // 소수점 자리수를 설정
    function _setupDecimals(uint8 decimals_) private {
        _decimals = decimals_;
    }

}