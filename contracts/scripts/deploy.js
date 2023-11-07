
const deploy = async () => {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)

    const ArchiveChain = await ethers.getContractFactory("ArchiveChain")
    const deployed = await ArchiveChain.deploy()

    console.log("ArchiveChain deployed to:", deployed.target)

}
  
deploy()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})

