const { ethers } = require('hardhat');

//const dusdTokenAddress = '0xf591297fA547374CD9dFE4C0F21E44be220f8c45'
// const lasTokenAddress = '0xed82675B9068AdA53Dc7a1C5332eFd1843AbDfeE'

let TokenDeploy = {

    /** 
     * @dev Deploy the token contract.
     * This is the Test token and must be implemented first. 
     * Simply deploys a native token, LAS, for the exchange built.
     * 
     * Requirements:
     * 
     */
    deploy: async function deployToken() {
        let deployer, token
        [deployer] = await ethers.getSigners()

        let Token = await ethers.getContractFactory('Token', deployer)
        
        token = await Token.deploy()
        await token.deployed()
        return token
    }
}

let TokenMint = {

    /** 
     * @dev Mint some of LAS tokens. 
     * Simply mints native LAS tokens to the address given.
     * 
     * Requirements:
     * 
     */
    tokenContract: async function getToken() {
        let deployer_, token
        [deployer_] = await ethers.getSigners()

        let Token = await ethers.getContractFactory('Token')
        
        token = Token.attach('0xed82675B9068AdA53Dc7a1C5332eFd1843AbDfeE')
        //console.log(token)
        console.log(deployer_.address)
        return token
    },

    /** 
     * @dev Mint some of LAS tokens. 
     * Simply mints native LAS tokens to the address given.
     * 
     * Requirements:
     * 
     */
    mint: async function mintToken() {
        let deployer, deployer2, user1, user2, user3, token
        [deployer, deployer2, user1, user2, user3] = await ethers.getSigners()
        let lasToken = await this.tokenContract()
        lasToken.connect(deployer2).functions.mint(user1.address, ethers.utils.parseEther('1000000'))
        //let Token = await ethers.getContractFactory('Token')
        
        //token = Token.attach('0xed82675B9068AdA53Dc7a1C5332eFd1843AbDfeE')
        
        console.log(await lasToken.totalSupply())
        return lasToken.totalSupply()
    },

    transfer: async function transferTokens() {
        let deployer, deployer2, user1, user2, user3, lasToken
        [deployer, deployer2, user1, user2, user3] = await ethers.getSigners()
        lasToken = await this.tokenContract()
        // lasToken.connect(user1).functions.transfer(user2.address, ethers.utils.parseEther('500000'))
        console.log(await lasToken.connect(user1).functions.balanceOf(user2.address))
    }
}

Main = async() => {
    // Call the Token object function
    
    await TokenMint.transfer()
    //await TokenMint.mint()
    //await TokenMint.tokenContract()
}

Main()