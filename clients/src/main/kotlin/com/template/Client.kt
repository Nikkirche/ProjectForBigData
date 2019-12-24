package com.template

import com.template.flows.Initiator
import net.corda.client.rpc.CordaRPCClient
import net.corda.core.identity.CordaX500Name
import net.corda.core.identity.Party
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.messaging.RPCOps
import net.corda.core.messaging.startFlow
import net.corda.core.utilities.NetworkHostAndPort.Companion.parse
import net.corda.core.utilities.getOrThrow
import net.corda.core.utilities.loggerFor

/**
 * Connects to a Corda node via RPC and performs RPC operations on the node.
 *
 * The RPC connection is configured using command line arguments.
 */
fun main(args: Array<String>) = Client().main(args)

private class Client {
    companion object {
        val logger = loggerFor<Client>()
    }

    fun main(args: Array<String>) {
        // Create an RPC connection to the node.
        require(args.size == 3) { "Usage: Client <node address> <rpc username> <rpc password>" }
        val nodeAddress = parse(args[0])
        val rpcUsername = args[1]
        val rpcPassword = args[2]
        val client = CordaRPCClient(nodeAddress)
        val proxy = client.start(rpcUsername, rpcPassword).proxy

        val administration=CordaX500Name.parse("O=PartyA,L=London,C=GB")
        val party : Party = proxy.wellKnownPartyFromX500Name(administration)!!
        proxy.startFlow(::Initiator,"Hello from Server",party).returnValue.getOrThrow()
        // Interact with the node.
        // For example, here we print the nodes on the network.
        val nodes = proxy.networkMapSnapshot()
        logger.info("{}", nodes)
    }
}