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
import org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.web.bind.annotation.*
import com.google.gson.Gson
import com.google.gson.GsonBuilder


/**
 * Define your API endpoints here.
 */
@RestController
@RequestMapping("/") // The paths for HTTP requests are relative to this base path.
@CrossOrigin(origins = arrayOf("*"), allowCredentials = "true")

class Controller(rpc: NodeRPCConnection) {
    class Statements(
            val administration: String,
            val appereance: String,
            val appear: String
    ) {
        override fun toString(): String {
            return "Category [Administration: ${this.administration}, Appereance: ${this.appereance}, Appear: ${this.appear}]"
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(RestController::class.java)
    }

    private val proxy = rpc.proxy

    @GetMapping(value = ["/getData"], produces = ["text/plain"])
    private fun getData(): String {
        val data : List<Statements> = proxy.vaultQueryBy<TemplateState>().states.map {
            Statements(it.state.data.administration.toString(), it.state.data.appearance.toString(), it.state.data.appear.substringAfter("&requestText="))
        }
        val gson = GsonBuilder().setPrettyPrinting().create()
        val dataResult: String = gson.toJson(data)
        println(dataResult)
        //print("Admin: " + data[0][0] + "\n appeareance: " + data[0][1] + "\n appear: " + data[0][2] + "\n")

        return dataResult
    }

    @PostMapping(value = ["/postData"], produces = ["text/plain"])
    private fun postData(@RequestBody text: String) {
        val administration = CordaX500Name.parse("O=PartyB,L=New York,C=US")
        val party: Party = proxy.wellKnownPartyFromX500Name(administration)!!
        proxy.startFlow(::Initiator, text, party).returnValue.getOrThrow()
    }
}
