'use strict';

/**
 * Propose a transaction
 * @param {network.om.contract.ProposeContract} contractRequest - request a blockchain contract
 * @transaction
 */
function ProposeContract(contractRequest) {
    var factory = getFactory();
    var namespace = 'network.om.contract';

    var contract = factory.newResource(namespace, 'Contract', contractRequest.contractId);    
    contract.contractStatus = contractRequest.contractStatus;
    contract.product = contractRequest.product;
    contract.orderer = contractRequest.orderer;
    contract.createdOn = contractRequest.createdOn;

    // save the order
    return getAssetRegistry(contract.getFullyQualifiedType())
        .then(function (assetRegistry) {
            return assetRegistry.add(contract);
        })
        .then(function () {
            // emit the event
            var proposeContractEvent = factory.newEvent(namespace, 'ProposeContractEvent');
            proposeContractEvent.contractId = contract.contractId;
            proposeContractEvent.orderer = contract.orderer;
            emit(proposeContractEvent);
        });
}