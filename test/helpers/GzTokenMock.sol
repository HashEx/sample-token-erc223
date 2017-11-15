pragma solidity ^0.4.11;

import '../../contracts/GzToken.sol';

contract GzTokenMock is GzToken {

	function GzTokenMock(address initialAccount, uint initialBalance) {
		balances[initialAccount] = initialBalance;
		totalSupply = initialBalance;
	}
}