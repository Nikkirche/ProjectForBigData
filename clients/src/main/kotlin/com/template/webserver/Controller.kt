package com.template.webserver

import com.template.flows.Initiator
import com.template.states.TemplateState
import net.corda.core.identity.CordaX500Name
import net.corda.core.identity.Party
import net.corda.core.messaging.startFlow
import net.corda.core.messaging.vaultQueryBy
import net.corda.core.utilities.getOrThrow
import net.corda.serialization.internal.model.TypeIdentifier
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.web.bind.annotation.*

/**
 * Define your API endpoints here.
 */
@RestController
@RequestMapping("/") // The paths for HTTP requests are relative to this base path.
@CrossOrigin(origins = arrayOf("*"), allowCredentials = "true")

class Controller(rpc: NodeRPCConnection) {

    companion object {
        private val logger = LoggerFactory.getLogger(RestController::class.java)
    }

    private val proxy = rpc.proxy

    @GetMapping(value = ["/getData"], produces = ["text/plain"])
    private fun getData(): List<Array<Any>> {
        val data : List<Array<Any>> = proxy.vaultQueryBy<TemplateState>().states.map {
            arrayOf(it.state.data.administration,it.state.data.appearance,it.state.data.appear.substringAfter("&requestText="))
        }

        //print("Admin: " + data[0][0] + "\n appeareance: " + data[0][1] + "\n appear: " + data[0][2] + "\n")

        return data
    }

    @PostMapping(value = ["/postData"], produces = ["text/plain"])
    private fun postData(@RequestBody text: String) {
        val administration = CordaX500Name.parse("O=PartyB,L=New York,C=US")
        val party: Party = proxy.wellKnownPartyFromX500Name(administration)!!
        proxy.startFlow(::Initiator, text, party).returnValue.getOrThrow()
    }
}
