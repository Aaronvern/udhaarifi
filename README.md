### Compile the Contract
aptos move compile --dev

### Test the Contract
aptos move test

### Initialize Aptos Environment
aptos init --network devnet

### Set Publisher Profile and Address
PUBLISHER_PROFILE=default
PUBLISHER_ADDR=0x$(aptos config show-profiles --profile=$PUBLISHER_PROFILE | grep 'account' | sed -n 's/.*"account": \"\(.*\)\".*/\1/p')

### Deploy the Contract
aptos move create-object-and-publish-package \
   --address-name my_addrx \
   --named-addresses my_addrx=$PUBLISHER_ADDR \
   --profile $PUBLISHER_PROFILE \
   --assume-yes

### Set Contract Object Address
CONTRACT_OBJECT_ADDR="your_contract_object_address_here"

### Upgrade the Contract
aptos move upgrade-object-package \
   --object-address $CONTRACT_OBJECT_ADDR \
   --named-addresses my_addrx=$CONTRACT_OBJECT_ADDR \
   --profile $PUBLISHER_PROFILE \
   --assume-yes

