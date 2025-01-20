## Turn your NFTs into collateral and access cryptocurrency loans with ease. No need to sell—just lend your NFTs and get the liquidity you need in minutes.

##  Compile the Contract

Compile the Move contract using the following command:

```bash
aptos move compile --dev
aptos move test

```

```
aptos init --network devnet
```
### Set Pub Profile and Pub Address

```
PUBLISHER_PROFILE=default
PUBLISHER_ADDR=0x$(aptos config show-profiles --profile=$PUBLISHER_PROFILE | grep 'account' | sed -n 's/.*"account": "\(.*\)".*/\1/p')
```
```
aptos move upgrade-object-package \
  --object-address $CONTRACT_OBJECT_ADDR \
  --named-addresses my_addrx=$CONTRACT_OBJECT_ADDR \
  --profile $PUBLISHER_PROFILE \
  --assume-yes
```

```
npm i
npm run dev
```






