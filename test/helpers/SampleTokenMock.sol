pragma solidity ^0.4.11;

import '../../contracts/SampleToken.sol';

contract SampleTokenMock is SampleToken {

	function SampleTokenMock(address initialAccount, uint initialBalance) {
		balances[initialAccount] = initialBalance;
		totalSupply = initialBalance;
	}

}