pragma solidity ^0.4.18;

import "../../contracts/Receiver_Interface.sol";

contract TokenReceiverMock is ContractReceiver {

	function tokenFallback(address _from, uint _value, bytes _data) public pure {
		
	}

}
