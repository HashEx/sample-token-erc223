const Contract = artifacts.require('./helpers/GzTokenMock.sol')
const ReceiverToken = artifacts.require('./helpers/TokenReceiverMock.sol')
const NotReceivingToken = artifacts.require('./helpers/NotReceivingToken.sol')
const assertJump = require('./helpers/assertJump')

contract('Erc223Contract', accounts => {
	const mainAccount = accounts[0]
	const secondAccount = accounts[1]

	beforeEach(async function() {
		this.token = await Contract.new(mainAccount, 100)
	})

	it('should have initial balance', async function() {
		const totalBalance = await this.token.totalSupply()
		assert.equal(totalBalance.valueOf(), 100)
	})

	it('should throw an error when trying to transfer more than balance', async function() {
		try {
			let transfer = await this.token.transfer(secondAccount, 101)
			assert.fail('should have thrown before')
		} catch(error) {
			assertJump(error)
		}
	})

	it('should set all tokens to creator', async function() {
		const tokenCount = await this.token.balanceOf(mainAccount)
		assert.equal(100, tokenCount.valueOf())
	})

	it('should transfer tokens', async function() {
		const tokenCount = await this.token.balanceOf(mainAccount)
		assert.equal(100, tokenCount.valueOf())
		const address = await this.token.transfer(secondAccount, 10);
		const mainAccountBalance = await this.token.balanceOf(mainAccount)
		assert.equal(90, mainAccountBalance.valueOf(), "main account balance should decrease")

		const secondAccountBalance = await this.token.balanceOf(secondAccount)
		assert.equal(10, secondAccountBalance.valueOf(), "tokens should be sent to second address")
	})

	//todo: check how open zeppelin implemented this
	/*
	it('should throw an error when trying to transfer to 0x0', async function() {
		try {
			let transfer = await this.token.transfer(0x0, 1)
			assert.fail('should have thrown before')
		} catch(error) {
			assertJump(error)
		}
	})
	*/

	it('should throw an error then trasfer to token that ' +
		'does not implement token fallback function', async function() {
		try {
			const notReceivingToken = await NotReceivingToken.new()
			const transfer = await this.token.transfer(notReceivingToken.address, 10)
			assert.fail('should have thrown before')
		} catch(error) {
			assertJump(error)
		}
	})

	it('should transfer to token that does implement token fallback function', 
		async function() {
			//todo move receiver interface from contracts to test helpers
		const receiverToken = await ReceiverToken.new()

		const totalBalance = await this.token.totalSupply()
		assert.equal(totalBalance.valueOf(), 100)
		const transfer = await this.token.transfer(receiverToken.address, 10)
		const mainAccountBalance = await this.token.balanceOf(mainAccount)
		assert.equal(90, mainAccountBalance.valueOf(), "main account balance should decrease")

		const contractBalance = await this.token.balanceOf(receiverToken.address)
		assert.equal(10, contractBalance.valueOf(), "tokens should be transfered to contract")
	})

})