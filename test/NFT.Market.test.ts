import { expect } from 'chai';
import {ethers} from 'hardhat';

describe('NFTMarket Contract', () => {
    it('Should create and execute market sales', async () => {
      const Market = await ethers.getContractFactory('NFTMarket');
      const market = await Market.deploy();
      await market.deployed();
      const marketAddress = await market.address;

      const NFT = await ethers.getContractFactory('NFT');
      const nft = await NFT.deploy(marketAddress);
      await nft.deployed();
      const nftAddress = await nft.address;

      let listingPrice = await market.getListingPrice();
      listingPrice = listingPrice.toString();

      const auctionPrice = ethers.utils.parseUnits('100', 'ether');

      await nft.createToken("https://www.mytokenlocation.com")
      await nft.createToken("https://www.mytokenlocation2.com")

      await market.createMarketItem(nftAddress, 1, auctionPrice, { value: listingPrice });
      await market.createMarketItem(nftAddress, 2, auctionPrice, { value: listingPrice });

      const [_, buyerAddress] = await ethers.getSigners();

      await market.connect(buyerAddress).createMarketSale(nftAddress, 1, { value: auctionPrice });

      const martketplaceItems = await market.fetchMarketItems();
      
      const items: any[] = await Promise.all(martketplaceItems.map(async (i: any) => {
        const tokenUri = await nft.tokenURI(i.tokenId)
        return {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri
        }
      }));

      expect(items.length).to.equal(1);
    })
});