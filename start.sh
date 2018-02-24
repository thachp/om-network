composer archive create -t dir -n .

composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName om-network

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile om-network@0.0.1.bna --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@om-network