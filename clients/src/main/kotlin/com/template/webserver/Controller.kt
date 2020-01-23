package com.template.webserver

import com.template.flows.Initiator
import net.corda.core.identity.CordaX500Name
import net.corda.core.identity.Party
import net.corda.core.messaging.startFlow
import net.corda.core.utilities.getOrThrow
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
    private fun getData(): String {
        return "Define an endpoint here."
    }

    @PostMapping(value = ["/postData"], produces = ["text/plain"])
    private fun postData(@RequestBody text: String) {
        val administration= CordaX500Name.parse("O=PartyB,L=New York,C=US")
        val party : Party = proxy.wellKnownPartyFromX500Name(administration)!!
        proxy.startFlow(::Initiator,text,party).returnValue.getOrThrow()
    }
}
