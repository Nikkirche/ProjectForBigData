package com.template.flows

import co.paralleluniverse.fibers.Suspendable
import com.template.contracts.TemplateContract
import com.template.states.TemplateState
import net.corda.core.contracts.Command
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.TransactionBuilder
import net.corda.core.utilities.ProgressTracker
import java.time.LocalDate

// *********
// * Flows *
// *********

    @InitiatingFlow
    @StartableByRPC
    class Initiator(val appear: String, val administration: Party) : FlowLogic<Unit>() {
        override val progressTracker = ProgressTracker()

        @Suspendable
        override fun call() {
            // We retrieve the notary identity from the network map.
            val notary = serviceHub.networkMapCache.notaryIdentities[0]

            // We create the transaction components.
            val outputState = TemplateState(appear, administration, ourIdentity)
            val command = Command(TemplateContract.Commands.Action(), ourIdentity.owningKey)

            // We create a transaction builder and add the components.
            val txBuilder = TransactionBuilder(notary = notary)
                    .addOutputState(outputState, TemplateContract.ID)
                    .addCommand(command)

            // We sign the transaction.
            val signedTx = serviceHub.signInitialTransaction(txBuilder)

            // Creating a session with the other party.
            val otherPartySession = initiateFlow(administration)
            // We finalise the transaction and then send it to the counterparty.
            subFlow(FinalityFlow(signedTx, otherPartySession))
        }
    }

    @InitiatedBy(Initiator::class)


    class Responder(val counterpartySession: FlowSession) : FlowLogic<Unit>() {
        @Suspendable
        override fun call() {
            subFlow(ReceiveFinalityFlow(counterpartySession))
        }
    }
